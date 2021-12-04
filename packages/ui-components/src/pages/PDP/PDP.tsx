import React, { FC } from 'react';
import { Image } from '../../data-display/Image'
import { Button } from '../../input-controls/'
import { Product } from '@team21/types';

type Props = {
    product: Product;
};

const PDP: FC<Props> = ({product}) => {

    function addToCart(){}

    return <div className="flex py-24 px-40 w-10/12 mx-auto">
        <div className="w-1/3">
            <Image wrapperClassName="border-solid border-default border-lightGray" alt={`${product.name}-image`} src={product.image} />
        </div>
        <div className="flex flex-col w-2/3 px-24">
            <h1 className="text-left text-h1 mb-24"> {product.name} </h1>
            <p className="text-base text-darkGray text-left mb-16 whitespace-normal break-all "> {product.description} </p>
            <div className="flex justify-between mb-24  border-b-default border-solid border-gray">
                <span className={`${product.quantity > 0 ? 'text-success' : 'text-red'} text-md font-semibold text-left`}> {product.quantity > 0 ? `In Stock: ${product.quantity}` : 'Out of Stock'} </span>
                {product.price && <span className="text-xl text-dark font-semibold text-left mb-12"> ${product.price} </span> }
            </div>
            <div className="flex flex-wrap mb-4 w-full justify-end">
                <input
                    type="number"
                    min={1}
                    defaultValue={0}
                    className={"w-16 place-content-center bg-white text-dark border-default border-solid border-lightGray hover:border-gray focus:outline-none focus:border-dark pl-24 py-12"}
                />
                <Button onClick={addToCart} size="md" buttonColor="primary" title="Add to Cart" />
            </div>
        </div>
    </div>
};

export default PDP;
