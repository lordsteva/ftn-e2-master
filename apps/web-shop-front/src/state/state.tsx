import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { getUserFromToken } from '../utils/tokenUtils';
import { UserAction } from './actions';
import reducer from './reducers';

export const initialState: UserState = {
  user: getUserFromToken(localStorage.getItem('token')),
  token: localStorage.getItem('token'),
};

export type UserState = {
  user: { id: string; email: string };
  token: string | null;
};

const UserContext = createContext<[UserState, Dispatch<UserAction> | null]>([initialState, null]);
const useUser = () => useContext(UserContext);
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>;
};

export { UserProvider, useUser };
