import React, { FC } from 'react';

type Props = {
  name: string;
  path: string;
};

const ALink: FC<Props> = ({ name, path }) => (
    <li className="my-8 mx-24 hover:opacity-60"> 
      <a className="no-underline text-whitesmoke text-xl" href={path}> 
        {name} 
      </a> 
    </li>
);

export default ALink;
