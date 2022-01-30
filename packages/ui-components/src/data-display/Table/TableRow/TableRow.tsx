import React, { FC } from 'react';

type ActionProps = {
    action: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

type Props = {
    items: string[];
    actions?: ActionProps[];
};

const TableRow: FC<Props> = ({ items, actions }) => (
    <tr>
        {items.length && items.map((item) => (
            <td className='text-whitesmoke' key={item}>{item}</td>
        ))}
        {actions && actions.length && <td className="flex flex-col">
            {actions.map((item: ActionProps, index: number)=>(
                <a key={index} className="hover:underline text-primary cursor-pointer" onClick={item.onClick}> {item.action} </a> 
            ))}
        </td>}
    </tr>
);

export default TableRow;
