import { CLP, Loader, Pagination } from '@team21/ui-components';
import React, { FC, useState, useCallback } from 'react';
import useGetCategories from '../graphql/category/useGetCategories';

const PER_PAGE = 12;

const Category: FC<Record<string, never>> = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const { data, loading } = useGetCategories(PER_PAGE, currentPage * PER_PAGE);

    const onPageChange = useCallback(
        (page: number) => {
            setCurrentPage(page);
        },
        [setCurrentPage],
    );

    if(!data && loading) return <Loader />;

    const total = data?.product_categories_aggregate.aggregate.count
    if(total === 0) return <div className="flex w-full absolute top-1/4 items-center justify-center text-xxl text-whitesmoke">Currently there are no items...</div>
    
    return (
        <React.Fragment>
            <CLP categories={data!.product_categories} />
            { total && (total > PER_PAGE) && <div className="w-10/12 p-24 mx-auto">
                <Pagination
                    currentPage={currentPage}
                    total={total ?? 0}
                    displayPerPage={PER_PAGE}
                    onPageChange={onPageChange}
                />
            </div>}
      </React.Fragment>
    );
};

export default Category;
