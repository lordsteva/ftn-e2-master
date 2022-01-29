import React, { FC } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  id: string;
  wrapperClassName?: string;
  placeholder?: string;
  type: string | 'text';
  errorText?: string;
  labelText?: string;
  labelClass?: string;
  width?: string;
  innerRef?: UseFormRegisterReturn;
  customClass?: string;
  defaultValue?: string;
};

const Input: FC<Props> = ({
  id,
  defaultValue = '',
  wrapperClassName,
  placeholder,
  type,
  errorText,
  labelText,
  labelClass,
  width,
  innerRef,
  customClass,
}) => (
  <div className={wrapperClassName}>
    <label htmlFor={id}>{labelText && <span className={labelClass}>{labelText}</span>}</label>
    <div className="mt-8">
      <input
        defaultValue={defaultValue}
        className={`${customClass ? customClass : ''} w-${
          width ? width : 'full'
        } bg-white text-dark border-default border-solid border-lightGray hover:border-gray focus:outline-none focus:border-dark pl-4 py-4`}
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
