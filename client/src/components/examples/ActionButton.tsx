import ActionButton from '../ActionButton';

export default function ActionButtonExample() {
  return (
    <div className="bg-offwhite p-6">
      <div className="grid grid-cols-2 gap-4">
        <ActionButton 
          icon="🗺️" 
          title="Ruta al Estadio"
          onClick={() => console.log('Opening route to stadium')}
        />
        <ActionButton 
          icon="🎟️" 
          title="Mis Boletos"
          onClick={() => console.log('Opening my tickets')}
        />
        <ActionButton 
          icon="💬" 
          title="Traductor"
          onClick={() => console.log('Opening translator')}
        />
        <ActionButton 
          icon="❓" 
          title="Ayuda"
          onClick={() => console.log('Opening help')}
        />
      </div>
    </div>
  );
}