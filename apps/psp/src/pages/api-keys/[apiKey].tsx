import { Breadcrumb, Image } from '@team21/ui-components';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useDeleteApiProviderLink from '../../graphql/frontend/useDeleteApiProviderLink';
import useGetApiKeyDataAndActiveProviders from '../../graphql/frontend/useGetApiKeyDataAndActiveProviders';
import WithAuth from '../../utils/WithAuth';

const ConfigureApiKey: FC<Record<string, never>> = () => {
  const router = useRouter();
  const { apiKey } = router.query;

  const { data: apiKeys, refetch } = useGetApiKeyDataAndActiveProviders((apiKey as string) || '');
  const [deleteApiPorviderLink] = useDeleteApiProviderLink();
  return (
    <>
      <Breadcrumb
        path={[
          { label: 'Api Keys', url: '/' },
          { label: apiKey as string, url: `/api-keys/${apiKey}` },
        ]}
      />

      <div className="flex flex-col items-center w-full h-screen ">
        {apiKeys?.payment_providers.map(({ id, base_url, logo, name }) => {
          const used = apiKeys.api_keys_by_pk.api_provider_links.find(
            ({ payment_provider }) => payment_provider.id === id,
          );

          return (
            <div key={id} className="flex flex-row items-center">
              <div className={`w-4 h-4 ${used ? 'bg-green-600' : 'bg-red'} rounded-full`} />
              <Image width="20" src={`${base_url}/${logo}`} />
              <div>{name}</div>
              <div className="flex flex-col pl-24">
                {used && (
                  <div
                    className="text-blue-500 underline cursor-pointer select-none"
                    onClick={async () => {
                      await deleteApiPorviderLink({
                        variables: { payment_provider_id: id, api_key_id: apiKey },
                      });
                      refetch();
                    }}
                  >
                    Remove
                  </div>
                )}
                <div
                  className="text-blue-500 underline cursor-pointer select-none"
                  onClick={() =>
                    (window.location.href = `${base_url}/config?apiKey=${apiKey}&returnUrl=${window.location.href}`)
                  }
                >
                  {used ? 'Configure' : 'Add'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WithAuth(ConfigureApiKey);
