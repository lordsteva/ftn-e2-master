import React, { FC } from 'react';
import { useNavigate, } from 'react-router-dom'
import { Card } from '../Card/'
import { Category } from '@team21/types'
import "./index.css"


type Props = {
    category: Category;
};

const CategoryTile: FC<Props> = ({ category }) => {
    const navigate = useNavigate();
  
    function openCategory() {
        navigate('/category', { state:{ id: category.id , name: category.name }});
    }

    return <Card 
        title={`${category.name}`}
        imageSrc={category.image}
        imageAlt={`${category.name}-image`}
        imageHeight="120px"
        buttonTitle={"View More"}
        onClick={openCategory}
        customClass="category-tile w-52 mx-24 my-12"
    />
};

export default CategoryTile;
