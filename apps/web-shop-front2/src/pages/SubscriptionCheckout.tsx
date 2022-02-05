import { Loader, Button, Image } from '@team21/ui-components';
import React, { FC, useState } from 'react';
import { useUser } from '@team21/web-shop-front2/src/state/state';
import { useLocation } from 'react-router-dom'
import useCreateSubscription from "../graphql/subscription/useCreateSubscription"
import useSubscriptionIntent from '../graphql/order/useCreateSubscriptionIntent';

const SubscriptionCheckout: FC<Record<string, never>> = () => {
    const { state } = useLocation();
    const [{ user }] = useUser(); 
    const [isLoader, setIsLoader] = useState(false);
    const [createSub] = useCreateSubscription();
    const [ceateSubscriptionIntent] = useSubscriptionIntent();

    const product = state.product

    async function continueToPayment() {
        setIsLoader(true);
        try {
            const response = await createSub({
            variables: {
                user_id: user.id,
                course: product.id
            },
            });
            const subId = response.data.insert_subscriptions_one.id;
            if (subId) {
                const {
                    data: { createSubscriptionIntent },
                } = await ceateSubscriptionIntent({
                    variables: { amount: product.course_cost, currency: 'USD', order_id: subId },
                });
                window.location.replace(
                    `http://localhost:3000/choose-provider/${process.env.REACT_APP_PSP_API_KEY}/${createSubscriptionIntent.link}`,
                );
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoader(false);
        }
      }

    if(isLoader) return <Loader />

    return <div className="w-10/12 p-24 mx-auto">
        <h1 className="mb-32 text-h1 text-whitesmoke border-b-default border-lightGray pb-16"> Checkout </h1>
        <div className='flex py-24'>
            <div className="w-1/3">
                <Image wrapperClassName="border-solid border-default border-lightGray h-full" alt={`${product.name}-image`} src={product.image} />
            </div>
            <div className="flex flex-col w-2/3 px-24">
                <h1 className="text-whitesmoke text-left text-h1 mb-24"> {product.name} </h1>
                <p className="text-base text-lightGray text-left mb-16 whitespace-normal break-all "> {product.description} </p> 
                { product.course_cost && <div className="text-lg text-whitesmoke font-semibold text-left mb-12"> Subscription: ${product.course_cost+' '+product.course_plan+' / '+product.course_last+' times'} </div> }
                <div className="flex justify-between mb-24">
                    { product && product.place && <span className="text-success text-lg font-semibold"> {product.place} </span> }
                </div>
            
                <div className="flex flex-wrap pt-16 w-full justify-end border-t-default border-solid border-gray">
                    <Button onClick={()=> continueToPayment()} size="md" buttonColor="primary" title="Proceed to payment" />
                </div>
            </div>
        </div>
      
    </div>
};
export default SubscriptionCheckout;
