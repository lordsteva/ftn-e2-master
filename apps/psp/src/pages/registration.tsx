import { Registration } from '@team21/ui-components';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import useRegistration from '../graphql/useRegistration';

const RegistrationPage: FC<Record<string, never>> = () => {
  const [sendRegRequest, { data, called }] = useRegistration();
  const router = useRouter();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!called) return;
    if (data) {
      if (data.registration.id) {
        router.push('/login');
      } else {
        setError(true);
      }
    }
  }, [data, called]);
  return (
    <div className="absolute flex flex-col items-center justify-between w-full top-1/4 ">
      <Registration
        error={error}
        onClick={(f, e, p) => sendRegRequest({ variables: { fullName: f, email: e, password: p } })}
      />
    </div>
  );
};

export default RegistrationPage;
