import MatchCard from '../MatchCard';

export default function MatchCardExample() {
  return (
    <div className="bg-offwhite p-6">
      <MatchCard
        homeTeam="México"
        awayTeam="Alemania"
        date="Hoy"
        time="19:00 hrs"
        stadium="Estadio BBVA"
        onTicketClick={() => console.log('Opening QR ticket')}
      />
    </div>
  );
}