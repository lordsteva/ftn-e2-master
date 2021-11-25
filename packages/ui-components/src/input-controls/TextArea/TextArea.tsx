import React, { FC } from 'react';

type Props = {
  id: string;
  wrapperClassName?: string;
  placeholder?: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  labelText?: string;
  readonly?: boolean;
  cols?: number;
  rows?: number;
  isResizable?: boolean;
};

const TextArea: FC<Props> = ({ id, wrapperClassName, placeholder, name, error, errorText, labelText, readonly, cols, rows, isResizable }) => (
    <div className={wrapperClassName}>
        <label htmlFor={id}>
           {labelText && <span>{labelText}</span>}
        </label>
        <div>
            <textarea
                className={`w-full bg-white text-dark border-default border-solid border-lightGray hover:border-gray focus:outline-none focus:border-dark pl-4 my-8 ${isResizable ? 'resize' : 'resize-none'}`}
                id={id}
                name={name}
                placeholder={placeholder}
                readOnly={readonly}
                cols={cols}
                rows={rows ? rows : 3}
            />
        </div>
        {errorText && <p className='text-sm mb-2 text-red'>{errorText}</p>}
    </div>
);

export default TextArea;
