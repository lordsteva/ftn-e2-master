import React, { FC } from 'react';
import { Link } from 'react-router-dom'

type Props = {
  name: string;
  path: string;
};

const ALink: FC<Props> = ({ name, path }) => (
    <li className="my-8 mx-24 hover:opacity-60"> 
      <Link className="no-underline text-whitesmoke text-xl" to={path}> 
        {name} 
      </Link> 
    </li>
);

export default ALink;
