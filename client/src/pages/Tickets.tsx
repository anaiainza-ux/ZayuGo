import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, QrCode, MapPin, Calendar, Clock } from 'lucide-react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

interface TicketData {
  id: string;
  matchTitle: string;
  date: string;
  time: string;
  stadium: string;
  seatSection: string;
  seatRow: string;
  seatNumber: string;
  qrCode: string;
  isUsed: boolean;
}

export default function Tickets() {
  const [, setLocation] = useLocation();
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  
  // Fetch user tickets from API (using mock user ID for now)
  const mockUserId = 'user-1';
  const { data: ticketsResponse, isLoading } = useQuery({
    queryKey: ['/api/users', mockUserId, 'tickets'],
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
  
  // Fetch matches to get match details
  const { data: matchesResponse } = useQuery({
    queryKey: ['/api/matches'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const tickets = (ticketsResponse as any)?.data || [];
  const matches = (matchesResponse as any)?.data || [];
  
  // Transform tickets to include match information
  const enrichedTickets: TicketData[] = tickets.map((ticket: any) => {
    const match = matches.find((m: any) => m.id === ticket.matchId);
    return {
      id: ticket.id,
      matchTitle: match ? `${match.homeTeam} vs. ${match.awayTeam}` : 'Partido no encontrado',
      date: match ? format(new Date(match.matchDate), 'dd/MM/yyyy') : '',
      time: match ? format(new Date(match.matchDate), 'HH:mm') + ' hrs' : '',
      stadium: match?.stadium || '',
      seatSection: ticket.seatSection,
      seatRow: ticket.seatRow,
      seatNumber: ticket.seatNumber,
      qrCode: ticket.qrCode,
      isUsed: ticket.isUsed
    };
  });

  const showQRCode = (ticket: TicketData) => {
    setSelectedTicket(ticket);
    console.log(`Showing QR code for ticket: ${ticket.id}`);
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
            Mis Boletos
          </h1>
        </header>

        {/* QR Code Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-sm bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-green">Boleto QR</CardTitle>
                <p className="text-sm text-gray-600">{selectedTicket.matchTitle}</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-48 h-48 bg-gray-100 mx-auto mb-4 flex items-center justify-center rounded-lg">
                  <QrCode className="w-32 h-32 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Código: {selectedTicket.qrCode}
                </p>
                <Button
                  onClick={() => setSelectedTicket(null)}
                  className="w-full"
                  data-testid="button-close-qr"
                >
                  Cerrar
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tickets List */}
        <main className="px-6 pb-6">
          <div className="space-y-4">
            {isLoading ? (
              <Card>
                <CardContent className="p-4">
                  <p className="text-center text-gray-600">Cargando boletos...</p>
                </CardContent>
              </Card>
            ) : enrichedTickets.length === 0 ? (
              <Card>
                <CardContent className="p-4">
                  <p className="text-center text-gray-600">No tienes boletos disponibles</p>
                </CardContent>
              </Card>
            ) : enrichedTickets.map((ticket) => (
              <Card key={ticket.id} className="overflow-hidden hover-elevate">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-green text-lg" data-testid={`text-match-${ticket.id}`}>
                      {ticket.matchTitle}
                    </h3>
                    <Badge variant={ticket.isUsed ? "secondary" : "default"}>
                      {ticket.isUsed ? "Usado" : "Válido"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{ticket.date}</span>
                      <Clock className="w-4 h-4 ml-2" />
                      <span>{ticket.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{ticket.stadium}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Asiento:</span> Sección {ticket.seatSection}, Fila {ticket.seatRow}, Asiento {ticket.seatNumber}
                    </div>
                  </div>

                  <Button
                    onClick={() => showQRCode(ticket)}
                    className="w-full bg-lime text-green hover:bg-lime/90"
                    disabled={ticket.isUsed}
                    data-testid={`button-show-qr-${ticket.id}`}
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Mostrar QR
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}