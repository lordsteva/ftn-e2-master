import { UserAction } from './actions';
import { initialState, UserState } from './state';
export default function UserReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...{ user: action.payload } };
    case 'SET_TOKEN':
      return { ...state, ...{ token: action.payload } };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}
