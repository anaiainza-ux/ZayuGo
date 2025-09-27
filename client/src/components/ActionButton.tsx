import { MapPin, Ticket, Languages, HelpCircle } from 'lucide-react';

interface ActionButtonProps {
  icon: string;
  title: string;
  onClick?: () => void;
}

const iconMap = {
  MapPin,
  Ticket,
  Languages,
  HelpCircle
};

export default function ActionButton({ icon, title, onClick }: ActionButtonProps) {
  const handleClick = () => {
    console.log(`${title} action triggered`);
    onClick?.();
  };

  const IconComponent = iconMap[icon as keyof typeof iconMap];

  return (
    <button 
      onClick={handleClick}
      className="bg-white p-4 rounded-4xl shadow-md flex flex-col items-center justify-center text-center aspect-square hover-elevate active-elevate-2"
      data-testid={`button-action-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {IconComponent && <IconComponent className="w-8 h-8 text-green" data-testid="icon-action" />}
      <h3 className="font-bold text-green mt-2" data-testid="text-action-title">{title}</h3>
    </button>
  );
}