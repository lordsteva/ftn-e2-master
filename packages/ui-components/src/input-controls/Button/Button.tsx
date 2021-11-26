import React, { FC } from 'react';

type Props = {
  title?: string;
  buttonColor?: string;
  textColor?: string;
  disabled?: boolean;
  block?: boolean;
  rounded?: boolean;
  size?: string;
  additionalClasses?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: FC<Props> = ({ title, buttonColor, textColor, disabled, block, rounded, size, additionalClasses, onClick}) => (
  <button
    disabled={disabled} 
    onClick={onClick} 
    className={
      `bg-${buttonColor ? buttonColor : 'primary'} 
      text-${textColor ? textColor : 'white'}
      px-40 py-12 whitespace-nowrap
      text-${size ? size : 'base'}
      hover:bg-opacity-90
      ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
      ${rounded ? 'rounded-full' : ''}
      ${block ? 'w-full' : ''}
      ${additionalClasses ? additionalClasses : ''}`
    }
  >
    {title && <span>{title}</span>}
  </button>
);

export default Button;
