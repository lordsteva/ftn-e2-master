import { Loader } from '@team21/ui-components';
import React, { useEffect } from 'react';

export interface HomeProps {
  merchantOrderId: string;
  paymentId: string;
  status: string;
}

const Home: React.FunctionComponent<HomeProps> = ({ merchantOrderId, paymentId, status }) => {
  useEffect(() => {
    fetch('/api/capture-order', {
      method: 'post',
      body: JSON.stringify({ merchantOrderId, status, paymentId }),
    })
      .then((res) => res.json())
      .then((res) => (window.location.href = res.url));
  }, []);
  return <Loader />;
};

export async function getServerSideProps(context) {
  const query = context.query;

  const props = { ...query };
  return {
    props, // will be passed to the page component as props
  };
}

export default Home;
