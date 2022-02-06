import { Button, Input } from '@team21/ui-components';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  amount: string;
  errorUrl: string;
  failedUrl: string;
  paymentId: string;
  successUrl: string;
  merchantOrderId: string;
};

const Card: FC<Props> = ({
  amount,
  errorUrl,
  failedUrl,
  successUrl,
  merchantOrderId,
  paymentId,
}) => {
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting, errors } = formState;
  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/capture', {
        method: 'POST',
        body: JSON.stringify({ paymentId, card: data }),
      });
      const resJson = await res.json();
      if (resJson.status === 'FAILED') {
        window.location.href = `${failedUrl}?status=FAILED&merchantOrderId=${merchantOrderId}&paymentId=${paymentId}`;
      } else {
        window.location.href = `${successUrl}?status=COMPLETED&merchantOrderId=${merchantOrderId}&paymentId=${paymentId}`;
      }
    } catch (e) {
      console.log(e);
      window.location.href = `${errorUrl}?status=ERROR&merchantOrderId=${merchantOrderId}&paymentId=${paymentId}`;
    }

    // window.location.replace(returnUrl);
  };
  return (
    <div className="max-w-xl px-4 py-4 m-auto mt-64 text-lg text-center border-2 border-gray-900">
      <form onSubmit={handleSubmit(onSubmit)} className="p-16">
        <div className="pb-8 text-4xl font-bold text-center text-blue-800 text-h2">Pay</div>
        amount to pay: {amount}
        <Input
          id="pan"
          labelText="Pan"
          type="text"
          placeholder="Please enter PAN"
          innerRef={register('pan', {
            required: 'PAN required',
          })}
          errorText={errors.pan?.message}
        />
        <div className="py-8" />
        <Input
          id="ccv"
          labelText="CCV"
          type="text"
          placeholder="Please enter CCV"
          innerRef={register('ccv', {
            required: 'CCV required',
          })}
          errorText={errors.ccv?.message}
        />
        <div className="py-8" />
        <Input
          id="expire"
          labelText="Expiration"
          type="text"
          placeholder="Please enter expiration date"
          innerRef={register('expire', {
            required: 'Expiration date required',
          })}
          errorText={errors.expire?.message}
        />
        <div className="py-8" />
        <Input
          id="holder"
          labelText="Card holder"
          type="text"
          placeholder="Please enter card holder name"
          innerRef={register('holder', {
            required: 'Card holder required',
          })}
          errorText={errors.holder?.message}
        />
        <div className="py-8" />
        <div className="flex justify-center pt-12 pb-4">
          <Button size="90" title="PAY" disabled={isSubmitting}></Button>
        </div>
      </form>
    </div>
  );
};

export default Card;
