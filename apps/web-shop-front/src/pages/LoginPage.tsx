import { Login } from '@team21/ui-components';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useLogin from '../graphql/useLogin';
import { useUser } from '../state/state';
import { getUserFromToken } from '../utils/tokenUtils';

const LoginPage: FC<Record<string, never>> = () => {
  const [sendLoginRequest, { data, loading, called }] = useLogin();
  const [error, setError] = useState(false);
  const [, dispatch] = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!called || !data) return;
    if (data?.login?.accessToken) {
      dispatch?.({ type: 'SET_TOKEN', payload: data.login.accessToken });
      dispatch?.({ type: 'SET_USER', payload: getUserFromToken(data.login.accessToken) });
      localStorage.setItem('token', data.login.accessToken);
      navigate('/');
    } else {
      setError(true);
    }
  }, [data, called]);
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen ">
      <Login
        error={error}
        onClick={(u, p) => sendLoginRequest({ variables: { username: u, password: p } })}
      />
    </div>
  );
};

export default LoginPage;
