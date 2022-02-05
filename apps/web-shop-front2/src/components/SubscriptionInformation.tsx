import React, { FC } from 'react';
import { Subscription } from '@team21/types';
import { Button } from '@team21/ui-components';

type Props = {
    subs: Subscription
    cancelSub: (id: string) => void
}

const SubscriptionInformation: FC<Props> = ({subs, cancelSub}) => {

    function convertDate (date: string) {
        const d = date.split('T')
        const dat = d[0].split('-')
        const time = d[1].split('.')
        return dat[2]+"/"+dat[1]+"/"+dat[0]+" "+time[0]
    }

    return <div className='flex text-whitesmoke text-lg mb-24 text-left'>
        <span className='w-1/4'>{subs.id}</span>
        <span className='w-1/6'>{convertDate(subs.created_at)}</span>
        <span className='w-1/6'>{subs.status}</span>
        <span className='w-1/6'>${subs.product.course_cost}</span>
        <span className='w-1/6'>{subs.product.course_plan === 'yearly' ? subs.product.course_last + ' years' : subs.product.course_last + ' months'} </span>
        <span className='w-1/6 hidden'> <Button buttonColor="primary" onClick={()=>{cancelSub(subs.id)}} size="base" textColor="whitesmoke" title="Cancel" disabled={subs.status === "Created" ? false : true} /> </span>

    </div>
};

export default SubscriptionInformation;
