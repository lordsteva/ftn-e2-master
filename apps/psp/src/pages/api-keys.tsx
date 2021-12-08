import { Button, Table } from '@team21/ui-components';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useCreateApiKey from '../graphql/frontend/useCreateApiKey';
import useGetApiKeysByUser from '../graphql/frontend/useGetApiKeysByUser';

const headerData = ['API key', 'API secret', 'Active', 'Actions'];

// TODO: remove
const MOCKED_USER_ID = 'ac0dff7e-48eb-45d6-b279-468dbc2dff77';

const ApiKeysOverview: FC<Record<string, never>> = () => {
  // const { apiKey, link } = useParams();
  // const { data } = useGetPaymentMethodsByApiKey(apiKey || '');
  // const providers = data?.api_keys_by_pk?.api_provider_links ?? [];

  const { data: apiKeys, refetch } = useGetApiKeysByUser(MOCKED_USER_ID);
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
          await createApiKey({ variables: { user_id: MOCKED_USER_ID } });
          refetch();
        }}
      />
    </div>
  );
};

export default ApiKeysOverview;
