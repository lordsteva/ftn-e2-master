import React, { FC } from 'react';

type Props = {
  id: string;
  wrapperClassName?: string;
  placeholder?: string;
  type: string | 'text';
  name?: string;
  error?: boolean;
  errorText?: string;
  labelText?: string;
  width?: string;
  customClass?: string;
};

const Input: FC<Props> = ({ id, wrapperClassName, placeholder, type, name, error, errorText, labelText, width, customClass }) => (
    <div className={wrapperClassName}>
        <label htmlFor={id}>
           {labelText && <span>{labelText}</span>}
        </label>
        <div className="mt-8">
            <input
                className={`${customClass ? customClass : ''} w-${width ? width : 'full'} bg-white text-dark border-default border-solid border-lightGray hover:border-gray focus:outline-none focus:border-dark pl-4 py-4`}
                id={id}
                type={type}
                name={name}
                placeholder={placeholder}
            />
        </div>
        {errorText && <p className='text-sm mb-2 text-red'>{errorText}</p>}
    </div>
);

export default Input;
