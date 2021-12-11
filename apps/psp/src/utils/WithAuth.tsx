import { useRouter } from 'next/router';
import React from 'react';

const WithAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props: any) => {
    if (typeof window !== 'undefined') {
      const Router = useRouter();
      const accessToken = localStorage.getItem('token');
      if (!accessToken) {
        Router.replace('/login');
        return null;
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  };
  return ComponentWithAuth;
};

export default WithAuth;
