import { Loader, Button, Image } from '@team21/ui-components';
import React, { FC} from 'react';
import { useUser } from '@team21/web-shop-front/src/state/state';
import useRemoveItemFromCart from '@team21/web-shop-front/src/graphql/cart/useRemoveItemFromCart';
import useGetCartProducts from '@team21/web-shop-front/src/graphql/cart/useGetCartProducts';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { CartItem } from "@team21/types/"
import 'react-toastify/dist/ReactToastify.css';

const ShoppingCart: FC<Record<string, never>> = () => {
  const [{ user }] = useUser();
  const navigate = useNavigate();
  
  const [removeItemFromCart] = useRemoveItemFromCart();
  const { data, loading, refetch } = useGetCartProducts(user.cart_id); 

  if (!data && loading) return <Loader />
  
  const cartItems = data?.cart_item;
  let orderTotal = 0;
  cartItems?.map((item: CartItem) => {
      orderTotal += item.product.price * item.quantity
  })

  function checkout(){ navigate('/checkout') }

  async function removeItem(cartItemId:string) {
    await removeItemFromCart({ variables: { id: cartItemId } })
    refetch();
    toast.success('Item removed from cart!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
    });
}


return <div className="w-10/12 p-24 mx-auto">
    <h1 className="text-h1 mb-32"> Shopping cart </h1>
    <div className="flex w-full">
        <div className="w-3/5 h-600px overflow-auto">
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
                <p>${orderTotal}</p>
            </div>
            <Button buttonColor="primary" size="md" textColor="whitesmoke" onClick={checkout} title="Checkout" block={true} />
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
export default ShoppingCart;
