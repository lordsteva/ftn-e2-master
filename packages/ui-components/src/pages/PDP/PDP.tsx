import React, { ChangeEventHandler, FC, useState, useEffect } from 'react';
import { Image } from '../../data-display/Image'
import { Button } from '../../input-controls/'
import { Product } from '@team21/types';
import { useUser } from '@team21/web-shop-front/src/state/state';
import useAddItemToCart from '@team21/web-shop-front/src/graphql/cart/useAddItemToCart';
import { getUserFromToken } from "@team21/web-shop-front/src/utils/tokenUtils"

type Props = {
    product: Product;
};

const PDP: FC<Props> = ({product}) => {
    const [addItemToCart, { data, loading, called }] = useAddItemToCart();
    const [quantity, setQuantity] = useState(1);
    const [{ token }] = useUser();
    const [user, setUser] = useState({id:''})

    function changeQuantity(e:React.FormEvent<HTMLInputElement>) {
        setQuantity(parseInt(e.currentTarget.value))
    }

    function addToCart(product_id:string){
        addItemToCart({ variables: { user_id: user.id, product_id, quantity } })
    }

    useEffect(()=>{
        const user = getUserFromToken(token)
        if (user) { setUser(user) }
    },[])

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
                    value={quantity}
                    onChange={changeQuantity}
                    type="number"
                    min={1}
                    defaultValue={0}
                    className={"w-16 place-content-center bg-white text-dark border-default border-solid border-lightGray hover:border-gray focus:outline-none focus:border-dark pl-24 py-12"}
                />
                <Button onClick={()=> addToCart(product.id)} size="md" buttonColor="primary" title="Add to Cart" />
            </div>
        </div>
    </div>
};

export default PDP;
