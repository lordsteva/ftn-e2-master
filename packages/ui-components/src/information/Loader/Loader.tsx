import React, { FC } from 'react';
import './index.css';

type Props = {
  text?: string;
};

const Loader: FC<Props> = ({ text }) => (
    <div className="w-full flex justify-center items-center">
        <p className="text-primary text-h2 mr-16"> {text ? text : 'Loading ...'} </p>
        <div className="loader-spin rounded-half h-16 w-16"/>
    </div>
);

export default Loader;
