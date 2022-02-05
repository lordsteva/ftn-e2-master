import { Button, Image, Loader } from '@team21/ui-components';
import { useUser } from '@team21/web-shop-front2/src/state/state';
import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useCreatePaymentIntent from '../graphql/order/useCreatePaymentIntent';
import useCreateSubscription from '../graphql/subscription/useCreateSubscription';

const SubscriptionCheckout: FC<Record<string, never>> = () => {
  const { state } = useLocation();
  const [{ user }] = useUser();
  const [isLoader, setIsLoader] = useState(false);
  const [createSub] = useCreateSubscription();
  const [ceateSubscriptionIntent] = useCreatePaymentIntent();
  console.log(state.product);
  //course_cost: 23
  //course_last: 23
  //course_plan: "ye
  const product = state.product;

  async function continueToPayment() {
    setIsLoader(true);
    try {
      const response = await createSub({
        variables: {
          user_id: user.id,
          course: product.id,
        },
      });
      const subId = response.data.insert_subscriptions_one.id;
      if (subId) {
        const {
          data: { createPaymentIntent },
        } = await ceateSubscriptionIntent({
          variables: {
            amount: product.course_cost,
            currency: 'USD',
            order_id: subId,
            duration: product.course_last.toString(),
            unit: product.course_plan === 'yearly' ? 'YEAR' : 'MONTH',
          },
        });
        window.location.replace(
          `http://localhost:3000/choose-provider/${process.env.REACT_APP_PSP_API_KEY}/${createPaymentIntent.link}?subscribe=true`,
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoader(false);
    }
  }

  if (isLoader) return <Loader />;

  return (
    <div className="w-10/12 p-24 mx-auto">
      <h1 className="pb-16 mb-32 text-h1 text-whitesmoke border-b-default border-lightGray">
        {' '}
        Checkout{' '}
      </h1>
      <div className="flex py-24">
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
          {product.course_cost && (
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
          <div className="flex justify-between mb-24">
            {product && product.place && (
              <span className="text-lg font-semibold text-success"> {product.place} </span>
            )}
          </div>

          <div className="flex flex-wrap justify-end w-full pt-16 border-solid border-t-default border-gray">
            <Button
              onClick={() => continueToPayment()}
              size="md"
              buttonColor="primary"
              title="Proceed to payment"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubscriptionCheckout;
