interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  stadium: string;
  onTicketClick?: () => void;
}

export default function MatchCard({ 
  homeTeam, 
  awayTeam, 
  date, 
  time, 
  stadium, 
  onTicketClick 
}: MatchCardProps) {
  const handleTicketClick = () => {
    console.log('QR Ticket requested');
    onTicketClick?.();
  };

  return (
    <div className="bg-green text-white p-6 rounded-4xl mt-8 shadow-2xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300 ease-in-out" data-testid="card-match">
      <p className="font-semibold text-gold tracking-wider" data-testid="text-match-label">
        PRÓXIMO PARTIDO
      </p>
      <h2 className="text-3xl font-bold mt-2" data-testid="text-match-teams">
        {homeTeam} vs. {awayTeam}
      </h2>
      <p className="opacity-80 mt-1" data-testid="text-match-details">
        {date}, {time} - {stadium}
      </p>
      <button 
        onClick={handleTicketClick}
        className="bg-lime text-green font-bold py-3 px-10 rounded-full mt-6 shadow-lg transform hover:scale-110 transition-transform active-elevate-2"
        data-testid="button-qr-ticket"
      >
        MI BOLETO QR
      </button>
    </div>
  );
}