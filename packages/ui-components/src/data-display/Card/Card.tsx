import React, { FC } from 'react';
import { Image } from '../Image'
import { Button } from '../../input-controls/Button'

type Props = {
  title?: string;
  body?: string;
  buttonTitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

};

const Card: FC<Props> = ({ title, body, buttonTitle, onClick, imageSrc, imageAlt }) => (
    <div className="shadow-md overflow-hidden w-72 p-2 border-default border-solid border-lightGray">
      <Image
        src={`${imageSrc ? imageSrc : ''}`}
        alt={`${imageAlt ? imageAlt : "card-image"}`}
      />
    
      <div className="p-4">
        <h5 className="text-xl font-semibold mb-2">{title && title}</h5>
    
        <p className="mb-12">
         {body && body}
        </p>
    
        <Button buttonColor="primary" textColor="whitesmoke" title={buttonTitle} onClick={onClick}/>
      </div>
    </div>
);

export default Card;
