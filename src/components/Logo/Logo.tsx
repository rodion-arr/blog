import css from './Logo.module.scss';

export const Logo = () => {
  return (
    <span className={css.logo}>
      Rodion&apos;s<span className={css.logo__accent}>Blog</span>
      <span className={css.logo__zone}>.tech</span>
    </span>
  );
};
