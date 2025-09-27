import Header from '@/components/Header';
import MatchCard from '@/components/MatchCard';
import ActionButton from '@/components/ActionButton';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

export default function Home() {
  const [, setLocation] = useLocation();
  
  // Fetch matches from API
  const { data: matches, isLoading } = useQuery({
    queryKey: ['/api/matches'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const nextMatch = (matches as any)?.data?.[0]; // Get the first active match

  const quickActions = [
    { icon: "MapPin", title: "Ruta al Estadio", path: "/route" },
    { icon: "Ticket", title: "Mis Boletos", path: "/tickets" },
    { icon: "Languages", title: "Traductor", path: "/translator" },
    { icon: "HelpCircle", title: "Ayuda", path: "/help" }
  ];

  return (
    <div className="bg-offwhite min-h-screen font-sans flex justify-center" data-testid="page-home">
      {/* Mobile phone simulation */}
      <div className="w-full max-w-md bg-offwhite flex flex-col">
        <Header />

        <main className="px-6 py-2 flex-grow">
          <h1 className="text-4xl font-bold text-green" data-testid="text-greeting">
            ¡Hola, Campeón!
          </h1>
          <p className="text-gray-500 mt-1" data-testid="text-welcome">
            Tu experiencia para el mundial empieza aquí.
          </p>

          {isLoading ? (
            <div className="bg-green text-white p-6 rounded-4xl mt-8 shadow-2xl flex flex-col items-center">
              <p className="text-gold">Cargando partido...</p>
            </div>
          ) : nextMatch ? (
            <MatchCard
              homeTeam={nextMatch.homeTeam}
              awayTeam={nextMatch.awayTeam}
              date={format(new Date(nextMatch.matchDate), 'dd/MM')}
              time={format(new Date(nextMatch.matchDate), 'HH:mm')} 
              stadium={nextMatch.stadium}
              onTicketClick={() => setLocation('/tickets')}
            />
          ) : (
            <div className="bg-green text-white p-6 rounded-4xl mt-8 shadow-2xl flex flex-col items-center">
              <p className="text-gold">No hay partidos programados</p>
            </div>
          )}

          <div className="mt-10 grid grid-cols-2 gap-4" data-testid="grid-actions">
            {quickActions.map((action, index) => (
              <ActionButton
                key={index}
                icon={action.icon}
                title={action.title}
                onClick={() => {
                  console.log(`Navigating to ${action.title}`);
                  setLocation(action.path);
                }}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}