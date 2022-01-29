import { Loader, Pagination, Button } from '@team21/ui-components';
import React, { FC, useState, useCallback } from 'react';
import useGetUserOrders from '../graphql/order/useGetUserOrders';
import { useUser } from '@team21/web-shop-front/src/state/state';
import { Order } from "@team21/types"
import OrderInformation from '../components/OrderInformation';
import OrderProduct from '../components/OrderProduct';

const PER_PAGE = 6;

const Orders: FC<Record<string, never>> = () => {
    const [{ user }] = useUser();
    const [currentPage, setCurrentPage] = useState(0);
    const [viewMore, setViewMore] = useState(false);
    const [orderView, setOrderView] = useState({
        id: '',
        created_at: '',
        status: '',
        total_price: '',
        address: '',
        city: '',
        country: '',
        phone: '',
        zip_code: '',
        orderProducts: []
    });
    const { data, loading } = useGetUserOrders(user.id, PER_PAGE, currentPage * PER_PAGE);

    const onPageChange = useCallback(
        (page: number) => {
            setCurrentPage(page);
        },
        [setCurrentPage],
    );

    function viewOrder (order: any) {
        setViewMore(true)
        setOrderView(order)
    }

    if(!data && loading) return <Loader />;

    const total = data?.orders_aggregate.aggregate.count
    if(total === 0) return <div className="flex w-full absolute top-1/4 items-center justify-center text-xxl text-whitesmoke">You have not ordered anything yet...</div>
    
    return (
        <React.Fragment>
            <div className="w-10/12 p-24 mx-auto">
                {
                viewMore ? 
                <div className='mx-auto'>
                    <div className='flex justify-between items-center border-b-default border-solid border-lightGray mb-16'>
                        <span className='text-whitesmoke text-xxl'>Order Information</span>
                        <Button
                            buttonColor="primary"
                            textColor="whitesmoke"
                            rounded
                            onClick={()=>setViewMore(false)}
                            title="Back to Orders"
                            customClass='mb-4'
                        />
                    </div>
                    <OrderInformation order={orderView} type />
                    <div>
                        <h1 className='text-whitesmoke text-xxl border-b-default border-solid border-lightGray mb-16'>Ordered Items</h1>
                        <ul className='flex' role="list"> 
                        { 
                            orderView.orderProducts.map((item:any) => (
                                <OrderProduct key={item.id} order={item} />
                            ))
                        }               
                        </ul>
                    </div>
                </div> : 
                <React.Fragment>
                    <h1 className="text-whitesmoke text-h1 text-left mb-32">Orders</h1>
                    <div className="flex justify-items-start items-center flex-wrap">
                        {data?.orders?.map((order: Order)=>(
                            <div key={order.id} className="w-full mx-auto text-left">
                                <OrderInformation order={order} />
                                <div className="flex justify-end my-8 border-t-default border-gray">
                                    <Button
                                        buttonColor="primary"
                                        textColor="whitesmoke"
                                        rounded
                                        onClick={()=>viewOrder(order)}
                                        title="View Order"
                                        customClass='mt-16'
                                    />
                                </div>
                        </div>
                        ))}
                    </div>
                    { total && (total > PER_PAGE) && <div className="w-10/12 p-24 mx-auto">
                        <Pagination
                            currentPage={currentPage}
                            total={total ?? 0}
                            displayPerPage={PER_PAGE}
                            onPageChange={onPageChange}
                        />
                    </div>}
                    </React.Fragment>
                }
            </div>
      </React.Fragment>
    );
};

export default Orders;
