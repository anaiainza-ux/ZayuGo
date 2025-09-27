import logoUrl from '@assets/generated_images/Zayu_Go_sports_logo_7a7a6d97.png';

interface HeaderProps {
  onProfileClick?: () => void;
}

export default function Header({ onProfileClick }: HeaderProps) {
  const handleProfileClick = () => {
    console.log('Profile clicked');
    onProfileClick?.();
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