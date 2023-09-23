'use client';
import css from './TopMenu.module.scss';
import { Link } from '@/components/Util/Link/Link';
import { useState } from 'react';
import { UrlService } from '@/services/url.service';

export const TopMenu = () => {
  const [menuItems] = useState<{ title: string; href: string }[]>(UrlService.getMenuItems());

  return (
    <ul className={css.menu}>
      {menuItems.map((item, index) => (
        <li className={css.menu__item} key={index}>
          <Link activeClassName={css['menu__active-link']} href={item.href}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
