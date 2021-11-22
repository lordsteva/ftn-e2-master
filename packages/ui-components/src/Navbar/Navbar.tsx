import React, { FC } from 'react';
import { ALink } from '../index'

type NavLink = {
    name: string;
    path: string;
}

type Props = {
  links: NavLink[];
};

const Navbar: FC<Props> = ({ links }) => (
    <div>
        <nav>
            <ul className="w-full flex flex-wrap justify-center py-8 list-none bg-bcPrimary">
                { links.map((link: NavLink, index: number) => ( link && <ALink key={index} path={link.path} name={link.name}  />)) }
            </ul>
        </nav>
    </div>
);

export default Navbar;
