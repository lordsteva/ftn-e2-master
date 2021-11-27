import React, { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  id: string;
  wrapperClassName?: string;
  placeholder?: string;
  type: string | 'text';
  errorText?: string;
  labelText?: string;
  innerRef: UseFormRegisterReturn;
};

const Input: FC<Props> = ({
  id,
  wrapperClassName,
  placeholder,
  type,
  errorText,
  labelText,
  innerRef,
}) => (
  <div className={wrapperClassName}>
    <label htmlFor={id}>{labelText && <span>{labelText}</span>}</label>
    <div>
      <input
        className={
          'w-full bg-white text-dark border-default border-solid border-lightGray hover:border-gray focus:outline-none focus:border-dark pl-4 my-8'
        }
        id={id}
        type={type}
        placeholder={placeholder}
        {...innerRef}
      />
    </div>
    {errorText && <p className="mb-2 text-sm text-red">{errorText}</p>}
  </div>
);

export default Input;
