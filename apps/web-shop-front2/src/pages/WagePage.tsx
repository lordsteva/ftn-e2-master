import { Loader, Button, Pagination } from '@team21/ui-components';
import { Wage, WageDataForm } from '@team21/types';
import React, { FC, useState, useCallback } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import WageInformation from "../components/WageInformation"
import WageForm from "../components/WageForm"
import useGetUserWages from "../graphql/wages/useGetUserWages"
import useCreateWage from "../graphql/wages/useCreateWage"
import useWagePaymentIntent from '../graphql/order/useCreateWageIntent';
import { useUser } from '@team21/web-shop-front2/src/state/state';

const PER_PAGE = 6;

const WagePage: FC<Record<string, never>> = () => {

    const [layout, setLayout] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoader, setIsLoader] = useState(false);

    const [{ user }] = useUser();
    const { data, loading, refetch } = useGetUserWages(user.id, PER_PAGE, currentPage * PER_PAGE);
    const [createWage] = useCreateWage();
    const [ceateWageIntent] = useWagePaymentIntent();

    const onPageChange = useCallback(
        (page: number) => {
            setCurrentPage(page);
        },
        [setCurrentPage],
    );

    async function continueToPayment(data: WageDataForm) {
        setIsLoader(true);
        try {
            const response = await createWage({
            variables: {
                first_name: data.first_name,
                last_name: data.last_name,
                amount: data.amount,
                recipient_first_name: data.recipient_first_name,
                recipient_last_name: data.recipient_last_name,
                user_id: user.id
            },
            });
            const wageId = response.data.insert_wages_one.id;
            if (wageId) {
                const {
                    data: { createWageIntent },
                } = await ceateWageIntent({
                    variables: { amount: data.amount, currency: 'USD', order_id: wageId },
                });
                window.location.replace(
                    `http://localhost:3000/choose-provider/${process.env.REACT_APP_PSP_API_KEY}/${createWageIntent.link}`,
                );
            }
        } catch (e) {
            console.log(e)
        } finally {
            await refetch()
            setIsLoader(false);
            setLayout(true);
        }
      }

    if(!data || loading || isLoader) return <Loader />;

    const total = data?.wages_aggregate.aggregate.count

    return <div className="w-10/12 p-24 mx-auto">
        <div className='mx-auto'>
            <div className='flex justify-between items-center border-b-default border-solid border-lightGray mb-16'>
                <span className='text-whitesmoke text-xxl'>Wage</span>
                <Button
                    buttonColor="primary"
                    textColor="whitesmoke"
                    rounded
                    onClick={()=>setLayout(()=> !layout)}
                    title={layout ? 'Pay Wage' : 'See Wages'}
                    customClass='mb-4'
                />
            </div> 
            {
                layout ? 
                <React.Fragment> { total === 0 ? <div className="flex w-full py-16 text-left text-xxl text-whitesmoke">You have not paid any wage yet...</div> :  
                    <React.Fragment>
                        <div className='flex text-whitesmoke text-left text-xl mb-24 mt-40 py-8 border-b-default border-solid border-lightGray'>
                            <span className='w-1/4'>Wage ID</span>
                            <span className='w-1/6'>Wage Date</span>
                            <span className='w-1/6'>Wage Status</span>
                            <span className='w-1/6'>Wage Amount</span>
                            <span className='w-1/6'>Wage Recipient</span>
                        </div>
                        {
                            data?.wages?.map((wage: Wage) => (
                                <WageInformation key={wage.id} wage={wage} />
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
                } </React.Fragment> : 
                <div className='w-2/5 my-32'>
                    <WageForm continueToPayment={continueToPayment}/>
                </div>
            }
        </div> 
    </div>
};
export default WagePage;
