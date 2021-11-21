import React, { FC } from 'react';
import { Button } from '../Button/index'

type Props = {
  id: string;
  wrapperClassName?: string;
  name?: string;
};

const Search: FC<Props> = ({ id, wrapperClassName, name }) => (
    <div className="flex w-full flex-wrap items-stretch mb-3">
       
        <input
            type="text"
            placeholder="Search"
            className={"w-4/5 place-content-center bg-white text-dark border-default border-solid border-lightGray hover:border-gray focus:outline-none focus:border-dark pl-24 py-12"}
        />
        <Button size="md" buttonColor="primary" title="Submit" />
  </div>
);

export default Search;
