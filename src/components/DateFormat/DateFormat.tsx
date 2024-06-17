import React from 'react';

interface Props {
  data: string;
}
const DateFormat: React.FC<Props> = ({data}) => {
  const correctDate = new Date(data);
  const month = (correctDate.getMonth() + 1 < 10 ? '0' : '') + (correctDate.getMonth() + 1);
  const day = (correctDate.getDate() < 10 ? '0' : '') + correctDate.getDate();
  const year = correctDate.getFullYear();
  const hours = (correctDate.getHours() < 10 ? '0' : '') + correctDate.getHours();
  const minutes = (correctDate.getMinutes() < 10 ? '0' : '') + correctDate.getMinutes();
  const seconds = (correctDate.getSeconds() < 10 ? '0' : '') + correctDate.getSeconds();
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export default DateFormat;