import BookmarksButton from './BookmarksButton';
import Logo from './Logo';

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className='header'>
      <div className='header__top'>
        <Logo />
        <BookmarksButton />
      </div>
      {children}
    </header>
  );
}
