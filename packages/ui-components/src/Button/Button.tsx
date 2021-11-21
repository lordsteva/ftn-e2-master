import React, { FC } from 'react';

type Props = {
  title?: string;
  buttonColor: string;
  textColor?: string;
  disabled?: boolean;
  block?: boolean;
  rounded?: boolean;
  size?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: FC<Props> = ({ title, buttonColor, textColor, disabled = false, block, rounded, size, onClick}) => (
  <button 
    onClick={onClick} 
    className={
      `${buttonColor && !disabled ? 'bg-'+buttonColor : 'primary'} 
      text-${textColor ? textColor : 'white'}
      ${rounded && 'rounded-full'}
      ${block && 'w-full'} 
      px-40 py-12 whitespace-nowrap
      text-${size ? size : 'base'}
      ${disabled ? 'bg-darkGray cursor-not-allowed' : 'transition ease-out duration-200 transform hover:scale-110 cursor-pointer'}`
    }
  >
    {title && <span>{title}</span>}
  </button>
);

export default Button;
