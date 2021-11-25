import React, { FC } from 'react';

type Option = {
    value: any;
    text: string;
}

type Props = {
  id: string;
  wrapperClassName?: string;
  name?: string;
  labelText?: string;
  errorText?: string;
  multiple?: boolean;
  options: Option[];
};

const Select: FC<Props> = ({ id, name, wrapperClassName, labelText, errorText, options, multiple }) => (
    <div className={wrapperClassName}>
        <label htmlFor={id}>
           {labelText && <span>{labelText}</span>}
        </label>
        <div>
            <select multiple={multiple} id={id} name={name} className={"w-full cursor-pointer bg-white text-dark border-default border-solid border-lightGray hover:border-gray focus:outline-none focus:border-dark pl-4 my-8"}>
                {options.map((option: Option, index: number) => (
                    <option key={index} value={option.value}>{option.text}</option>
                ))}
            </select>
        </div>
        {errorText && <p className='text-sm mb-2 text-red'>{errorText}</p>}
    </div>
);

export default Select;
