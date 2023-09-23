import css from './AuthorBlock.module.scss';
import avatar from '@/images/ava.jpg';
import { SocialLinks } from '@/components/SocialLinks/SocialLinks';

export const AuthorBlock = () => {
  return (
    <section className={css.author}>
      <div className={css.author__card}>
        <img
          src={avatar.src}
          className={css.author__photo}
          alt='Rodion Abdurakhimov'
          loading='lazy'
        />
        <div className={css.author__name}>
          <h1 className={css['author__name-text']}>Rodion Abdurakhimov</h1>
          <div className={css.author__title}>Senior Software Engineer</div>
        </div>
      </div>

      <div className={css.author__about}>
        Meet Rodion Abdurakhimov, a software engineer and open source contributor, based in Kyiv,
        Ukraine 🇺🇦. <br /> Main interests: JavaScript backend and frontend development. Excited
        about projects to apply a wide range of knowledge.
      </div>

      <SocialLinks />
    </section>
  );
};
