import { Loader, Pagination, Button } from '@team21/ui-components';
import React, { FC, useState, useCallback } from 'react';
import useGetUserOrders from '../graphql/order/useGetUserOrders';
import { useUser } from '@team21/web-shop-front/src/state/state';

const PER_PAGE = 6;

const Category: FC<Record<string, never>> = () => {
    const [{ user }] = useUser();
    const [currentPage, setCurrentPage] = useState(0);
    const [viewOrder, setViewOrder] = useState(false);
    const { data, loading } = useGetUserOrders(user.id, PER_PAGE, currentPage * PER_PAGE);

    const onPageChange = useCallback(
        (page: number) => {
            setCurrentPage(page);
        },
        [setCurrentPage],
    );

    function convertDate (date: string) {
        const d = date.split('T')
        const dat = d[0].split('-')
        const time = d[1].split('.')
        return dat[2]+"/"+dat[1]+"/"+dat[0]+" "+time[0]
    }

    if(!data && loading) return <Loader />;

    const total = data?.orders_aggregate.aggregate.count
    if(total === 0) return <div className="flex w-full absolute top-1/4 items-center justify-center text-xxl">You have not ordered anything yet...</div>
    
    return (
        <React.Fragment>
            <div className="w-10/12 p-24 mx-auto">
                {
                viewOrder ? <div> a </div> : <React.Fragment>
                    <h1 className="text-whitesmoke text-h1 text-center mb-24 ml-24">Orders</h1>
                    <div className="flex justify-items-start items-center flex-wrap">
                        {data?.orders?.map((order: any)=>(
                            <div key={order.id} className="w-full mx-auto text-left">
                                <div className='flex text-whitesmoke text-xl my-8'>
                                    <span className='w-1/5'> Order ID </span>
                                    <span className='w-2/12'> Order Date </span>
                                    <span className='w-2/12'> Order Status </span>
                                    <span className='w-2/12'> Order Total </span>
                                    <span className='w-2/12'> Items Number </span>
                                </div>
                                <div className='flex text-whitesmoke mb-24'>
                                    <span className='w-1/5'>{order.id}</span>
                                    <span className='w-2/12'> {convertDate(order.created_at)} </span>
                                    <span className='w-2/12'> {order.status} </span>
                                    <span className='w-2/12'> ${order.total_price} </span>
                                    <span className='w-2/12'> {`${order.orderProducts.length} item(s) ordered`} </span>
                                </div>
                                <div className="flex justify-end my-8 border-t-default border-gray">
                                    <Button
                                        buttonColor="whitesmoke"
                                        textColor="black"
                                        rounded={true}
                                        onClick={undefined}
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

export default Category;
