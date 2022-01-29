import React, { FC } from 'react';
import { Card } from '../Card/'
import { Product } from '@team21/types'
import { useNavigate, } from 'react-router-dom'
import "./index.css"

type Props = {
    product: Product;
};

type BodyProps = {
    description: string;
    price: number;
    quantity: number;
}

const ProductTileBody: FC<BodyProps> = ({description, price, quantity}) => { 
    function setDescription(description:string){
        if(description.length < 90)
            return description
        return `${description.slice(0, 90)}...` 
    }
    return <React.Fragment> 
        <div className="description my-8">
            <p className="text-base text-lightGray px-8 whitespace-normal break-all text-left"> {description && setDescription(description)} </p>
        </div>
        <div className="my-12">
            {price && <span className="text-xl text-whitesmoke font-semibold"> ${price} </span>}
        </div>
        <div className="my-8">
            <span className={`${quantity > 0 ? 'text-success' : 'text-red'} text-md font-semibold`}> {quantity > 0 ? `In Stock: ${quantity}` : 'Out of Stock'} </span>
        </div>
    </React.Fragment>
};

const ProductTile: FC<Props> = ({ product }) => {
    const { id, name, image, description, price, quantity } = product;
    const navigate = useNavigate();
  
    function openProduct() {
        navigate('/product', { state:{ id: id }});
    }

    return <Card 
        title={name}
        imageSrc={image}
        imageAlt={`${name}-image`}
        imageHeight="200px"
        buttonTitle={"More Details"}
        onClick={openProduct}
        body={ 
            <ProductTileBody description={description} price={price} quantity={quantity} />
        } 
        customClass="product-tile w-80 mx-24 my-12"
    />
};

export default ProductTile;
