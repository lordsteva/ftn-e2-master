import React, { FC } from 'react';
import { CategoryTile } from '../../data-display/CategoryTile'
import { Category } from '@team21/types'

type Props = {
    categories: Category[];
}

const CLP: FC<Props> = ({categories}) => {

    return <div className="w-10/12 p-24 mx-auto">
        <h1 className="text-whitesmoke text-h1 text-left mb-24 ml-24">Categories</h1>
        <div className="flex justify-items-start items-center flex-wrap">
            {categories?.map((category: Category)=>(
                <CategoryTile key={category.id} category={category}/>
            ))}
        </div>
    </div>

};

export default CLP;
