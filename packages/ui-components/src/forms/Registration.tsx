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
      <div className="p-16 w-96">
        <div className="pb-4 font-bold text-center text-whitesmoke text-h2 mb-12">{title}</div>
        <hr className="mb-24 border-gray"/>
        <Input
          id="fullName"
          labelText="Full name"
          labelClass="text-whitesmoke text-lg"
          type="text"
          placeholder="Please enter name"
          innerRef={register('fullName', {
            required: 'Name required',
          })}
          errorText={errors.fullName?.message}
          customClass='mb-16 rounded-xs'
        />
        <Input
          id="email"
          labelText="Email"
          labelClass="text-whitesmoke text-lg"
          type="text"
          placeholder="Please enter email"
          innerRef={register('email', {
            required: 'Email required',
          })}
          errorText={errors.email?.message}
          customClass='mb-16 rounded-xs'
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
        <Input
          id="repeat"
          labelText="Repeat password"
          labelClass="text-whitesmoke text-lg"
          type="password"
          placeholder="Please repeat password"
          innerRef={register('repeat', {
            required: 'Password Required',
            validate: (value) => (value === watch('password') ? true : 'Passwords do not match!'),
          })}
          errorText={errors.repeat?.message}
          customClass='mb-16 rounded-xs'
        />
        {error && <div className="text-red">Email already registred!</div>}
        <div className="flex justify-center pt-12 pb-12">
          <Button block={true} title="Register" disabled={!isDirty || isSubmitting}></Button>
        </div>
      </div>
    </form>
  );
};

export default Registration;
