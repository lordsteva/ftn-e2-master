import React, { FC } from 'react';
import { Button, Input } from '../input-controls';

type Props = {
  title?: string;
  onClick: (username: string, password: string) => void;
  username?: boolean;
};

const Login: FC<Props> = ({ title = 'Login', onClick, username }) => (
  <div className="p-8 border-blue-800 border-default w-96">
    <div className="pb-4 font-bold text-center text-blue-800 text-h2"> {title}</div>
    <Input
      id="username"
      labelText={`${username ? 'Username' : 'Email'}`}
      type="text"
      placeholder="Please enter username"
    />
    <Input id="password" labelText="Password" type="password" placeholder="Please enter password" />
    <div className="flex justify-end pt-12 pb-12">
      <Button title="Login"></Button>
    </div>
  </div>
);

export default Login;
