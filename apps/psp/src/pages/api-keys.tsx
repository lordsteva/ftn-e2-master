import { Button, Table } from '@team21/ui-components';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useCreateApiKey from '../graphql/frontend/useCreateApiKey';
import useGetApiKeysByUser from '../graphql/frontend/useGetApiKeysByUser';
import { useUser } from '../state/state';

const headerData = ['API key', 'API secret', 'Active', 'Actions'];

const ApiKeysOverview: FC<Record<string, never>> = () => {
  // const { apiKey, link } = useParams();
  // const { data } = useGetPaymentMethodsByApiKey(apiKey || '');
  // const providers = data?.api_keys_by_pk?.api_provider_links ?? [];
  const [{ user }] = useUser();
  const { data: apiKeys, refetch } = useGetApiKeysByUser(user.id);
  const [createApiKey] = useCreateApiKey();
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen pb-8">
      <Table
        headerData={headerData}
        bodyData={(apiKeys ?? { api_keys: [] }).api_keys.map(({ active, api_key, api_secret }) => ({
          items: [api_key, api_secret, active ? 'Yes' : 'No'],
          actions: [
            { action: !active ? 'Activate' : 'Deactivate', onClick: () => console.log('toggle') },
            { action: 'Configure providers', onClick: () => router.push(`api-keys/${api_key}`) },
            { action: 'Remove', onClick: () => console.log('remove') },
          ],
        }))}
      />
      <Button
        title="+ Create new"
        onClick={async () => {
          await createApiKey({ variables: { user_id: user.id } });
          refetch();
        }}
      />
    </div>
  );
};

export default ApiKeysOverview;
