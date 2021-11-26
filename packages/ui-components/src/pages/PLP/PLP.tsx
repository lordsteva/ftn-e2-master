import React, { FC } from 'react';
import { ProductTile } from '../../data-display/ProductTile'
import { Button } from '../../input-controls/Button'

type Props = {
    products: any[];
    categoryName: string;
};

const productPerPage = 5;

const PLP: FC<Props> = ({ categoryName, products }) => {  

    return <div className="p-24">
        <h1 className=" text-h1 text-left mb-24 ml-24">{categoryName}</h1>
        <div className="flex justify-items-start items-center flex-wrap">
            {products.map((product: Props, index: number)=>(
                <ProductTile key={index} product={product}/>
            ))}
        </div>
        {   
            products.length > productPerPage && 
            <div className="flex justify-center items-center mt-24">
                <Button buttonColor="primary" textColor="whitesmoke" title="Show More" />
            </div>
        }
    </div>
};

export default PLP;
