import React, { FC } from 'react';
import { Button } from '../../input-controls/Button'
import './index.css'

type DropdownLink = {
    name: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>; 
}

type Props = {
    dropdownLabel: string;
    buttonColor?: string;
    size?: string;
    links: DropdownLink[];
};

const Dropdown: FC<Props> = ({dropdownLabel, links, buttonColor, size }) => (
    <div className="dropdown">
        <Button title={dropdownLabel} buttonColor={buttonColor} size={size} />
        <div className="dropdown-content">
            {links.map((link: DropdownLink, index: number)=>(
                <a key={index} onClick={link.onClick}>{link.name}</a>
            ))}
        </div>
    </div>
);

export default Dropdown;
