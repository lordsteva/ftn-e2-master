import React, { FC, useState } from 'react';
import { Button, Input, Loader, Image } from '@team21/ui-components'
import useGetCartProducts from '@team21/web-shop-front/src/graphql/cart/useGetCartProducts';
import { CartItem } from "@team21/types" 
import { useUser } from '@team21/web-shop-front/src/state/state';
import { useForm } from 'react-hook-form';
import useCreateOrder from '@team21/web-shop-front/src/graphql/order/useCreateOrder'
import useCreateOrderProducts from '@team21/web-shop-front/src/graphql/order/useCreateOrderProducts'
import useRemoveItemFromCart from '@team21/web-shop-front/src/graphql/cart/useRemoveItemFromCart'

const CheckoutPage: FC = () => {
    const [{ user }] = useUser();
    const { data, loading } = useGetCartProducts(user.cart_id);
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
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

    async function continueToPayment (data: { first_name: string; last_name: string; country: string; city: string; address: string; zip_code: string; phone: string; }){
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
                    <form onSubmit={handleSubmit(continueToPayment)}>
                        <Input 
                            id="first_name" 
                            type="text" 
                            labelText="First Name" 
                            wrapperClassName="mb-12" 
                            customClass="rounded-xs" 
                            innerRef={register('first_name', {
                                required: 'First Name required!',
                            })}
                            errorText={errors.first_name?.message}
                        />
                        <Input 
                            id="last_name" 
                            type="text" labelText="Last Name" 
                            wrapperClassName="mb-12" 
                            customClass="rounded-xs"
                            innerRef={register('last_name', {
                                required: 'Last Name required!',
                            })}
                            errorText={errors.last_name?.message}
                        />
                        <Input 
                            id="country" 
                            type="text" 
                            labelText="Country" 
                            wrapperClassName="mb-12" 
                            customClass="rounded-xs"
                            innerRef={register('country', {
                                required: 'Country required!',
                            })}
                            errorText={errors.country?.message}
                        />
                        <Input 
                            id="city" 
                            type="text" 
                            labelText="City" 
                            wrapperClassName="mb-12" 
                            customClass="rounded-xs"
                            innerRef={register('city', {
                                required: 'City required!',
                            })}
                            errorText={errors.city?.message}
                        />
                        <Input 
                            id="address" 
                            type="text" 
                            labelText="Address" 
                            wrapperClassName="mb-12" 
                            customClass="rounded-xs"
                            innerRef={register('address', {
                                required: 'Address required!',
                            })}
                            errorText={errors.address?.message}
                        />
                        <Input 
                            id="zip_code" 
                            type="text" 
                            labelText="Zip Code" 
                            wrapperClassName="mb-12" 
                            customClass="rounded-xs"
                            innerRef={register('zip_code', {
                                required: 'Zip code required!',
                            })}
                            errorText={errors.zip_code?.message}
                        />
                        <Input 
                            id="phone" 
                            type="text" 
                            labelText="Phone" 
                            wrapperClassName="mb-12" 
                            customClass="rounded-xs"
                            innerRef={register('phone', {
                                required: 'Phone required!',
                            })}
                            errorText={errors.phone?.message}
                        />
                        <Button buttonColor="primary" size="md" textColor="whitesmoke" title="Continue to Payment" customClass='mt-16' block={true} />
                    </form>
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
