import { ProductTile, Loader, Banner } from '@team21/ui-components';
import React, { FC } from 'react';
import { Product } from '@team21/types'
import useGetHomepageProducts from '../graphql/product/useGetHomepageProducts';

const Home: FC<Record<string, never>> = () => {
  const { data, loading } = useGetHomepageProducts(3);

  if (!data && loading) return <Loader />;

  return <div className="w-10/12 p-24 mx-auto">
    <h1 className="text-whitesmoke text-h1 text-center my-40 ml-24">Welcome to Web Shop!</h1>
    <Banner type={true} path="/categories" color="blue" title='Laptops' text='We have the best offer of laptops!'/>
    <h2 className="text-h1 text-whitesmoke text-center my-40 ml-24">Best Sellers</h2>
    <div className="flex justify-center items-center flex-wrap">
        {data?.products?.map((product: Product, index: number)=>(
            <ProductTile key={index} product={product}/>
        ))}
    </div>
  </div>
};

export default Home;
