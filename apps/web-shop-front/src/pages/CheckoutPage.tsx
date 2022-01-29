import { CartItem, CheckoutDataForm } from '@team21/types';
import { Image, Loader } from '@team21/ui-components';
import useGetCartProducts from '@team21/web-shop-front/src/graphql/cart/useGetCartProducts';
import useCreateOrder from '@team21/web-shop-front/src/graphql/order/useCreateOrder';
import useCreateOrderProducts from '@team21/web-shop-front/src/graphql/order/useCreateOrderProducts';
import { useUser } from '@team21/web-shop-front/src/state/state';
import React, { FC, useState } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import useCreatePaymentIntent from '../graphql/order/useCreatePaymentIntent';
import useUpdateProductsQty from '../graphql/order/useUpdateProductsQty';

const CheckoutPage: FC = () => {
  const [{ user }] = useUser();
  const { data, loading } = useGetCartProducts(user.cart_id);
  const [createOrder] = useCreateOrder();
  const [createOrderProducts] = useCreateOrderProducts();
  const [ceatePaymentIntent] = useCreatePaymentIntent();
  const [updateProductsQty] = useUpdateProductsQty();

  const [isLoader, setIsLoader] = useState(false);

  if (!data && loading) return <Loader />;
  if (isLoader) return <Loader />;

  const cartItems = data?.cart_item;

  let orderTotal = 0;
  cartItems?.map((item: CartItem) => {
    orderTotal += item.product.price * item.quantity;
  });

  async function continueToPayment(data: CheckoutDataForm) {
    setIsLoader(true);
    const response = await createOrder({
      variables: {
        first_name: data.first_name,
        last_name: data.last_name,
        country: data.country,
        city: data.city,
        address: data.address,
        zip_code: data.zip_code,
        phone: data.phone,
        total_price: orderTotal,
      },
    });
    const orderId = response.data.insert_orders_one.id;
    if (orderId && cartItems) {
      const objects = cartItems.map((item) => ({
        order_id: orderId,
        price: item.product.price,
        product_id: item.product.id,
        quantity: item.quantity,
      }));
      const { cart_id } = user;

      await createOrderProducts({ variables: { objects, cart_id } });

      for(const item of cartItems){
        await updateProductsQty({ variables: { id: item.product.id, quantity: item.product.quantity - item.quantity }})
      }

      const {
        data: { createPaymentIntent },
      } = await ceatePaymentIntent({
        variables: { amount: orderTotal, currency: 'USD', order_id: orderId },
      });
      window.location.replace(
        `http://localhost:3000/choose-provider/${process.env.REACT_APP_PSP_API_KEY}/${createPaymentIntent.link}`,
      );
    }

    setIsLoader(false);
  }

  return (
    <div className="w-10/12 p-24 mx-auto">
      <h1 className="mb-32 text-h1 text-whitesmoke"> Checkout </h1>
      <div className="flex justify-between">
        <div className="flex flex-col w-2/5 px-40">
          <h2 className="mb-24 font-medium text-left text-h3 text-whitesmoke">Contact information</h2>
          <CheckoutForm continueToPayment={continueToPayment} />
        </div>
        <div className="flex flex-col w-3/5 px-40">
          <h2 className="mb-24 font-medium text-left text-h3 text-whitesmoke">Order Summary</h2>
          <div className="mb-64 overflow-auto h-550px">
            <ul role="list">
              {cartItems?.map((item: CartItem) => (
                <li key={item.id} className="flex mb-16 h-150px">
                  <Image
                    src={item.product.image}
                    alt={`${item.product.name}-image`}
                    wrapperClassName="flex justify-center items-center w-1/4 border-default border-solid border-lightGray"
                  />
                  <div className="flex flex-col flex-1 pb-12 mx-24">
                    <div className="flex justify-between text-xl font-medium text-gray-900">
                      <h3 className='text-whitesmoke'>{item.product.name}</h3>
                      <p className="ml-4 text-whitesmoke">${item.product.price}</p>
                    </div>
                    <div className="flex items-end justify-between flex-1 text-md">
                      <p className="text-lightGray">Qty: {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-solid border-t-default border-lightGray">
            <div className="flex justify-between mt-12 mb-24 font-medium text-gray-500 text-md">
              <p className="text-xl text-whitesmoke">Order Total</p>
              <p className="text-xl text-whitesmoke">${orderTotal}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
