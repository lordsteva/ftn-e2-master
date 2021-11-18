import React, { FC, useState } from 'react';
import useGetUsers from './graphql/useGetUsers';

const Component: FC<Record<string, never>> = () => {
  const [limit, setLimt] = useState(0);
  const { data, loading, error } = useGetUsers('asdsd');
  console.log(error);
  if (loading) return <div>loading....</div>;
  if (error) return <div>error</div>;

  console.log(data);
  return <div>{data.rand.answer}</div>;
};

export default Component;
