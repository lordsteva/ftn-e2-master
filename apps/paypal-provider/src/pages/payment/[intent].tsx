import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import config from 'config/constants';
import getPaymentIntentInfo from 'graphql/backend/getPaymentIntentInfo';
import React from 'react';

export interface HomeProps {
  clientId: string;
  apiKey: string;
  intent: string;
  success_url: string;
  fail_url: string;
  currency: string;
  amount: number;
}

const Home: React.FunctionComponent<HomeProps> = ({
  clientId,
  apiKey,
  fail_url,
  intent,
  success_url,
  currency,
  amount,
}) => {
  //TOOD: style, show data....

  return (
    <div className="max-w-xl px-4 py-4 m-auto mt-24 text-center border-2 border-gray-900">
      <div className="pb-20 text-4xl font-bold text-blue-800 ">PayPal payment</div>

      <div className="pb-20 pl-4 text-2xl text-left ">Total: {`${amount}${currency}`}</div>
      <PayPalScriptProvider
        options={{
          'client-id': clientId,
        }}
      >
        <PayPalButtons
          style={{ layout: 'horizontal', color: 'blue', label: 'pay', tagline: false }}
          createOrder={async () => {
            const createOrderUrl = `${config.HOST_ADDRESS}/api/create-order/`;
            const res = await fetch(createOrderUrl, {
              method: 'post',
              body: JSON.stringify({ clientId, apiKey, intent }),
            });
            const { id } = await res.json();
            return id;
          }}
          onCancel={function () {
            console.log('CANCEL');
            //TODO: remvoe intent, redirect, etc...
          }}
          onApprove={async function ({ orderID }) {
            const approveUrl = `${config.HOST_ADDRESS}/api/capture-order/`;
            return fetch(approveUrl, {
              method: 'post',
              body: JSON.stringify({ orderID, apiKey, clientId }),
            })
              .then(function () {
                window.location.href = success_url;
              })
              .catch(function (error) {
                console.log(error);
                window.location.href = fail_url;
              });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export async function getServerSideProps(context) {
  const intent = context.query.intent;
  const { metadata, apiKey, success_url, fail_url, amount, currency } = await getPaymentIntentInfo({
    id: intent,
  });

  const { clientId } = JSON.parse(metadata);
  const props = { clientId, apiKey, intent, success_url, fail_url, amount, currency };
  return {
    props, // will be passed to the page component as props
  };
}

export default Home;