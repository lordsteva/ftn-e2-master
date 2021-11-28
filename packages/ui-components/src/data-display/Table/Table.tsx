import React, { FC } from 'react';
import { TableRow } from './TableRow'
import './index.css'

type ActionProps = {
    action: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

type TableRowProps = {
    items: string[];
    actions?: ActionProps[];
}

type Props = {
    headerData: string[];
    bodyData: TableRowProps[];
};

const Table: FC<Props> = ({ headerData, bodyData}) => (
    <table className="custom-table">
        <thead>
            <tr>
                {headerData.map((th: string, index: number) => (
                    <th key={index}> {th} </th>
                ))}
            </tr>
        </thead>
        <tbody>
            {bodyData.map((data: TableRowProps, index: number) => (
                <TableRow key={index} items={data.items} actions={data.actions}  />
            ))}
        </tbody>
    </table>
);

export default Table;
