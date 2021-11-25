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

};

const Card: FC<Props> = ({ title, body, buttonTitle, onClick, imageSrc, imageAlt }) => (
    <div className="hover:shadow-lg overflow-hidden w-72 p-4 border-default border-solid border-lightGray">
      <Image
        src={`${imageSrc ? imageSrc : placeholder}`}
        alt={`${imageAlt ? imageAlt : "card-image"}`}
      />
    
      <div className="p-4">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
    
        <p className="mb-12">
         {body}
        </p>
    
        <Button buttonColor="primary" textColor="whitesmoke" title={buttonTitle} onClick={onClick}/>
      </div>
    </div>
);

export default Card;
