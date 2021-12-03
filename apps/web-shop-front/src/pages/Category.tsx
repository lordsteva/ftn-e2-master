import { PLP, Loader, Pagination } from '@team21/ui-components';
import React, { FC, useCallback, useState} from 'react';
import { useLocation } from 'react-router-dom'
import UseGetCategoryProducts from '../graphql/category/useGetCategoryProducts';

const PER_PAGE = 8;

const Category: FC<Record<string, never>> = () => {
    const { state } = useLocation();
    const [currentPage, setCurrentPage] = useState(0);
    const { data, loading } = UseGetCategoryProducts(state.id, PER_PAGE, currentPage * PER_PAGE);

    const onPageChange = useCallback(
        (page: number) => {
            setCurrentPage(page);
        },
        [setCurrentPage],
    );

    if (!data && loading) return <Loader />;

    const total = data?.products_aggregate.aggregate.count
    if(total === 0) return <div className="flex w-full absolute top-1/4 items-center justify-center text-xxl">No items...</div>

    return (
        <React.Fragment>
            <PLP id={state.id} name={state.name} products={data!.products} />
            <div className="w-10/12 p-24 mx-auto">
                <Pagination
                    currentPage={currentPage}
                    total={total ?? 0}
                    displayPerPage={PER_PAGE}
                    onPageChange={onPageChange}
                />
            </div>
         </React.Fragment>
    );
};
export default Category;