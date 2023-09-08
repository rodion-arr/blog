'use client';
import css from './Header.module.scss';
import { Logo } from '@/components/Logo/Logo';
import { TopMenu } from '@/components/Header/TopMenu/TopMenu';
import { Link } from '@/components/Util/Link/Link';

export const Header = () => {
  return (
    <>
      <header className={css.header}>
        <div className={css.header__items}>
          <Link href='/' className={css.header__logo}>
            <Logo />
          </Link>
        </div>
      </header>

      <nav>
        <TopMenu />
      </nav>
    </>
  );
};
