import React, { FC } from 'react';
import { Wage } from '@team21/types';

type Props = {
    wage: Wage
}

const WageInformation: FC<Props> = ({wage}) => {

    function convertDate (date: string) {
        const d = date.split('T')
        const dat = d[0].split('-')
        const time = d[1].split('.')
        return dat[2]+"/"+dat[1]+"/"+dat[0]+" "+time[0]
    }

    return <div className='flex text-whitesmoke text-lg mb-24'>
        <span className='w-1/4'>{wage.id}</span>
        <span className='w-1/6'>{convertDate(wage.created_at)}</span>
        <span className='w-1/6'>{wage.status}</span>
        <span className='w-1/6'>${wage.amount}</span>
        <span className='w-1/6'>{wage.recipient_first_name + " " + wage.recipient_last_name} </span>
    </div>
};

export default WageInformation;
