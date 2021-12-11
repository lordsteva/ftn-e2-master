import React, { FC, useState } from 'react';
import { Loader, Image } from '@team21/ui-components'
import useGetCartProducts from '@team21/web-shop-front/src/graphql/cart/useGetCartProducts';
import { CartItem, CheckoutDataForm } from "@team21/types" 
import { useUser } from '@team21/web-shop-front/src/state/state';
import useCreateOrder from '@team21/web-shop-front/src/graphql/order/useCreateOrder'
import useCreateOrderProducts from '@team21/web-shop-front/src/graphql/order/useCreateOrderProducts'
import useRemoveItemFromCart from '@team21/web-shop-front/src/graphql/cart/useRemoveItemFromCart'
import CheckoutForm from '../components/CheckoutForm';

const CheckoutPage: FC = () => {
    const [{ user }] = useUser();
    const { data, loading } = useGetCartProducts(user.cart_id);
    const [createOrder] = useCreateOrder();
    const [createOrderProducts] = useCreateOrderProducts();
    const [removeItemFromCart] = useRemoveItemFromCart();
    const [isLoader, setIsLoader] = useState(false);

    if(!data && loading) return <Loader />
    if(isLoader) return <Loader />

    const cartItems = data?.cart_item

    let orderTotal = 0;
    cartItems?.map((item: CartItem) => {
        orderTotal += item.product.price * item.quantity
    })

    async function continueToPayment (data: CheckoutDataForm){
        setIsLoader(true);
        const response = await createOrder({ variables: {
            first_name: data.first_name,
            last_name: data.last_name,
            country: data.country,
            city: data.city,
            address: data.address,
            zip_code: data.zip_code,
            phone: data.phone,
            user_id: user.id,
            total_price: orderTotal
        } })
        const orderId = response.data.insert_orders_one.id
        if(orderId && cartItems){
            for(const item of cartItems){
                await createOrderProducts({ variables: {
                    order_id: orderId,
                    price: item.product.price,
                    product_id: item.product.id,
                    quantity: item.quantity
                }})
                await removeItemFromCart({ variables: {
                    id: item.id
                }})
            }
        }
        setIsLoader(false);
    }

    return <div className="w-10/12 p-24 mx-auto">
            <h1 className="text-h1 mb-32"> Checkout </h1>
            <div className="flex justify-between">
                <div className="flex flex-col w-2/5 px-40">
                    <h2 className="text-h3 font-medium text-left mb-24">Contact information</h2>
                    <CheckoutForm continueToPayment={continueToPayment} />
                </div>
                <div className="flex flex-col w-3/5 px-40">
                    <h2 className="text-h3 font-medium text-left mb-24">Order Summary</h2>
                    <div className="h-550px overflow-auto mb-64">
                        <ul role="list">
                            {cartItems?.map((item: CartItem) => (
                            <li key={item.id} className="flex h-150px mb-16">
                                <Image
                                    src={item.product.image}
                                    alt={`${item.product.name}-image`}
                                    wrapperClassName="flex justify-center items-center w-1/4 border-default border-solid border-lightGray"
                                />
                                <div className="mx-24 flex-1 flex flex-col pb-12">
                                    <div className="flex justify-between text-xl font-medium text-gray-900">
                                        <h3>{item.product.name}</h3>
                                        <p className="ml-4">${item.product.price}</p>
                                    </div>
                                <div className="flex-1 flex items-end justify-between text-md">
                                    <p className="text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div className='border-t-default border-solid border-lightGray'>             
                        <div className="flex justify-between text-md font-medium text-gray-500 mb-24 mt-12">
                            <p className="text-xl">Order Total</p>
                            <p className="text-xl">${orderTotal}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

};

export default CheckoutPage;
