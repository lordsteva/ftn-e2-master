import React, { FC } from 'react';
import { Card } from '../Card/'

type Props = {
    product: any; // this should change 
};

type BodyProps = {
    description: string;
    price: number;
    inStock: boolean;
}

const ProductTileBody: FC<BodyProps> = ({description, price, inStock}) => ( 
    <> 
        <div className="my-8">
            <p className="text-base text-darkGray"> {description} </p>
        </div>
        <div className="my-12">
            {price && <span className="text-xl text-dark font-semibold"> ${price} </span>}
        </div>
        <div className="my-8">
            <span className={`${inStock ? 'text-success' : 'text-red'} text-md font-semibold`}> {inStock ? 'In Stock' : 'Out of Stock'} </span>
        </div>
    </>
);

const ProductTile: FC<Props> = ({ product }) => ( 
    <Card 
        title={product.name}
        imageSrc={product.image}
        buttonTitle={product.buttonTitle}
        onClick={product.onClick}
        body={ 
            <ProductTileBody description={product.description} price={product.price} inStock={product.inStock} />
        } 
        customClass="w-80 mx-24 my-12"
    />
);

export default ProductTile;
