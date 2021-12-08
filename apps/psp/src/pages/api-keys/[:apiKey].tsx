import { Image } from '@team21/ui-components';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import useDeleteApiProviderLink from '../../graphql/frontend/useDeleteApiProviderLink';
import useGetApiKeyDataAndActiveProviders from '../../graphql/frontend/useGetApiKeyDataAndActiveProviders';

const ConfigureApiKey: FC<Record<string, never>> = () => {
  const { apiKey } = useParams();
  const { data: apiKeys, refetch } = useGetApiKeyDataAndActiveProviders(apiKey || '');
  const [deleteApiPorviderLink] = useDeleteApiProviderLink();
  console.log(apiKeys);
  return (
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
  );
};

export default ConfigureApiKey;
