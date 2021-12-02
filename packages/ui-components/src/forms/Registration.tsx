import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../input-controls';

type Props = {
  title?: string;
  onClick: (fullName: string, email: string, password: string) => void;
  error: boolean;
};

const Registration: FC<Props> = ({ title = 'Registration', onClick, error }) => {
  const { register, handleSubmit, formState, watch } = useForm();
  const { isDirty, isSubmitting, errors } = formState;
  const onSubmit = (data: { fullName: string; email: string; password: string }) =>
    onClick(data.fullName, data.email, data.password);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-8 border-blue-800 border-default w-96">
        <div className="pb-4 font-bold text-center text-blue-800 text-h2"> {title}</div>
        <Input
          id="fullName"
          labelText="Full name"
          type="text"
          placeholder="Please enter name"
          innerRef={register('fullName', {
            required: 'Name required',
          })}
          errorText={errors.fullName?.message}
        />
        <Input
          id="email"
          labelText="Email"
          type="text"
          placeholder="Please enter email"
          innerRef={register('email', {
            required: 'Email required',
          })}
          errorText={errors.email?.message}
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
        <Input
          id="repeat"
          labelText="Repeat password"
          type="password"
          placeholder="Please repeat password"
          innerRef={register('repeat', {
            required: 'Password Required',
            validate: (value) => (value === watch('password') ? true : 'Passwords do not match!'),
          })}
          errorText={errors.repeat?.message}
        />
        {error && <div className="text-red">Email already registred!</div>}
        <div className="flex justify-end pt-12 pb-12">
          <Button title="Register" disabled={!isDirty || isSubmitting}></Button>
        </div>
      </div>
    </form>
  );
};

export default Registration;
