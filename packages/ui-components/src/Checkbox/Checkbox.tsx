import React, { FC } from 'react';

type Props = {
  id: string;
  wrapperClassName?: string;
  name?: string;
  labelText?: string;
  errorText?: string;
  disabled?: boolean;
};

const Checkbox: FC<Props> = ({ id, name, wrapperClassName, labelText, errorText, disabled }) => (
    <div className={wrapperClassName}>
        <div>
            <label className="inline-flex items-center">
                <input id={id} name={name} disabled={disabled} type="checkbox"/>
                {labelText && <span className="ml-4">{labelText}</span>}
            </label>
        </div>
        {errorText && <p className='text-sm mb-2 text-red'>{errorText}</p>}
    </div>
);

export default Checkbox;
