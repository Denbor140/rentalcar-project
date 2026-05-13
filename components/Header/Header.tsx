import NavItem from '../NavItem/NavItem';
import css from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.header_container}>
        <Link href={'/'}>
          <svg width={104} height={16}>
            <use href="/sprite.svg#icon-logo"></use>
          </svg>
        </Link>
        <NavItem />
      </div>
    </header>
  );
}
