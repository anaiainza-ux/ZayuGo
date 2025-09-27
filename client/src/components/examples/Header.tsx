import Header from '../Header';

export default function HeaderExample() {
  return (
    <div className="bg-offwhite">
      <Header onProfileClick={() => console.log('Profile menu opened')} />
    </div>
  );
}