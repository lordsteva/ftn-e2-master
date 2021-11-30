import { Registration } from '@team21/ui-components';
import React, { FC, useEffect } from 'react';
import useRegistration from '../graphql/useRegistration';

const RegistrationPage: FC<Record<string, never>> = () => {
  const [sendRegRequest, { data, loading, error, called }] = useRegistration();
  useEffect(() => {
    if (!called) return;
    if (data) {
      console.log(data);
    }
  }, [data, called]);
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen ">
      <Registration
        onClick={(f, e, p) => sendRegRequest({ variables: { fullName: f, email: e, password: p } })}
      />
    </div>
  );
};

export default RegistrationPage;
