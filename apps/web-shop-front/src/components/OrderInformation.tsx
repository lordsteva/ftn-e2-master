import React, { FC } from 'react';

type Props = {
    order: any
    type: boolean
}

const OrderInformation: FC<Props> = ({order, type}) => {

    function convertDate (date: string) {
        const d = date.split('T')
        const dat = d[0].split('-')
        const time = d[1].split('.')
        return dat[2]+"/"+dat[1]+"/"+dat[0]+" "+time[0]
    }

    return <div className="w-full mx-auto text-left">
        <div className='flex text-whitesmoke text-xl my-8'>
            <span className='w-1/4'>Order ID</span>
            <span className='w-1/4'>Order Date</span>
            <span className='w-1/4'>Order Status</span>
            <span className='w-1/4'>Order Total</span>
        </div>
        <div className='flex text-whitesmoke mb-24'>
            <span className='w-1/4'>{order.id}</span>
            <span className='w-1/4'>{convertDate(order.created_at)}</span>
            <span className='w-1/4'>{order.status}</span>
            <span className='w-1/4'>${order.total_price}</span>
        </div>
        { 
            type && <React.Fragment>
                <div className='flex text-whitesmoke text-xl my-8'>
                    <span className='w-1/4'>Country</span>
                    <span className='w-1/4'>City</span>
                    <span className='w-1/4'>Address</span>
                    <span className='w-1/4'>Phone</span>
                </div>
                <div className='flex text-whitesmoke mb-24'>
                    <span className='w-1/4'>{order.country}</span>
                    <span className='w-1/4'>{order.city} ({order.zip_code})</span>
                    <span className='w-1/4'>{order.address}</span>
                    <span className='w-1/4'>{order.phone}</span>
                </div>
            </React.Fragment>
        }
    </div>
};

export default OrderInformation;
