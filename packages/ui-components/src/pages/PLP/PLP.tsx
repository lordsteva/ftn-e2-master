import React, { FC, useState } from 'react';
import { ProductTile } from '../../data-display/ProductTile'

type Props = {
    categoryName: string;
};

const PLP: FC<Props> = ({ categoryName }) => {  
    const [products, setProducts] = useState([]);

    return <div className="w-10/12 p-24 mx-auto">
        <h1 className=" text-h1 text-left mb-24 ml-24">{categoryName}</h1>
        <div className="flex justify-items-start items-center flex-wrap">
            {products.map((product: Props, index: number)=>(
                <ProductTile key={index} product={product}/>
            ))}
        </div>
    </div>
};

export default PLP;
