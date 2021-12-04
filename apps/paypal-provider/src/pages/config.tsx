import { Button, Input } from '@team21/ui-components';
import config from 'config/constants';
import getApiLinkMetadata from 'graphql/backend/getApiLinkMetadata';
import React from 'react';
import { useForm } from 'react-hook-form';

//TODO: add some secret, signature etc
export interface HomeProps {
  apiKey: string;
  returnUrl: string;
  clientId: string;
  clientSecret: string;
}

const Home: React.FunctionComponent<HomeProps> = ({
  apiKey,
  clientSecret,
  clientId,
  returnUrl,
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
          Config PayPal
        </div>
        <Input
          id="clientId"
          defaultValue={clientId}
          labelText="Client ID"
          type="text"
          placeholder="Please enter PayPal client ID"
          innerRef={register('clientId', {
            required: 'Cliend ID required',
          })}
          errorText={errors.clientId?.message}
        />
        <div className="py-8" />
        <Input
          defaultValue={clientSecret}
          id="clientSecret"
          labelText="Client secret"
          type="text"
          placeholder="Please enter PayPal client secret"
          innerRef={register('clientSecret', {
            required: 'Client secret Required',
          })}
          errorText={errors.clientSecret?.message}
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
  const { clientId = '', clientSecret = '' } = metadata ? JSON.parse(metadata) : {};
  return {
    props: { apiKey, returnUrl, clientId, clientSecret }, // will be passed to the page component as props
  };
}

export default Home;
