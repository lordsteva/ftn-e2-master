import React, { FC } from 'react';
import './index.css';

type Props = {
  text?: string;
};

const Loader: FC<Props> = ({ text }) => (
  <div className="absolute flex items-center justify-center w-full top-1/4">
    <p className="mr-16 text-primary text-h2"> {text ? text : 'Loading ...'} </p>
    <div className="w-16 h-16 rounded-full loader-spin" />
  </div>
);

export default Loader;
