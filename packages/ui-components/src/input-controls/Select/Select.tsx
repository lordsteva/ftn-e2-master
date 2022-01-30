import React, { FC } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type Option = {
  value: any;
  text: string;
};

type Props = {
  id: string;
  wrapperClassName?: string;
  name?: string;
  labelText?: string;
  errorText?: string;
  multiple?: boolean;
  options: Option[];
  // default selection
  defaultValue?: any;
  innerRef?: UseFormRegisterReturn;
};

const Select: FC<Props> = ({
  id,
  name,
  innerRef,
  wrapperClassName,
  labelText,
  errorText,
  options,
  multiple,
  defaultValue,
}) => (
  <div className={wrapperClassName}>
    <label htmlFor={id}>{labelText && <span>{labelText}</span>}</label>
    <div>
      <select
        defaultValue={defaultValue}
        multiple={multiple}
        id={id}
        name={name}
        className={
          'w-full cursor-pointer bg-white text-dark border-default border-solid border-lightGray hover:border-gray focus:outline-none focus:border-dark pl-4 my-8'
        }
        {...innerRef}
      >
        {options.map((option: Option, index: number) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
    {errorText && <p className="mb-2 text-sm text-red">{errorText}</p>}
  </div>
);

export default Select;
