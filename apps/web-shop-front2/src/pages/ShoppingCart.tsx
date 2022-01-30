import { CartItem } from '@team21/types/';
import { Button, Image, Loader } from '@team21/ui-components';
import useGetCartProducts from '@team21/web-shop-front2/src/graphql/cart/useGetCartProducts';
import useRemoveItemFromCart from '@team21/web-shop-front2/src/graphql/cart/useRemoveItemFromCart';
import { useUser } from '@team21/web-shop-front2/src/state/state';
import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShoppingCart: FC<Record<string, never>> = () => {
  const [{ user }] = useUser();
  const navigate = useNavigate();

  const [removeItemFromCart] = useRemoveItemFromCart();
  const { data, loading, refetch } = useGetCartProducts(user.cart_id);

  if (!data && loading) return <Loader />;

  const cartItems = data?.cart_item;
  let orderTotal = 0;
  cartItems?.map((item: CartItem) => {
    orderTotal += item.product.price
  });


  function checkout() {
    const canProceed = cartItems ? true : false;
    if(canProceed)
      navigate('/checkout');
  }

  function categories() {
    navigate('/categories');
  }

  async function removeItem(cartItemId: string) {
    await removeItemFromCart({ variables: { id: cartItemId } });
    refetch();
    toast.success('Item removed from cart!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
    });
  }

  return (
    <div className="w-10/12 p-24 mx-auto">
      <h1 className="mb-32 text-h1 text-whitesmoke"> Shopping cart </h1>
      <div className="flex w-full">
        <div className="w-3/5 overflow-auto h-600px">
          <ul role="list">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((cartItem: CartItem) => (
                <li key={cartItem.product.id} className="flex mb-16 h-180px">
                  <Image
                    src={cartItem.product.image}
                    alt={`${cartItem.product.name}-image`}
                    wrapperClassName="flex justify-center items-center w-1/4 border-default border-solid border-lightGray"
                  />
                  <div className="flex flex-col flex-1 pb-12 mx-24">
                    <div className="flex justify-between text-xl font-medium text-whitesmoke">
                      <h3>{cartItem.product.name}</h3>
                      <p className="ml-4">${cartItem.product.price}</p>
                    </div>
                    <div className="flex items-end justify-between flex-1 text-md">
                      <button
                        onClick={() => removeItem(cartItem.id)}
                        type="button"
                        className="font-medium text-primary hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className='block'>
                <div className='text-whitesmoke text-xl mb-12'> You have no items in your cart... </div>
                <Button
                  buttonColor="primary"
                  size="md"
                  textColor="whitesmoke"
                  onClick={categories}
                  title="Continue Shopping"
                />
              </div>
            )}
          </ul>
        </div>
        <div className="w-2/5 ml-16">
          <h2 className="mb-24 font-medium text-center text-h3 text-whitesmoke">Order Summary</h2>
          <div className="flex justify-between mb-24 font-medium text-gray-500 text-md">
            <p className='text-whitesmoke'>Order Total</p>
            <p className='text-whitesmoke'>${orderTotal}</p>
          </div>
          <Button
            buttonColor="primary"
            size="md"
            textColor="whitesmoke"
            onClick={checkout}
            title="Checkout"
            block
            disabled={!cartItems!.length}
          />
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
  );
};
export default ShoppingCart;
