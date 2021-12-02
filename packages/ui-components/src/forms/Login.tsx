import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../input-controls';

type Props = {
  title?: string;
  onClick: (username: string, password: string) => void;
  username?: boolean;
  error: boolean;
};

const Login: FC<Props> = ({ title = 'Login', onClick, username, error }) => {
  const { register, handleSubmit, formState } = useForm();
  const { isDirty, isSubmitting, errors } = formState;
  const onSubmit = (data: { username: string; password: string }) =>
    onClick(data.username, data.password);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-8 border-blue-800 border-default w-96">
        <div className="pb-4 font-bold text-center text-blue-800 text-h2"> {title}</div>
        <Input
          id="username"
          labelText={`${username ? 'Username' : 'Email'}`}
          type="text"
          placeholder="Please enter username"
          innerRef={register('username', {
            required: `${username ? 'Username required' : 'Email required'}`,
          })}
          errorText={errors.username?.message}
        />
        <Input
          id="password"
          labelText="Password"
          type="password"
          placeholder="Please enter password"
          innerRef={register('password', {
            required: 'Password Required',
          })}
          errorText={errors.password?.message}
        />
        {error && <div className="text-red">Wrong email or password!</div>}
        <div className="flex justify-end pt-12 pb-12">
          <Button title="Login" disabled={!isDirty || isSubmitting}></Button>
        </div>
      </div>
    </form>
  );
};

export default Login;
