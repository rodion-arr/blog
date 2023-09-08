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
          <div className={css['author__name-text']}>Rodion Abdurakhimov</div>
          <div className={css.author__title}>Senior Software Engineer</div>
        </div>
      </div>

      <div className={css.author__about}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores consequatur
        culpa cum, dicta dignissimos error, esse et eveniet in inventore iste modi necessitatibus
        obcaecati quis ratione sint tenetur veniam.
      </div>

      <SocialLinks />
    </section>
  );
};
