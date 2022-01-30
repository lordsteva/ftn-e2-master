import { Loader } from '@team21/ui-components';
import Router from 'next/router';
import React, { useEffect } from 'react';

export interface HomeProps {
  intent: string;
}

const Home: React.FunctionComponent<HomeProps> = ({ intent }) => {
  useEffect(() => {
    fetch('/api/create-order', { method: 'post', body: JSON.stringify({ intent }) })
      .then((res) => res.json())
      .then((res) => Router.push(res.url));
  }, []);
  return <Loader />;
};

export async function getServerSideProps(context) {
  const intent = context.query.intent;

  const props = { intent };
  return {
    props, // will be passed to the page component as props
  };
}

export default Home;
