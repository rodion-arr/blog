import { FC } from 'react';

type Props = {
  date: Date;
};

export const Date: FC<Props> = ({ date }) => {
  return (
    <span>
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
