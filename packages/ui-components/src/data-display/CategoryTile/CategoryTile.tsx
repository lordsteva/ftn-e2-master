import React, { FC } from 'react';
import { Card } from '../Card/'

type Props = {
    category: any; // this should change 
};

const CategoryTile: FC<Props> = ({ category }) => ( 
    <Card 
        title={`${category.name} (${category.count})`}
        imageSrc={category.image}
        buttonTitle={category.buttonTitle}
        onClick={category.onClick}
        customClass="w-52 mx-24 my-12"
    />
);

export default CategoryTile;
