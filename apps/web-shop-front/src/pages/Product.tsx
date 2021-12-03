import { PDP, Loader } from '@team21/ui-components';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom'
import useGetProductById from '../graphql/product/useGetProductById';

const Product: FC<Record<string, never>> = () => {
    const { state } = useLocation();
    const { data, loading } = useGetProductById(state.id);

    if (loading) return <Loader />;
    return (
        <PDP product={data!.products[0]} />
    );
};
export default Product;
