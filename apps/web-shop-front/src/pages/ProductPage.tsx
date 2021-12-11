import { Loader, Image, Button } from '@team21/ui-components';
import React, { FC, useState} from 'react';
import { useLocation } from 'react-router-dom'
import useGetProductById from '../graphql/product/useGetProductById';
import { Product } from '@team21/types';
import { useUser } from '@team21/web-shop-front/src/state/state';
import useAddItemToCart from '@team21/web-shop-front/src/graphql/cart/useAddItemToCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductPage: FC<Record<string, never>> = () => {
    const { state } = useLocation();
    const { data, loading } = useGetProductById(state.id);
    const [addItemToCart] = useAddItemToCart();
    const [quantity, setQuantity] = useState(1);
    const [isLoader, setIsLoader] = useState(false);
    const [{ user }] = useUser();

    if(!data && loading) return <Loader />

    const product = data!.products[0]

    function changeQuantity(e:React.FormEvent<HTMLInputElement>) {
        setQuantity(parseInt(e.currentTarget.value))
    }

    async function addToCart(product_id: string){
        setIsLoader(true)
        await addItemToCart({ variables: { cart_id: user.cart_id, product_id, quantity } })
        toast.success('Item added to cart!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
        });
        setIsLoader(false)
    }

    
    if(isLoader) return <Loader />

    return <div className="flex py-24 px-40 w-10/12 mx-auto">
        <div className="w-1/3">
            <Image wrapperClassName="border-solid border-default border-lightGray h-full" alt={`${product.name}-image`} src={product.image} />
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
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
        />
    </div>
};
export default ProductPage;
