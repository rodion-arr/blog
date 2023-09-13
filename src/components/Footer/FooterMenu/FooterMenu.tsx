import css from './FooterMenu.module.scss';
import { FC, useState } from 'react';
import { Link } from '@/components/Util/Link/Link';
import { CategoryLink } from '@/types/category-link';

type Props = {
  title: string;
  menu: CategoryLink[];
};

export const FooterMenu: FC<Props> = ({ title, menu }) => {
  return (
    <nav className={css['footer-nav']}>
      <div className={css['footer-nav__title']}>{title}</div>
      <ul className={css.menu}>
        {menu.map((item, index) => (
          <li className={css.menu__item} key={index}>
            <Link activeClassName={css['menu__active-link']} href={item.href}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
