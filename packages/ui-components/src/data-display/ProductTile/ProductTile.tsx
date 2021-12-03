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
    function setDescription(description){
        if(description.length < 90)
            return description
        return `${description.slice(0, 90)}...` 
    }
    return <React.Fragment> 
        <div className="description my-8">
            <p className="text-base text-darkGray px-8 whitespace-normal break-all text-left"> {description && setDescription(description)} </p>
        </div>
        <div className="my-12">
            {price && <span className="text-xl text-dark font-semibold"> ${price} </span>}
        </div>
        <div className="my-8">
            <span className={`${quantity > 0 ? 'text-success' : 'text-red'} text-md font-semibold`}> {quantity > 0 ? `In Stock: ${quantity}` : 'Out of Stock'} </span>
        </div>
    </React.Fragment>
};

const ProductTile: FC<Props> = ({ product }) => {

    const navigate = useNavigate();
  
    function openProduct() {
        navigate('/product', { state:{ id: product.id }});
    }

    return <Card 
        title={product.name}
        imageSrc={product.image}
        buttonTitle={"More Details"}
        onClick={openProduct}
        body={ 
            <ProductTileBody description={product.description} price={product.price} quantity={product.quantity} />
        } 
        customClass="product-tile w-80 mx-24 my-12"
    />
};

export default ProductTile;
