import React, { FC} from 'react';
import { Button, Image, Loader} from '@team21/ui-components'
import useGetCartProducts from '@team21/web-shop-front/src/graphql/cart/useGetCartProducts';
import { useNavigate } from 'react-router';

type Props = {
    cartId: string;
}

const Cart: FC<Props> = ({cartId}) => {
    const navigate = useNavigate();

    function checkout(){ navigate('/checkout') }

    function removeItem(cartItemId) {
        
    }

    const { data, loading } = useGetCartProducts(cartId);

    if(!data && loading) return <Loader />
    const cartItems = data?.cart_item;
    return <div className="w-10/12 p-24 mx-auto">
        <h1 className="text-h1 mb-32"> Shopping cart </h1>
        <div className="flex w-full">
            <div className="w-3/5 h-400px overflow-auto">
                <ul role="list">
                    {(cartItems && cartItems.length > 0) ? cartItems.map((cartItem) => (
                    <li key={cartItem.product.id} className="flex h-180px mb-16">
                        <Image
                            src={cartItem.product.image}
                            alt={`${cartItem.product.name}-image`}
                            wrapperClassName="flex justify-center items-center w-1/4 border-default border-solid border-lightGray"
                        />
                        <div className="mx-24 flex-1 flex flex-col pb-12">
                            <div className="flex justify-between text-xl font-medium text-gray-900">
                                <h3>{cartItem.product.name}</h3>
                                <p className="ml-4">${cartItem.product.price}</p>
                            </div>
                        <div className="flex-1 flex items-end justify-between text-md">
                            <p className="text-gray-500">Qty: {cartItem.quantity}</p>
                            <button onClick={()=>removeItem(cartItem.id)} type="button" className="text-primary font-medium hover:underline">
                                Remove
                            </button>
                        </div>
                        </div>
                    </li>
                    )) : <div> No items in cart... </div>}
                </ul>
            </div>
            <div className="ml-16 w-2/5">
                <h2 className="text-h3 font-medium text-center mb-24">Order Summary</h2>
                <div className="flex justify-between text-md font-medium text-gray-500 mb-24">
                    <p>Order Total</p>
                    <p>{0}</p>
                </div>
                <Button buttonColor="primary" size="md" textColor="whitesmoke" onClick={checkout} title="Checkout" block={true} />
            </div>
        </div>
    </div>

};

export default Cart;
