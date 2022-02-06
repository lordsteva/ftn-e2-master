import { Image } from '@team21/ui-components';
import React, { useState } from 'react';
import card from '../../assets/card.jpg';
import qrcode from '../../assets/qrcode.jpg';
import Card from '../../components/Card';
import QR from '../../components/QR';
import getPayment from '../../graphql/backend/getPayment';
interface HomeProps {
  amount: string;
  errorUrl: string;
  failedUrl: string;
  paymentId: string;
  successUrl: string;
  merchantOrderId: string;
  merchantId: string;
}

const Home: React.FunctionComponent<HomeProps> = ({
  amount,
  errorUrl,
  failedUrl,
  successUrl,
  merchantOrderId,
  paymentId,
  merchantId,
}) => {
  const [cardForm, setcardForm] = useState<boolean>(undefined);

  return (
    <div>
      {cardForm === undefined && (
        <div className="h-screen" style={{ background: '#131313' }}>
          <div className="flex flex-col w-10/12 p-24 mx-auto">
            <h1 className="mb-32 text-center text-h2 text-whitesmoke"> Choose payment method </h1>
            <div className="flex items-center justify-center">
              <div
                className="flex flex-col justify-center mx-8 transition duration-200 ease-in transform border-solid cursor-pointer border-default border-lightGray hover:scale-110"
                onClick={() => setcardForm(true)}
              >
                <Image width={'120px'} src={card} wrapperClassName="pb-12" />
                <span className="pt-2 mt-8 mb-16 text-center text-md text-whitesmoke">
                  <br />
                  Card form
                </span>
              </div>
              <div
                className="flex flex-col justify-center mx-8 transition duration-200 ease-in transform border-solid cursor-pointer border-default border-lightGray hover:scale-110"
                onClick={() => setcardForm(false)}
              >
                <Image width={'120px'} src={qrcode} />
                <span className="mt-8 mb-16 text-center text-md text-whitesmoke">QR code</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {cardForm && (
        <Card
          amount={amount}
          errorUrl={errorUrl}
          failedUrl={failedUrl}
          successUrl={successUrl}
          merchantOrderId={merchantOrderId}
          paymentId={paymentId}
        />
      )}
      {cardForm === false && (
        <QR
          amount={amount}
          errorUrl={errorUrl}
          failedUrl={failedUrl}
          successUrl={successUrl}
          merchantOrderId={merchantOrderId}
          paymentId={paymentId}
          merchantId={merchantId}
          onClick={() => setcardForm(true)}
        />
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  //TODO add some verification (signature)
  const intent = context.query.intent;
  const metadata = await getPayment({ payment_id: intent });

  return {
    props: {
      merchantId: metadata.merchant_id,
      amount: metadata.amount,
      errorUrl: metadata.error_url,
      failedUrl: metadata.failed_url,
      successUrl: metadata.success_url,
      merchantOrderId: metadata.merchant_order_id,
      paymentId: intent,
    },
  };
}

export default Home;
