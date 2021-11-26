import React, { FC } from 'react';
import { ProductTile } from '../../data-display/ProductTile'

type Props = {
    products: any[];
    categoryName: string;
};

const PDP: FC<Props> = ({ categoryName, products }) => (
    <div className="p-24">
        <h1 className=" text-h1 text-left mb-24 ml-24">{categoryName}</h1>
        <div className="flex justify-items-start items-center flex-wrap">
            {products.map((product: Props, index: number)=>(
                <ProductTile key={index} product={product}/>
            ))}
        </div>
    </div>

);

export default PDP;
