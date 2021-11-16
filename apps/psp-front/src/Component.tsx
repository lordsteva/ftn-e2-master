import React, { FC } from 'react';
import useGetUsers from './graphql/useGetUsers';

type Props = {
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Component: FC<Props> = ({ onClick, title }) => {
  const { data, loading } = useGetUsers();
  if (loading) return <div>xd</div>;
  return (
    <button onClick={onClick} className={'bg-red-800 border-gray-800 border'}>
      {title && <span className="w-full p-3">{title}</span>}
      {data.users.map((u: any) => (
        <div key={u}>{u.username}</div>
      ))}
    </button>
  );
};

export default Component;
