'use client';

import css from './NavItem.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavItem() {
  const pathname = usePathname();

  return (
    <nav className={css.nav}>
      <Link
        href={'/'}
        className={`${css.nav_link} ${pathname === '/' ? css.nav_link_active : ''}`}
      >
        Home
      </Link>
      <Link
        href={'/catalog'}
        className={`${css.nav_link} ${pathname === '/catalog' ? css.nav_link_active : ''}`}
      >
        Catalog
      </Link>
    </nav>
  );
}
