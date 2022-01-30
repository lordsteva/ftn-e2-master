import React, { FC, useState } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
    children: any;
    loggedIn: string | null;
    path: string;
}

const PrivateRoute: FC<Props> = ({ children, loggedIn, path }) => {
    return loggedIn ? children  : <Navigate to={path}/> 
}

export default PrivateRoute;