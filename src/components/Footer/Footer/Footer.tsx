'use client';
import css from './Footer.module.scss';
import { FC, useEffect, useState } from 'react';
import { Logo } from '@/components/Logo/Logo';
import { FooterAbout } from '@/components/Footer/FooterAbout/FooterAbout';
import { SocialLinks } from '@/components/SocialLinks/SocialLinks';
import { FooterMenu } from '@/components/Footer/FooterMenu/FooterMenu';
import { UrlService } from '@/services/url.service';
import { CategoryLink } from '@/types/category-link';

export const Footer: FC = () => {
  const [menu, setMenu] = useState<CategoryLink[]>([]);

  useEffect(() => {
    setMenu(UrlService.getMenuItems(false));
  }, []);

  return (
    <footer className={css.footer}>
      <div className='page'>
        <div className={css['footer__content']}>
          <FooterAbout />

          <FooterMenu title='Categories' menu={menu} />
        </div>

        <div className={css['footer__bottom']}>
          <div>
            <Logo />
            <div className={css['footer__copyrights']}>
              © Rodion Abdurakhimov ({new Date().getFullYear()}). All Rights Reserved.
            </div>
          </div>

          <SocialLinks />
        </div>
      </div>
    </footer>
  );
};
