import { Button, Image, Loader } from '@team21/ui-components';
import React, { FC, useEffect } from 'react';
import failed from '../assets/failed.jpg';
import success from '../assets/success.jpg';
import useFinalizeOrder from '../graphql/order/useFinalizeOrder';
import { useUser } from '../state/state';

export enum PaymenntMessageType {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

type Props = {
  title: string;
  type: PaymenntMessageType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const PaymentMessage: FC<Props> = ({ title, type, onClick }) => {
  const [finalizeOrder, { loading }] = useFinalizeOrder();
  const [{ user }] = useUser();
  useEffect(() => {
    if (!user) {
      return;
    }
    const payment_intent_id = new URLSearchParams(window.location.search).get('payment_intent_id');
    setTimeout(() => {
      finalizeOrder({ variables: { payment_intent_id } });
    }, 0);
  }, [user]);
  if (loading || !user.id) {
    return <Loader />;
  }
  return (
    <div className="w-1/3 m-40 mx-auto border-solid border-default border-lightGray">
      <div className="flex flex-col items-center justify-center">
        <Image src={type === PaymenntMessageType.SUCCESS ? success : failed} />

        <div className="p-4 mt-8 text-center">
          <h5 className="mb-32 font-semibold text-xxl">{title}</h5>

          <Button
            buttonColor={type ? 'success' : 'red'}
            size="xl"
            textColor="whitesmoke"
            title={'Proceed'}
            onClick={onClick}
            customClass="mb-24"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentMessage;
