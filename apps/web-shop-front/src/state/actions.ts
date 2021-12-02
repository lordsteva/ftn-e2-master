export type UserAction = SET_USER | SET_TOKEN | LOGOUT;

type SET_USER = {
  type: 'SET_USER';
  payload: { id: string; email: string };
};
type SET_TOKEN = {
  type: 'SET_TOKEN';
  payload: string;
};
type LOGOUT = {
  type: 'LOGOUT';
};
