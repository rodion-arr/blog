'use client';
import css from './DisqusComments.module.scss';
import { DiscussionEmbed } from 'disqus-react';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { SITE_URL } from '@/constants';

interface Props {
  id: string;
  title: string;
}

export const DisqusComments: FC<Props> = ({ id, title }) => {
  const path = usePathname();
  const disqusShortname = 'rodions-blog-tech';
  const disqusConfig = {
    url: `${SITE_URL}/${path}`,
    identifier: id,
    title: title,
  };
  return (
    <section className={css.comments}>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </section>
  );
};
