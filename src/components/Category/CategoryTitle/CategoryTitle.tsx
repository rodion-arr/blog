import css from './CategoryTitle.module.scss';
import { FC } from 'react';

type Props = {
  title: string;
};

export const CategoryTitle: FC<Props> = ({ title }) => {
  return <h1 className={css.title}>{title}</h1>;
};
