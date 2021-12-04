import React, { FC, ReactNode } from 'react';
import { Image } from '../Image'
import { Button } from '../../input-controls/Button'
import placeholder from "../../assets/placeholder.jpg"

type Props = {
  title?: string;
  body?: ReactNode;
  buttonTitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageHeight?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  customClass?: string;

};

const Card: FC<Props> = ({ title, body, buttonTitle, onClick, imageSrc, imageAlt, imageHeight, customClass}) => (
    <div className={`hover:shadow-lg overflow-hidden p-4 border-default border-solid border-lightGray ${customClass ? customClass : ''}`}>
      <Image
        src={`${imageSrc ? imageSrc : placeholder}`}
        alt={`${imageAlt ? imageAlt : "card-image"}`}
        height={imageHeight && imageHeight}
      />
    
      <div className="p-4 mt-8 text-center">
        <h5 className="text-xl font-semibold mb-8">{title}</h5>
    
        <div className="mb-24">
         {body}
        </div>
    
        <Button buttonColor="primary" textColor="whitesmoke" title={buttonTitle} onClick={onClick} customClass="mb-12"/>
      </div>
    </div>
);

export default Card;
