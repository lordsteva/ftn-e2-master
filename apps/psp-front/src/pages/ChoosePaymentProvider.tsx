import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

const ChoosePaymentProvider: FC<Record<string, never>> = () => {
  const { appId, link } = useParams();

  return <div className="flex flex-col items-center justify-between w-full h-screen ">HELLO</div>;
};

export default ChoosePaymentProvider;
