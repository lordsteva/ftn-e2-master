import React, { FC } from 'react';
import { Button } from '../../input-controls/Button'
import webShopBanner from '../../assets/webShopBanner.jpg'
import { useNavigate } from 'react-router';

type Props = {
    type: boolean,
    path: string,
    color: string,
    title: string,
    text: string
};

const Banner: FC<Props> = ({ type, path, color, title, text }) => {
  const navigate = useNavigate();
  const banner = type ? webShopBanner : ''  
  return (
    <div className='w-full lg:h-500px xl:h-600px flex flex-col xl:flex-row justify-between'>
      <img src={banner} />
      <div className={`flex justify-center items-center text-center flex-col w-full p-24 bg-${color}`}>
          <h2 className='text-h1 mb-24'>{title}</h2>
          <p className='mb-24'>{text}</p>
          <Button title='Shop Now' onClick={()=>navigate(path)}/>
      </div>  
    </div>
  );
};
export default Banner;
