import { Button, Table } from '@team21/ui-components';
import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import useCreateApiKey from '../graphql/useCreateApiKey';
import useGetApiKeysByUser from '../graphql/useGetApiKeysByUser';

const headerData = ['API key', 'API secret', 'Active', 'Actions'];

// TODO: remove
const MOCKED_USER_ID = 'cc9d3123-6b00-4259-ac50-6c3e873d4740';

const ApiKeysOverview: FC<Record<string, never>> = () => {
  // const { apiKey, link } = useParams();
  // const { data } = useGetPaymentMethodsByApiKey(apiKey || '');
  // const providers = data?.api_keys_by_pk?.api_provider_links ?? [];

  const { data: apiKeys, refetch } = useGetApiKeysByUser(MOCKED_USER_ID);
  const [createApiKey] = useCreateApiKey();

  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen pb-8">
      <Table
        headerData={headerData}
        bodyData={(apiKeys ?? { api_keys: [] }).api_keys.map(({ active, api_key, api_secret }) => ({
          items: [api_key, api_secret, active ? 'Yes' : 'No'],
          actions: [
            { action: !active ? 'Activate' : 'Deactivate', onClick: () => console.log('toggle') },
            { action: 'Configure providers', onClick: () => navigate(api_key) },
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
