import { Button, Image, Loader } from '@team21/ui-components';
import useAddItemToCart from '@team21/web-shop-front2/src/graphql/cart/useAddItemToCart';
import { useUser } from '@team21/web-shop-front2/src/state/state';
import { Product } from 'packages/types';
import React, { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGetProductById from '../graphql/product/useGetProductById';

const ProductPage: FC<Record<string, never>> = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { data, loading } = useGetProductById(state.id);
  const [addItemToCart] = useAddItemToCart();
  const [isLoader, setIsLoader] = useState(false);
  const [{ user }] = useUser();

  if (!data && loading) return <Loader />;
  const product = data!.products[0];

  function convertDate(date: string) {
    const d = date.split('T');
    const dat = d[0].split('-');
    const time = d[1].split('.');
    const tm = time[0].split('+');
    return dat[2] + '/' + dat[1] + '/' + dat[0] + ' ' + tm[0];
  }

  async function addToCart(product_id: string) {
    setIsLoader(true);
    const check = checkDate();
    if (
      check &&
      ((!product.course_cost && !product.course_last && !product.course_plan) ||
        state.category !== 'Courses')
    ) {
      toast.error('Item has expired!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
      setIsLoader(false);
      return;
    }
    await addItemToCart({ variables: { cart_id: user.cart_id, product_id } });
    toast.success('Item added to cart!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
    });
    setIsLoader(false);
  }

  function openSubscriptionCheckout(prd: Product) {
    navigate('subscription-checkout', { state: { product: prd } });
  }

  function checkDate() {
    const today = new Date();
    const date_start = new Date(product!.date_start!);
    return date_start < today && !product.course_cost;
  }

  if (isLoader) return <Loader />;
  const showSub =
    state.category === 'Courses' ||
    (product.course_cost && product.course_last && product.course_plan);
  return (
    <div className="flex w-10/12 px-40 py-24 mx-auto">
      <div className="w-1/3">
        <Image
          wrapperClassName="border-solid border-default border-lightGray h-full"
          alt={`${product.name}-image`}
          src={product.image}
        />
      </div>
      <div className="flex flex-col w-2/3 px-24">
        <h1 className="mb-24 text-left text-whitesmoke text-h1"> {product.name} </h1>
        <p className="mb-16 text-base text-left break-all whitespace-normal text-lightGray ">
          {' '}
          {product.description}{' '}
        </p>
        {product && product.date_start && !product.course_cost && (
          <div className="mb-16 font-semibold text-whitesmoke text-md">
            Start: {convertDate(product.date_start)}
          </div>
        )}
        {product && product.date_end && !product.course_cost && (
          <div className="mb-16 font-semibold text-whitesmoke text-md">
            End: {convertDate(product.date_end)}{' '}
          </div>
        )}
        {checkDate() && <div className="mb-16 text-red"> Item Expired</div>}
        {state.category === 'Courses' && product.course_cost && (
          <div className="mb-12 text-lg font-semibold text-left text-whitesmoke">
            {' '}
            Subscription: $
            {product.course_cost +
              ' ' +
              product.course_plan +
              ' / ' +
              product.course_last +
              ' times'}{' '}
          </div>
        )}
        <div className="flex justify-between mb-24 border-solid border-b-default border-gray">
          {product && product.place && (
            <span className="text-lg font-semibold text-success"> {product.place} </span>
          )}
          {product.price && (
            <span className="mb-12 text-xl font-semibold text-left text-whitesmoke">
              {' '}
              ${product.price}{' '}
            </span>
          )}
        </div>

        <div className="flex flex-wrap justify-end w-full mb-4">
          {showSub && (
            <Button
              onClick={() => openSubscriptionCheckout(product)}
              size="md"
              buttonColor="primary"
              title="Subscribe"
              customClass="mr-16"
            />
          )}
          <Button
            onClick={() => addToCart(product.id)}
            size="md"
            buttonColor="primary"
            title="Add to Cart"
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
        theme="dark"
      />
    </div>
  );
};
export default ProductPage;
