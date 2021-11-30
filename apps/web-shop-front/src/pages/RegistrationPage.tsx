import { Registration } from '@team21/ui-components';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useRegistration from '../graphql/useRegistration';

const RegistrationPage: FC<Record<string, never>> = () => {
  const [sendRegRequest, { data, called }] = useRegistration();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!called) return;
    if (data) {
      console.log(data);
      if (data.registration.id) {
        navigate('/login');
      } else {
        setError(true);
      }
    }
  }, [data, called]);
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen ">
      <Registration
        error={error}
        onClick={(f, e, p) => sendRegRequest({ variables: { fullName: f, email: e, password: p } })}
      />
    </div>
  );
};

export default RegistrationPage;
