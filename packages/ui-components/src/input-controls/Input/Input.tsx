import React, { FC } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  id: string;
  wrapperClassName?: string;
  placeholder?: string;
  type: string | 'text';
  errorText?: string;
  labelText?: string;
  width?: string;
  innerRef?: UseFormRegisterReturn;
  customClass?: string;
};

const Input: FC<Props> = ({ id, wrapperClassName, placeholder, type, error, errorText, labelText, width, innerRef, customClass }) => (
  <div className={wrapperClassName}>
    <label htmlFor={id}>
        {labelText && <span>{labelText}</span>}
    </label>
    <div className="mt-8">
        <input
            className={`${customClass ? customClass : ''} w-${width ? width : 'full'} bg-white text-dark border-default border-solid border-lightGray hover:border-gray focus:outline-none focus:border-dark pl-4 py-4`}
            id={id}
            type={type}
            placeholder={placeholder}
            {...innerRef}
        />
    </div>
    {errorText && <p className='text-sm mb-2 text-red'>{errorText}</p>}
  </div>
);

export default Input;
