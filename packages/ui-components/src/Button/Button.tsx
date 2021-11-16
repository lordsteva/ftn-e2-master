import React, { FC } from 'react';

type Props = {
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: FC<Props> = ({ onClick, title }) => (
  <button onClick={onClick} className={'bg-red-800 border-gray-800 border'}>
    {title && <span className="w-full p-3">{title}</span>}
  </button>
);

export default Button;
