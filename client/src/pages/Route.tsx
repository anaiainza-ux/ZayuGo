import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Navigation, Clock, Car, Train, Bus, AlertTriangle } from 'lucide-react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

interface ServiceNowRoute {
  sys_id: string;
  transportation_method: string;
  start: string;
  price: string;
  time: string;
  distance: string;
  incidents?: string;
}

interface TransportOption {
  id: string;
  type: 'car' | 'metro' | 'bus';
  duration: string;
  cost: string;
  description: string;
  icon: any;
  incidents?: string;
}

export default function Route() {
  const [, setLocation] = useLocation();
  const [selectedTransport, setSelectedTransport] = useState<string>('');

  // Fetch route data from ServiceNow
  const { data: routesResponse, isLoading, error } = useQuery({
    queryKey: ['/api/routes'],
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const routes: ServiceNowRoute[] = (routesResponse as any)?.data || [];

  // Transform ServiceNow data to transport options
  const getTransportIcon = (method: string) => {
    const lowerMethod = method.toLowerCase();
    if (lowerMethod.includes('auto') || lowerMethod.includes('car')) return Car;
    if (lowerMethod.includes('metro') || lowerMethod.includes('tren')) return Train;
    if (lowerMethod.includes('bus') || lowerMethod.includes('autobús')) return Bus;
    return Car; // default
  };

  const getTransportType = (method: string): 'car' | 'metro' | 'bus' => {
    const lowerMethod = method.toLowerCase();
    if (lowerMethod.includes('metro') || lowerMethod.includes('tren')) return 'metro';
    if (lowerMethod.includes('bus') || lowerMethod.includes('autobús')) return 'bus';
    return 'car'; // default
  };

  const transportOptions: TransportOption[] = routes.map(route => ({
    id: route.sys_id,
    type: getTransportType(route.transportation_method),
    duration: route.time,
    cost: route.price,
    description: route.transportation_method,
    icon: getTransportIcon(route.transportation_method),
    incidents: route.incidents
  }));

  // Auto-select first option if none selected
  if (!selectedTransport && transportOptions.length > 0) {
    setSelectedTransport(transportOptions[0].id);
  }

  const startNavigation = (transportType: string) => {
    console.log(`Starting navigation with ${transportType}`);
    // todo: integrate with maps API
  };

  return (
    <div className="bg-offwhite min-h-screen font-sans">
      <div className="w-full max-w-md mx-auto bg-offwhite">
        {/* Header */}
        <header className="p-6 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation('/')}
            className="hover-elevate active-elevate-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-6 h-6 text-green" />
          </Button>
          <h1 className="text-2xl font-bold text-green" data-testid="text-page-title">
            Ruta al Estadio
          </h1>
        </header>

        <main className="px-6 pb-6">
          {/* Destination Info */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green">
                <MapPin className="w-5 h-5" />
                Destino
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-bold text-lg">Estadio BBVA</h3>
              <p className="text-gray-600 text-sm">
                Av. José Eleuterio González 2601, Del Paseo Residencial, 64920 Monterrey, N.L.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Partido en 4 horas</span>
              </div>
            </CardContent>
          </Card>

          {/* Transport Options */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-green">Opciones de Transporte</h2>
            
            {isLoading ? (
              <Card>
                <CardContent className="p-4">
                  <p className="text-center text-gray-600">Calculando rutas desde ServiceNow...</p>
                </CardContent>
              </Card>
            ) : error ? (
              <Card className="border-red/20">
                <CardContent className="p-4">
                  <div className="text-center text-red">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-bold">Error de Conexión</p>
                    <p className="text-sm">No se pudieron obtener las rutas desde ServiceNow</p>
                    <p className="text-xs mt-2">Verifica la configuración de credenciales</p>
                  </div>
                </CardContent>
              </Card>
            ) : transportOptions.length === 0 ? (
              <Card>
                <CardContent className="p-4">
                  <p className="text-center text-gray-600">No hay rutas disponibles</p>
                </CardContent>
              </Card>
            ) : (
              transportOptions.map((option) => {
                const IconComponent = option.icon;
                const isSelected = selectedTransport === option.id;
                const route = routes.find(r => r.sys_id === option.id);
                
                return (
                  <Card 
                    key={option.id} 
                    className={`cursor-pointer transition-all hover-elevate ${
                      isSelected ? 'ring-2 ring-green' : ''
                    }`}
                    onClick={() => setSelectedTransport(option.id)}
                    data-testid={`card-transport-${option.id}`}
                  >
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green/10 rounded-lg">
                            <IconComponent className="w-6 h-6 text-green" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-green text-lg">{option.description}</h3>
                            <p className="text-sm text-gray-600">Desde: {route?.start || 'Tu ubicación'}</p>
                          </div>
                        </div>
                        <div className="bg-lime text-green font-bold text-lg py-2 px-4 rounded-full">
                          {option.cost}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-lime/10 p-3 rounded-2xl text-center">
                          <p className="text-sm text-green/80">Tiempo Estimado</p>
                          <p className="font-bold text-lg text-green">{option.duration}</p>
                        </div>
                        <div className="bg-lime/10 p-3 rounded-2xl text-center">
                          <p className="text-sm text-green/80">Distancia</p>
                          <p className="font-bold text-lg text-green">{route?.distance || 'N/A'}</p>
                        </div>
                      </div>
                      
                      {option.incidents && (
                        <div className="bg-red/10 text-red p-3 rounded-2xl text-sm mb-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="font-bold">¡Alerta!</span>
                          </div>
                          <p className="mt-1">{option.incidents}</p>
                        </div>
                      )}
                      
                      {isSelected && (
                        <Badge className="bg-lime text-green">
                          Seleccionado
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Navigation Button */}
          <div className="mt-8">
            <Button
              onClick={() => startNavigation(selectedTransport)}
              className="w-full bg-lime text-green hover:bg-lime/90 py-3 text-lg"
              data-testid="button-start-navigation"
            >
              <Navigation className="w-5 h-5 mr-2" />
              Iniciar Navegación
            </Button>
          </div>

          {/* Additional Info */}
          <Card className="mt-6">
            <CardContent className="p-4">
              <h3 className="font-semibold text-green mb-2">Consejos para llegar</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Sal con 1 hora de anticipación</li>
                <li>• El estacionamiento cuesta $100 MXN</li>
                <li>• Hay transporte gratuito desde la estación del Metro</li>
                <li>• Evita llevar objetos prohibidos</li>
              </ul>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}