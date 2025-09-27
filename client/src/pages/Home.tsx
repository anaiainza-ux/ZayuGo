import Header from '@/components/Header';
import MatchCard from '@/components/MatchCard';
import ActionButton from '@/components/ActionButton';

export default function Home() {
  // todo: remove mock functionality
  const mockMatch = {
    homeTeam: "México",
    awayTeam: "Alemania", 
    date: "Hoy",
    time: "19:00 hrs",
    stadium: "Estadio BBVA"
  };

  const quickActions = [
    { icon: "🗺️", title: "Ruta al Estadio" },
    { icon: "🎟️", title: "Mis Boletos" },
    { icon: "💬", title: "Traductor" },
    { icon: "❓", title: "Ayuda" }
  ];

  return (
    <div className="bg-offwhite min-h-screen font-sans flex justify-center" data-testid="page-home">
      {/* Mobile phone simulation */}
      <div className="w-full max-w-md bg-offwhite flex flex-col">
        <Header 
          onProfileClick={() => console.log('Profile menu would open')}
        />

        <main className="px-6 py-2 flex-grow">
          <h1 className="text-4xl font-bold text-green" data-testid="text-greeting">
            ¡Hola, Campeón!
          </h1>
          <p className="text-gray-500 mt-1" data-testid="text-welcome">
            Tu experiencia para el mundial empieza aquí.
          </p>

          <MatchCard
            homeTeam={mockMatch.homeTeam}
            awayTeam={mockMatch.awayTeam}
            date={mockMatch.date}
            time={mockMatch.time}
            stadium={mockMatch.stadium}
            onTicketClick={() => console.log('QR ticket feature would open')}
          />

          <div className="mt-10 grid grid-cols-2 gap-4" data-testid="grid-actions">
            {quickActions.map((action, index) => (
              <ActionButton
                key={index}
                icon={action.icon}
                title={action.title}
                onClick={() => console.log(`${action.title} feature would open`)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}