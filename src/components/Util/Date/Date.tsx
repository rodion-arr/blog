import { FC } from 'react';

type Props = {
  className?: string;
  date: Date;
};

export const Date: FC<Props> = ({ date, className = '' }) => {
  return (
    <span className={className}>
      {monthNames[date.getMonth()]} {date.getUTCDate()}, {date.getFullYear()}
    </span>
  );
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
