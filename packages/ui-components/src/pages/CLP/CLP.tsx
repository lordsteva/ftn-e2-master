import React, { FC, useState } from 'react';
import { CategoryTile } from '../../data-display/CategoryTile'

type Props = {};

const CLP: FC<Props> = () => {
    const [categories, setCategories] = useState([]);

    return <div className="w-10/12 p-24 mx-auto">
        <h1 className="text-h1 text-left mb-24 ml-24">Categories</h1>
        <div className="flex justify-items-start items-center flex-wrap">
            {categories.map((category: Props, index: number)=>(
                <CategoryTile key={index} category={category}/>
            ))}
        </div>
    </div>

};

export default CLP;
