import { Card, Loader, Pagination } from '@team21/ui-components';
import React, { FC, useCallback, useState } from 'react';
import useGetProducts from '../graphql/useGetProducts';

const PER_PAGE = 4;

const Home: FC<Record<string, never>> = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, loading } = useGetProducts(PER_PAGE, currentPage * PER_PAGE);

  const onPageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage],
  );

  const total = data?.products_aggregate.aggregate.count;

  if (total === 0) {
    return <div className="flex items-center justify-center w-full h-full">No items...</div>;
  }

  //TODO style card a little bit better
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen ">
      {!data && loading && <Loader />}
      {data && (
        <div className="flex flex-wrap justify-between gap-3 max-w-7xl">
          {data?.products.map((item) => (
            <div key={item.id} className="min-w-max">
              <Card
                title={item.name}
                body={
                  <>
                    <div>{item.description}</div>
                    <div>Price: {item.price}</div>
                    <div>Quantity: {item.quantity}</div>
                  </>
                }
                buttonTitle={'view'}
                imageSrc={item.image}
              />
            </div>
          ))}
        </div>
      )}
      <div className="w-full max-w-7xl">
        <Pagination
          currentPage={currentPage}
          total={total ?? 0}
          displayPerPage={PER_PAGE}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Home;
