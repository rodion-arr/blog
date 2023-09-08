'use client';
import css from './SocialLinks.module.scss';
import { Link } from '@/components/Util/Link/Link';
import { FACEBOOK_URL, GITHUB_URL, LINKEDIN_URL, TWITTER_URL } from '@/constants';
import github from '@/images/social/github.svg';
import linkedin from '@/images/social/linkedin.svg';
import twitter from '@/images/social/twitter.svg';
import facebook from '@/images/social/facebook.svg';

export const SocialLinks = () => {
  return (
    <div className={css.social}>
      <Link
        className={css.social__link}
        href={GITHUB_URL}
        target='_blank'
        style={{
          // @ts-expect-error
          '--social-img': `url(${github.src})`,
        }}
      />
      <Link
        className={css.social__link}
        href={LINKEDIN_URL}
        target='_blank'
        style={{
          // @ts-expect-error
          '--social-img': `url(${linkedin.src})`,
        }}
      />
      <Link
        className={css.social__link}
        href={TWITTER_URL}
        target='_blank'
        style={{
          // @ts-expect-error
          '--social-img': `url(${twitter.src})`,
        }}
      />
      <Link
        className={css.social__link}
        href={FACEBOOK_URL}
        target='_blank'
        style={{
          // @ts-expect-error
          '--social-img': `url(${facebook.src})`,
        }}
      />
      <a href='https://www.buymeacoffee.com/rodionarr1' target='_blank'>
        <img
          src='https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png'
          alt='Buy Me A Coffee'
        />
      </a>
    </div>
  );
};
