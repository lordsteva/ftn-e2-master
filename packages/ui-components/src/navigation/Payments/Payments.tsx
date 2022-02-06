import React, { FC } from 'react';
import { Image } from '../../data-display/Image';

type PaymentMethod = { logo: string; name: string; base_url: string; active: boolean };

type Props = {
  supportedMethods: PaymentMethod[];
  paymentIntent: string;
  subscribe?: boolean;
};

const Payments: FC<Props> = ({ subscribe, supportedMethods, paymentIntent }) => {
  return (
    <div className="w-10/12 p-24 mx-auto">
      <h1 className="mb-32 text-center text-h2 text-whitesmoke"> Choose payment method </h1>
      <div className="flex items-center justify-center">
        {supportedMethods.map(
          (item: PaymentMethod, index) =>
            item.active && (
              <div
                key={index}
                className="flex flex-col justify-center mx-8 transition duration-200 ease-in transform border-solid cursor-pointer border-default border-lightGray hover:scale-110"
                onClick={() =>
                  (window.location.href = `${item.base_url}/${
                    subscribe ? 'subscribe' : 'payment'
                  }/${paymentIntent}`)
                }
              >
                <Image width={'120px'} src={`${item.base_url}/${item.logo}`} />
                <span className="mt-8 mb-16 text-center text-md text-whitesmoke">{item.name}</span>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default Payments;
