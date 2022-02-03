import { Loader, Image, Button } from '@team21/ui-components';
import React, { FC, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import useGetProductById from '../graphql/product/useGetProductById';
import { useUser } from '@team21/web-shop-front2/src/state/state';
import useAddItemToCart from '@team21/web-shop-front2/src/graphql/cart/useAddItemToCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Product } from 'packages/types';

const ProductPage: FC<Record<string, never>> = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { data, loading } = useGetProductById(state.id);
    const [addItemToCart] = useAddItemToCart();
    const [isLoader, setIsLoader] = useState(false);
    const [{ user }] = useUser();

    if(!data && loading) return <Loader />
    const product = data!.products[0]

    function convertDate (date: string) {
        const d = date.split('T')
        const dat = d[0].split('-')
        const time = d[1].split('.')
        const tm = time[0].split('+')
        return dat[2]+"/"+dat[1]+"/"+dat[0]+" "+tm[0]
    }

    async function addToCart(product_id: string){
        setIsLoader(true)
        const check = checkDate()
        if(check && state.category !== "Courses"){
            toast.error('Item has expired!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });
            setIsLoader(false)
            return
        }
        await addItemToCart({ variables: { cart_id: user.cart_id, product_id } })
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

    function openSubscriptionCheckout (prd: Product) {
        navigate('subscription-checkout', { state: { product: prd }})
    }

    function checkDate () {
        const today = new Date()
        const date_start = new Date(product!.date_start!)
        return date_start < today && state.category !== "Courses"
    }

    
    if(isLoader) return <Loader />

    return <div className="flex py-24 px-40 w-10/12 mx-auto">
        <div className="w-1/3">
            <Image wrapperClassName="border-solid border-default border-lightGray h-full" alt={`${product.name}-image`} src={product.image} />
        </div>
        <div className="flex flex-col w-2/3 px-24">
            <h1 className="text-whitesmoke text-left text-h1 mb-24"> {product.name} </h1>
            <p className="text-base text-lightGray text-left mb-16 whitespace-normal break-all "> {product.description} </p> 
            { product && product.date_start && state.category !== "Courses" && <div className="text-whitesmoke text-md font-semibold mb-16">Start: {convertDate(product.date_start)}</div> }
            { product && product.date_end && state.category !== "Courses" && <div className="text-whitesmoke text-md font-semibold mb-16">End: {convertDate(product.date_end)} </div> }
            { checkDate() && <div className='text-red mb-16'> Item Expired</div>}
            { state.category === "Courses" && product.course_cost && <div className="text-lg text-whitesmoke font-semibold text-left mb-12"> Subscription: ${product.course_cost+' '+product.course_plan+' / '+product.course_last+' times'} </div> }
            <div className="flex justify-between mb-24  border-b-default border-solid border-gray">
                { product && product.place && <span className="text-success text-lg font-semibold"> {product.place} </span> }
                { product.price && <span className="text-xl text-whitesmoke font-semibold text-left mb-12"> ${product.price} </span> }
            </div>
         
            <div className="flex flex-wrap mb-4 w-full justify-end">
                {state.category === "Courses" && product.course_cost && <Button onClick={()=> openSubscriptionCheckout(product)} size="md" buttonColor="primary" title="Subscribe" customClass='mr-16' />}
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
            theme='dark'
        />
    </div>
};
export default ProductPage;
