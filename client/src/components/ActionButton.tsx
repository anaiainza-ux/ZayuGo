interface ActionButtonProps {
  icon: string;
  title: string;
  onClick?: () => void;
}

export default function ActionButton({ icon, title, onClick }: ActionButtonProps) {
  const handleClick = () => {
    console.log(`${title} action triggered`);
    onClick?.();
  };

  return (
    <button 
      onClick={handleClick}
      className="bg-white p-4 rounded-4xl shadow-md flex flex-col items-center justify-center text-center aspect-square transform hover:-translate-y-2 transition-transform duration-200 ease-in-out hover-elevate active-elevate-2"
      data-testid={`button-action-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <span className="text-4xl" data-testid="text-action-icon">{icon}</span>
      <h3 className="font-bold text-green mt-2" data-testid="text-action-title">{title}</h3>
    </button>
  );
}