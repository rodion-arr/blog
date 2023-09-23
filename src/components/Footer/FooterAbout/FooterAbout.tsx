import css from './FooterAbout.module.scss';
import { FC } from 'react';

export const FooterAbout: FC = () => {
  return (
    <div className={css.about}>
      <div className={css['about__title']}>About</div>

      <div className={css['about__text']}>
        Articles by Rodion Abdurakhimov - a software engineer and open source contributor, based in
        Kyiv, Ukraine 🇺🇦. <br /> Main interests: JavaScript backend and frontend development.
      </div>
    </div>
  );
};
