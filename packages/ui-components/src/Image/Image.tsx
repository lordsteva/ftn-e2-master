import React, { FC } from 'react';

type Props = {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  wrapperClassName?: string;
  rounded?: boolean;
};

const Avatar: FC<Props> = ({ src, alt, width, height, wrapperClassName, rounded }) => (
    <div className={wrapperClassName}>
        <div className={`w-${width} h-${height} p-4`}>
            <img
                src={src && src}
                alt={alt && alt}
                className={`${rounded ? 'rounded-full' : 'rounded-none'} max-w-full h-auto align-middle hover:opacity-90`}
            />
        </div>
    </div>
);

export default Avatar;
