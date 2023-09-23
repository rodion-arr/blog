'use client';
import css from './SectionTitle.module.scss';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{}>;

export const SectionTitle: FC<Props> = ({ children }) => {
  return <h2 className={css['section-title']}>{children}</h2>;
};
