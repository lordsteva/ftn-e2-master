import { Button, Input, Select } from '@team21/ui-components';
import config from 'config/constants';
import getApiLinkMetadata from 'graphql/backend/getApiLinkMetadata';
import getBanks from 'graphql/backend/getbanks';
import React from 'react';
import { useForm } from 'react-hook-form';

//TODO: add some secret, signature etc
export interface HomeProps {
  apiKey: string;
  returnUrl: string;
  merchantId: string;
  merchantPass: string;
  banks: { id: string; name: string; base_url: string }[];
  bankId: string;
}

const Home: React.FunctionComponent<HomeProps> = ({
  apiKey,
  merchantPass,
  merchantId,
  returnUrl,
  banks,
  bankId,
}) => {
  //TOOD: style, show data....
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting, errors } = formState;
  const onSubmit = async (data) => {
    await fetch('/api/update-config', {
      method: 'POST',
      body: JSON.stringify({ api_key_id: apiKey, ...data }),
    });
    window.location.replace(returnUrl);
  };
  return (
    <div className="max-w-xl px-4 py-4 m-auto mt-64 text-lg text-center border-2 border-gray-900">
      <form onSubmit={handleSubmit(onSubmit)} className="p-16">
        <div className="pb-8 text-4xl font-bold text-center text-blue-800 text-h2">
          Configure Bank
        </div>
        <Select
          id="bankId"
          defaultValue={bankId}
          labelText="Bank"
          innerRef={register('bankId', {
            required: 'Bank required',
          })}
          errorText={errors.bankId?.message}
          options={banks.map((b) => ({ value: b.id, text: b.name }))}
        />
        <Input
          id="merchantId"
          defaultValue={merchantId}
          labelText="Merchant ID"
          type="text"
          placeholder="Please enter Merchant ID"
          innerRef={register('merchantId', {
            required: 'Merchant ID required',
          })}
          errorText={errors.merchantId?.message}
        />
        <div className="py-8" />
        <Input
          defaultValue={merchantPass}
          id="merchantPass"
          labelText="Merchant pass"
          type="text"
          placeholder="Please enter merchant password"
          innerRef={register('merchantPass', {
            required: 'Merchan Pass Required',
          })}
          errorText={errors.merchantPass?.message}
        />
        <div className="flex justify-center pt-12 pb-4">
          <Button size="90" title="Cofigure" disabled={isSubmitting}></Button>
        </div>
      </form>
    </div>
  );
};

export async function getServerSideProps(context) {
  //TODO add some verification (signature)
  const { apiKey, returnUrl } = context.query;
  const metadata = await getApiLinkMetadata({
    api_key_id: apiKey,
    payment_provider_id: config.APP_ID,
  });
  const { merchantId = '', merchantPass = '', bankId = '' } = metadata ? JSON.parse(metadata) : {};

  const banks = await getBanks();

  return {
    props: { apiKey, returnUrl, merchantId, bankId, merchantPass, banks }, // will be passed to the page component as props
  };
}

export default Home;
