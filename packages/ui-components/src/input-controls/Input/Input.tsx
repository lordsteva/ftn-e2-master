import React, { FC } from 'react';

type Props = {
  id: string;
  wrapperClassName?: string;
  placeholder?: string;
  type: string | 'text';
  name?: string;
  errorText?: string;
  labelText?: string;
};

const Input: FC<Props> = ({
  id,
  wrapperClassName,
  placeholder,
  type,
  name,
  errorText,
  labelText,
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
        name={name}
        placeholder={placeholder}
      />
    </div>
    {errorText && <p className="mb-2 text-sm text-red">{errorText}</p>}
  </div>
);

export default Input;
