import { Login } from '@team21/ui-components';
import React, { FC, useEffect } from 'react';
import useLogin from '../graphql/useLogin';

const LoginPage: FC<Record<string, never>> = () => {
  const [sendLoginRequest, { data, loading, error, called }] = useLogin();
  useEffect(() => {
    if (!called) return;
    if (data) {
      console.log(data);
    }
  }, [data, called]);
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen ">
      <Login onClick={(u, p) => sendLoginRequest({ variables: { username: u, password: p } })} />
    </div>
  );
};

export default LoginPage;
