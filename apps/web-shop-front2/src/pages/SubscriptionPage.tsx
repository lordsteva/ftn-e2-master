import { Loader, Pagination } from '@team21/ui-components';
import { Subscription } from '@team21/types';
import React, { FC, useState, useCallback } from 'react';
import SubscriptionInformation from "../components/SubscriptionInformation"
import useGetUserSubscriptions from "../graphql/subscription/useGetUserSubscriptions"
import useCancelSubscription from "../graphql/subscription/useCancelSubscription"
import { useUser } from '@team21/web-shop-front2/src/state/state';

const PER_PAGE = 6;

const SubscriptionPage: FC<Record<string, never>> = () => {

    const [currentPage, setCurrentPage] = useState(0);

    const [{ user }] = useUser();
    const { data, loading, refetch } = useGetUserSubscriptions(user.id, PER_PAGE, currentPage * PER_PAGE);
    const [cancelSubscription] = useCancelSubscription();

    const onPageChange = useCallback(
        (page: number) => {
            setCurrentPage(page);
        },
        [setCurrentPage],
    );

    async function cancelSub(id: string){
        await cancelSubscription({
            variables: { id: id }
        })
        await refetch()
    }

    if(!data || loading) return <Loader />;

    const total = data?.subscriptions_aggregate.aggregate.count
    if (total === 0) return <div className="w-10/12 p-24 mx-auto text-center text-xxl text-whitesmoke">You have not subscribed to courses yet...</div>

    return <div className="w-10/12 p-24 mx-auto">
        <div className='mx-auto'>
            <React.Fragment>
                <div className='flex text-whitesmoke text-left text-xxl mb-24 mt-40 py-8 border-b-default border-solid border-lightGray'>
                    <span className='w-1/4'>Subscription ID</span>
                    <span className='w-1/6'>Date</span>
                    <span className='w-1/6'>Status</span>
                    <span className='w-1/6'>Cost</span>
                    <span className='w-1/6'>Plan</span>
                    <span className='w-1/6 hidden'>Action</span>
                </div>
                {
                    data?.subscriptions?.map((subs: Subscription) => (
                        <SubscriptionInformation key={subs.id} subs={subs} cancelSub={cancelSub} />
                    ))
                }
                { total && (total > PER_PAGE) && <div className="w-10/12 p-24 mx-auto">
                    <Pagination
                        currentPage={currentPage}
                        total={total ?? 0}
                        displayPerPage={PER_PAGE}
                        onPageChange={onPageChange}
                    />
                </div>}
            </React.Fragment> 
        </div> 
    </div>
};
export default SubscriptionPage;
