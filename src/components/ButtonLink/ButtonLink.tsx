import css from './ButtonLink.module.scss';
import { Link } from '@/components/Util/Link/Link';
import { FC } from 'react';
import classNames from 'classnames';

type Props = {
  href: string;
  className?: string;
  anchor?: string;
};

export const ButtonLink: FC<Props> = ({ href, anchor = '', className = '' }) => {
  return (
    <Link className={classNames(css.button, className)} href={href}>
      {anchor}
    </Link>
  );
};
