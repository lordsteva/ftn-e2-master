import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';
import config from '../../config/constants';
import getClientId from '../../graphql/backend/getClientId';

export interface HomeProps {
  clientId: string;
  apiKey: string;
  intent: string;
  success_url: string;
  fail_url: string;
}

const Home: React.FunctionComponent<HomeProps> = ({
  clientId,
  apiKey,
  fail_url,
  intent,
  success_url,
}) => {
  //TOOD: style, show data....

  return (
    <div>
      <PayPalScriptProvider
        options={{
          'client-id': clientId,
        }}
      >
        <PayPalButtons
          style={{ layout: 'horizontal', color: 'blue', tagline: false }}
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
            console.log('object');
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
  const { metadata, apiKey, success_url, fail_url } = await getClientId({ id: intent });

  const { clientId } = JSON.parse(metadata);
  const props = { clientId, apiKey, intent, success_url, fail_url };
  return {
    props, // will be passed to the page component as props
  };
}

export default Home;
