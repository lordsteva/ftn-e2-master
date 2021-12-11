import React, { FC } from 'react';
import { Link } from 'react-router-dom'

type Props = {
  name: string;
  path?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const ALink: FC<Props> = ({ name, path, onClick }) => (
    <li className="my-8 mx-24 hover:opacity-60"> 
      { 
        onClick ? <a className="no-underline text-whitesmoke text-xl cursor-pointer" onClick={onClick}>{name}</a> 
        : <Link className="no-underline text-whitesmoke text-xl" to={path}> {name} </Link> 
      }
    </li>
);

export default ALink;
