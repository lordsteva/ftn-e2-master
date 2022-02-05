import React, { FC } from 'react';
import placeholder from "../../assets/placeholder.jpg"
import "./index.css"

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
        <div className={`w-${width ? width : 'full'} h-${height ? height : 'full'} p-4 mx-auto`}>
            <img
                src={src || placeholder}
                alt={alt || 'image'}
                className={`image ${rounded ? 'rounded-full' : 'rounded-none'} w-full max-h-full align-middle hover:opacity-90}`}
            />
        </div>
    </div>
);

export default Image;
