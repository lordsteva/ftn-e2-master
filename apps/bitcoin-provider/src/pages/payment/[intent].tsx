import { Loader } from '@team21/ui-components';
import getPaymentIntentInfo from 'graphql/backend/getPaymentIntentInfo';
import React, { useEffect } from 'react';

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
  useEffect(() => {
    fetch('/api/create-order', { method: 'post', body: JSON.stringify({ intent, apiKey }) })
      .then((res) => res.json())
      .then((res) => (window.location.href = res.url));
  }, []);
  return <Loader />;
};

export async function getServerSideProps(context) {
  const intent = context.query.intent;
  const { apiKey, success_url, fail_url, amount, currency, error_url } = await getPaymentIntentInfo(
    {
      id: intent,
    },
  );

  const props = { apiKey, intent, success_url, fail_url, amount, currency, error_url };
  return {
    props, // will be passed to the page component as props
  };
}

export default Home;
