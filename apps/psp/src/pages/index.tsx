import { Breadcrumb, Button, Table } from '@team21/ui-components';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useCreateApiKey from '../graphql/frontend/useCreateApiKey';
import useGetApiKeysByUser from '../graphql/frontend/useGetApiKeysByUser';
import { useUser } from '../state/state';
import WithAuth from '../utils/WithAuth';

const headerData = ['API key', 'API secret', 'Active', 'Actions'];

const ApiKeysOverview: FC<Record<string, never>> = () => {
  const [{ user }] = useUser();
  const { data: apiKeys, refetch } = useGetApiKeysByUser(user.id);
  const [createApiKey] = useCreateApiKey();
  const router = useRouter();

  return (
    <>
      <Breadcrumb path={[{ label: 'Api Keys', url: '/' }]} />
      <div className="flex flex-col items-center justify-between w-full h-screen pb-8">
        <Table
          headerData={headerData}
          bodyData={(apiKeys ?? { api_keys: [] }).api_keys.map(
            ({ active, api_key, api_secret }) => ({
              items: [api_key, api_secret, active ? 'Yes' : 'No'],
              actions: [
                {
                  action: !active ? 'Activate' : 'Deactivate',
                  onClick: () => console.log('toggle'),
                },
                {
                  action: 'Configure providers',
                  onClick: () => router.push(`api-keys/${api_key}`),
                },
                { action: 'Remove', onClick: () => console.log('remove') },
              ],
            }),
          )}
        />
        <Button
          title="+ Create new"
          customClass='mb-24'
          onClick={async () => {
            await createApiKey();
            refetch();
          }}
        />
      </div>
    </>
  );
};

export default WithAuth(ApiKeysOverview);
