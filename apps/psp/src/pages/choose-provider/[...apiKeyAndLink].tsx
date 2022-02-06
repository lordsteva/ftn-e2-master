import { Payments } from '@team21/ui-components/';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useGetPaymentMethodsByApiKey from '../../graphql/frontend/useGetPaymentMethodsByApiKey';

const ChoosePaymentProvider: FC<Record<string, never>> = () => {
  const router = useRouter();
  const { apiKeyAndLink, subscribe } = router.query;
  const [apiKey, link] = (apiKeyAndLink as string[]) || [];
  const { data } = useGetPaymentMethodsByApiKey(apiKey || '');
  const providers = data?.api_keys_by_pk?.api_provider_links ?? [];

  return (
    <div className="flex flex-col items-center justify-between w-full h-screen ">
      <Payments
        subscribe={subscribe === 'true'}
        paymentIntent={link || ''}
        supportedMethods={providers
          .filter((p) => subscribe !== 'true' || p.payment_provider.subscription)
          .map(({ payment_provider }: { payment_provider: any }) => payment_provider)}
      />
    </div>
  );
};

export default ChoosePaymentProvider;
