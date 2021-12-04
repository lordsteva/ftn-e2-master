import { ProductTile, Loader } from '@team21/ui-components';
import React, { FC, useEffect, useState } from 'react';
import { Product } from '@team21/types'
import useGetHomepageProducts from '../graphql/product/useGetHomepageProducts';

const Home: FC<Record<string, never>> = () => {
  const { data, loading } = useGetHomepageProducts(3);

  if (!data && loading) return <Loader />;

  return <div className="w-10/12 p-24 mx-auto">
    <h1 className=" text-h1 text-center my-40 ml-24">Welcome to Web Shop!</h1>
    <div className="flex justify-center items-center flex-wrap">
        {data?.products && data?.products.map((product: Product, index: number)=>(
            <ProductTile key={index} product={product}/>
        ))}
    </div>
  </div>
};

export default Home;
