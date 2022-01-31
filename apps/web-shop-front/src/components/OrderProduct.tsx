import React, { FC } from 'react';
import { Image } from '@team21/ui-components';
import { useNavigate, } from 'react-router-dom'

type Props = {
    order: any
}

const OrderProduct: FC<Props> = ({order}) => {
    const navigate = useNavigate();

    function openProduct (id: string) {
        navigate('/product', { state:{ id: id }});
    }

    return  <li className="flex flex-col justify-start w-1/6 my-16 mr-32">
        <Image
            src={order.product.image}
            alt={`${order.product.name}-image`}
            wrapperClassName="flex justify-center h-200px items-center border-default border-solid border-lightGray mb-16"
        />
        <div className='flex justify-between items-center mb-16 px-8'>
            <h3 className='text-xl text-whitesmoke cursor-pointer hover:text-primary' onClick={()=>openProduct(order.product_id)}>{order.product.name}</h3>
            <p className="text-lg text-whitesmoke">${order.price}</p>
        </div>
        <p className="text-lightGray px-8">Quantity: {order.quantity}</p>
    </li>
};

export default OrderProduct;
