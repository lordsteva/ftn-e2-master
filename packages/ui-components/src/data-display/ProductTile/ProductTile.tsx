import React, { FC } from 'react';
import { Card } from '../Card/'
import { Product } from '@team21/types'
import { useNavigate, } from 'react-router-dom'
import "./index.css"

type Props = {
    product: Product;
    category?: string;
};

const ProductTileBody: FC<Props> = ({product, category}) => { 
    function setDescription(description:string){
        if(description.length < 90)
            return description
        return `${description.slice(0, 90)}...` 
    }

    function convertDate (date: string) {
        const d = date.split('T')
        const dat = d[0].split('-')
        const time = d[1].split('.')
        const tm = time[0].split('+')
        return dat[2]+"/"+dat[1]+"/"+dat[0]+" "+tm[0]
    }

    return <React.Fragment> 
        <div className="description my-8">
            <p className="text-base text-lightGray px-8 whitespace-normal break-all text-left"> {product.description && setDescription(product.description)} </p>
        </div>
        <div className="my-12">
            {product.price && <span className="text-xl text-whitesmoke font-semibold"> ${product.price} </span>}
        </div>
        <div className="my-8">
            { product && product.quantity && <span className={`${product.quantity > 0 ? 'text-success' : 'text-red'} text-md font-semibold`}> {product.quantity > 0 ? `In Stock: ${product.quantity}` : 'Out of Stock'} </span> }
            { product && product.date_start && !product.course_cost && !product.course_last && !product.course_plan && <div className="text-whitesmoke text-md font-semibold text-center mb-16">Start: {convertDate(product.date_start)}</div> }
            { product && product.date_end && !product.course_cost && !product.course_last && !product.course_plan && <div className="text-whitesmoke text-md font-semibold text-center mb-16">End: {convertDate(product.date_end)} </div> }
            { product && product.place && <div className="text-success text-lg font-semibold"> {product.place} </div> }
        </div>
    </React.Fragment>
};

const ProductTile: FC<Props> = ({ product, category }) => {
    const { id, name, image } = product;
    const navigate = useNavigate();
  
    function openProduct() {
        navigate('/product', { state:{ id: id, category: category ? category: '' }});
    }

    return <Card 
        title={name}
        imageSrc={image}
        imageAlt={`${name}-image`}
        imageHeight="200px"
        buttonTitle={"More Details"}
        onClick={openProduct}
        body={ 
            <ProductTileBody product={product} category={category} />
        } 
        customClass="product-tile w-80 mx-24 my-12"
    />
};

export default ProductTile;
