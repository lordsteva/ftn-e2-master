import { Login } from '@team21/ui-components';
import React, { FC } from 'react';

const LoginPage: FC<Record<string, never>> = () => {
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen ">
      <Login onClick={(u, p) => console.log('successssss')} />
    </div>
  );
};

export default LoginPage;
