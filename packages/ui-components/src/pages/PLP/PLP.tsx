import React, { FC } from 'react';
import { ProductTile } from '../../data-display/ProductTile'
import { Product } from '@team21/types'

type Props = {
    id: string;
    name: string;
    products?: Product[];
};

const PLP: FC<Props> = ({ name, products }) => {  

    return <div className="w-10/12 p-24 mx-auto">
        <h1 className=" text-h1 text-left mb-24 ml-24">{name}</h1>
        <div className="flex justify-items-start items-center flex-wrap">
            {products?.map((product: Product)=>(
                <ProductTile key={product.id} product={product}/>
            ))}
        </div>
    </div>
};

export default PLP;
