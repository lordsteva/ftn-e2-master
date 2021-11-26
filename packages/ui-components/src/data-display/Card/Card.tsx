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
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  additionalClasses?: string;

};

const Card: FC<Props> = ({ title, body, buttonTitle, onClick, imageSrc, imageAlt, additionalClasses}) => (
    <div className={`hover:shadow-lg overflow-hidden p-4 border-default border-solid border-lightGray ${additionalClasses ? additionalClasses : ''}`}>
      <Image
        src={`${imageSrc ? imageSrc : placeholder}`}
        alt={`${imageAlt ? imageAlt : "card-image"}`}
      />
    
      <div className="p-4 mt-8 text-center">
        <h5 className="text-xl font-semibold mb-8">{title}</h5>
    
        <p className="mb-24">
         {body}
        </p>
    
        <Button buttonColor="primary" textColor="whitesmoke" title={buttonTitle} onClick={onClick} additionalClasses="mb-12"/>
      </div>
    </div>
);

export default Card;
