import React, { FC } from 'react';
import { CategoryTile } from '../../data-display/CategoryTile'
import { Button } from '../../input-controls/Button'

type Props = {
    categories: any[];
};

const categoryPerPage = 5;

const CLP: FC<Props> = ({ categories }) => (
    <div className="p-24">
        <h1 className="text-h1 text-left mb-24 ml-24">Categories</h1>
        <div className="flex justify-items-start items-center flex-wrap">
            {categories.map((category: Props, index: number)=>(
                <CategoryTile key={index} category={category}/>
            ))}
        </div>
        {   
            categories.length > categoryPerPage && 
            <div className="flex justify-center items-center mt-24">
                <Button buttonColor="primary" textColor="whitesmoke" title="Show More" />
            </div>
        }
    </div>

);

export default CLP;
