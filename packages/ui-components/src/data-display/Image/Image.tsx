import React, { FC } from 'react';
import placeholder from "../../assets/placeholder.jpg"

type Props = {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  wrapperClassName?: string;
  rounded?: boolean;
};

const Image: FC<Props> = ({ src, alt, width, height, wrapperClassName, rounded }) => (
    <div className={wrapperClassName}>
        <div className={`w-${width ? width : 'full'} h-${height ? height : 'auto'} p-4 mx-auto`}>
            <img
                src={(src && src !=='') ? src : placeholder}
                alt={alt && alt}
                className={`${rounded ? 'rounded-full' : 'rounded-none'} max-w-full h-auto align-middle hover:opacity-90}`}
            />
        </div>
    </div>
);

export default Image;
