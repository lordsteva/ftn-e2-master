import { Button } from '@team21/ui-components';
import React, { FC } from 'react';
import useGetUsers from './graphql/useGetUsers';

const Component: FC<Record<string, never>> = () => {
  const { data, loading, error } = useGetUsers();
  if (loading) return <div>loading....</div>;
  if (error) return <div>error</div>;

  return (
    <div>
      <Button onClick={() => console.log('clic;')} title="btn" />
      {data.users.map((u: any) => (
        <div key={u}>{u.username}</div>
      ))}
    </div>
  );
};

export default Component;
