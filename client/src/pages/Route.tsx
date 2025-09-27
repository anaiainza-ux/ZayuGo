import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Navigation, Clock, Car, Train, Bus } from 'lucide-react';
import { useLocation } from 'wouter';

interface TransportOption {
  id: string;
  type: 'car' | 'metro' | 'bus';
  duration: string;
  cost: string;
  description: string;
  icon: any;
}

export default function Route() {
  const [, setLocation] = useLocation();
  const [selectedTransport, setSelectedTransport] = useState<string>('car');

  // todo: remove mock functionality
  const transportOptions: TransportOption[] = [
    {
      id: 'car',
      type: 'car',
      duration: '35 min',
      cost: 'Gasolina + Estacionamiento',
      description: 'Conduce hasta el Estadio BBVA',
      icon: Car
    },
    {
      id: 'metro',
      type: 'metro',
      duration: '45 min',
      cost: '$25 MXN',
      description: 'Metro + Camión directo',
      icon: Train
    },
    {
      id: 'bus',
      type: 'bus',
      duration: '50 min',
      cost: '$30 MXN',
      description: 'Autobús directo al estadio',
      icon: Bus
    }
  ];

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
            
            {transportOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = selectedTransport === option.id;
              
              return (
                <Card 
                  key={option.id} 
                  className={`cursor-pointer transition-all hover-elevate ${
                    isSelected ? 'ring-2 ring-green' : ''
                  }`}
                  onClick={() => setSelectedTransport(option.id)}
                  data-testid={`card-transport-${option.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green/10 rounded-lg">
                          <IconComponent className="w-6 h-6 text-green" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-green">{option.description}</h3>
                          <p className="text-sm text-gray-600">Duración: {option.duration}</p>
                          <p className="text-sm text-gray-600">Costo: {option.cost}</p>
                        </div>
                      </div>
                      {isSelected && (
                        <Badge className="bg-lime text-green">
                          Seleccionado
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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