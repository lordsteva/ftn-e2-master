import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';

export interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = ({}) => {
  return (
    <div>
      client id: input client secret: input
      <PayPalScriptProvider
        options={{
          'client-id':
            'AW5hMbFeA0KSMgwxD5a4HGDxd_lzi8ByR6phXzegNN1_9vwLTZl5cOxSksPAHeMJ2PRFJYV0UY9csLoK',
        }}
      >
        <PayPalButtons
          style={{ layout: 'horizontal' }}
          createOrder={function () {
            /* Set up a url on your server to create the order */

            const GET_ORDER_URL = 'http://localhost:8200/getOrder/';

            /* Make a call to your server to set up the payment */

            return fetch(GET_ORDER_URL)
              .then(function (res) {
                return res.json();
              })
              .then(function (data) {
                console.log(data);
                return data.id;
              });
          }}
          /* onApprove() is called when the buyer approves the payment */
          onCancel={function () {
            //window.location = 'http://localhost:8200/view/cancelURL?orderId=' + orderId;
          }}
          onApprove={function (data, actions) {
            /* Set up a url on your server to execute the payment */

            const EXECUTE_URL = 'http://localhost:8200/capturePayment/';

            /* Set up the data you need to pass to your server */

            /* Make a call to your server to execute the payment */

            return fetch(EXECUTE_URL)
              .then(function (res) {
                return res.json();
              })
              .then(function (details) {
                alert('Transaction funds captured!');
                // window.location = 'http://localhost:8200/view/successURL?orderId=' + orderId;
              })
              .catch(function (error) {
                console.log(error);
                alert('An error occured');
                //  window.location = 'http://localhost:8200/view/errorURL?orderId=' + orderId;
              });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default Home;
