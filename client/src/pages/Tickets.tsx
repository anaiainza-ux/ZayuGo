import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, QrCode, MapPin, Calendar, Clock } from 'lucide-react';
import { useLocation } from 'wouter';

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

  // todo: remove mock functionality
  const mockTickets: TicketData[] = [
    {
      id: '1',
      matchTitle: 'México vs. Alemania',
      date: 'Hoy',
      time: '19:00 hrs',
      stadium: 'Estadio BBVA',
      seatSection: 'A',
      seatRow: '15',
      seatNumber: '23',
      qrCode: 'QR123456789',
      isUsed: false
    },
    {
      id: '2',
      matchTitle: 'Brasil vs. Argentina',
      date: 'Mañana',
      time: '21:00 hrs',
      stadium: 'Estadio Azteca',
      seatSection: 'B',
      seatRow: '08',
      seatNumber: '12',
      qrCode: 'QR987654321',
      isUsed: false
    }
  ];

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
            {mockTickets.map((ticket) => (
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