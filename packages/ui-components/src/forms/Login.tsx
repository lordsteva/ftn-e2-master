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
      <div className="p-16 w-96">
        <div className="pb-4 font-bold text-center text-whitesmoke text-h2 mb-24">{title}</div>
        <hr className="mb-24 border-gray"/>
        <Input
          id="username"
          labelText={`${username ? 'Username' : 'Email'}`}
          labelClass="text-whitesmoke text-lg"
          type="text"
          placeholder="Please enter username"
          innerRef={register('username', {
            required: `${username ? 'Username required' : 'Email required'}`,
          })}
          errorText={errors.username?.message}
          customClass='mb-16 rounded-xs bg-white text-dark'
        />
        <Input
          id="password"
          labelText="Password"
          labelClass="text-whitesmoke text-lg"
          type="password"
          placeholder="Please enter password"
          innerRef={register('password', {
            required: 'Password Required',
          })}
          errorText={errors.password?.message}
          customClass='mb-16 rounded-xs'
        />
        {error && <div className="text-red">Wrong email or password!</div>}
        <div className="flex justify-center pt-12 pb-12">
          <Button block={true} title="Login" disabled={!isDirty || isSubmitting}></Button>
        </div>
      </div>
    </form>
  );
};

export default Login;
