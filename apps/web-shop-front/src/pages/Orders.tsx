import { Loader, Pagination, Button, Image } from '@team21/ui-components';
import React, { FC, useState, useCallback } from 'react';
import useGetUserOrders from '../graphql/order/useGetUserOrders';
import { useUser } from '@team21/web-shop-front/src/state/state';

const PER_PAGE = 6;

const Category: FC<Record<string, never>> = () => {
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
        orderProducts: []
    });
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

    function viewOrder (order: any) {
        setViewMore(true)
        setOrderView(order)
    }

    if(!data && loading) return <Loader />;

    const total = data?.orders_aggregate.aggregate.count
    if(total === 0) return <div className="flex w-full absolute top-1/4 items-center justify-center text-xxl">You have not ordered anything yet...</div>
    
    return (
        <React.Fragment>
            <div className="w-10/12 p-24 mx-auto">
                {
                viewMore ? 
                <div className='mx-auto'>
                    <div className='flex justify-between items-center border-b-default border-solid border-lightGray mb-16'>
                        <span className='text-whitesmoke text-xxl'>Order Information</span>
                        <Button
                            buttonColor="whitesmoke"
                            textColor="black"
                            rounded={true}
                            onClick={()=>setViewMore(false)}
                            title="Back to Orders"
                            customClass='mb-4'
                        />
                    </div>
                    <div className='flex text-whitesmoke text-xl my-8'>
                        <span className='w-1/4'> Order ID </span>
                        <span className='w-1/4'> Order Date </span>
                        <span className='w-1/4'> Order Status </span>
                        <span className='w-1/4'> Order Total </span>
                    </div>
                    <div className='flex text-whitesmoke mb-24'>
                        <span className='w-1/4'>{orderView.id}</span>
                        <span className='w-1/4'> {convertDate(orderView.created_at)} </span>
                        <span className='w-1/4'> {orderView.status} </span>
                        <span className='w-1/4'> ${orderView.total_price} </span>
                    </div>
                    <div className='flex text-whitesmoke text-xl my-8'>
                        <span className='w-1/4'> Country </span>
                        <span className='w-1/4'> City </span>
                        <span className='w-1/4'> Address </span>
                        <span className='w-1/4'> Phone </span>
                    </div>
                    <div className='flex text-whitesmoke mb-24'>
                        <span className='w-1/4'>{orderView.country}</span>
                        <span className='w-1/4'> {orderView.city} </span>
                        <span className='w-1/4'> {orderView.address} </span>
                        <span className='w-1/4'> ${orderView.phone} </span>
                    </div>
                    <div>
                        <ul role="list"> 
                        { 
                            orderView.orderProducts.map((item:any) => (
                                <li key={item.product.id} className="flex mb-16 h-180px">
                                <Image
                                    src={item.product.image}
                                    alt={`${item.product.name}-image`}
                                    wrapperClassName="flex justify-center items-center w-1/5 border-default border-solid border-lightGray"
                                />
                                <div className="flex flex-col flex-1 pb-12 mx-24">
                                    <div className="flex justify-between text-xl font-medium text-whitesmoke">
                                    <h3>{item.product.name}</h3>
                                    <p className="ml-4">${item.product.price}</p>
                                    </div>
                                    <div className="flex items-end justify-between flex-1 text-md">
                                    <p className="text-lightGray">Qty: {item.product.quantity}</p>
                                    </div>
                                </div>
                            </li>
                            ))
                        }               
                        </ul>
                    </div>
                </div> : 
                <React.Fragment>
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

export default Category;
