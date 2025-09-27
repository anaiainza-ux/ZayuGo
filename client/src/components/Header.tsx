import logoUrl from '@assets/Zayu Go logo_1759003276594.jpg';

import { useLocation } from 'wouter';

interface HeaderProps {
  onProfileClick?: () => void;
}

export default function Header({ onProfileClick }: HeaderProps) {
  const [, setLocation] = useLocation();
  
  const handleProfileClick = () => {
    console.log('Profile clicked');
    if (onProfileClick) {
      onProfileClick();
    } else {
      setLocation('/profile');
    }
  };

  return (
    <header className="p-6 flex justify-between items-center" data-testid="header-main">
      <img 
        src={logoUrl} 
        alt="Zayu Go Logo" 
        className="w-28" 
        data-testid="img-logo"
      />
      <button
        onClick={handleProfileClick}
        className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-200 hover-elevate active-elevate-2 flex items-center justify-center"
        data-testid="button-profile"
      >
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-gray-400 text-xs font-semibold">JD</span>
        </div>
      </button>
    </header>
  );
}