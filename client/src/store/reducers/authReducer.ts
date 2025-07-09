import { Reducer } from 'redux';

// Action types
export const SET_CREDENTIALS = 'SET_CREDENTIALS';
export const CLEAR_CREDENTIALS = 'CLEAR_CREDENTIALS';

// State interface
export interface AuthState {
  id: string | null;
  email: string | null;
  token: string | null;
}

// Action interfaces
interface SetCredentialsAction {
  type: typeof SET_CREDENTIALS;
  payload: { id: string; email: string; token: string };
}
interface ClearCredentialsAction {
  type: typeof CLEAR_CREDENTIALS;
}
export type AuthActionTypes = SetCredentialsAction | ClearCredentialsAction;

// Initial auth state
export const initialAuthState: AuthState = {
  id: null,
  email: null,
  token: localStorage.getItem('token') || null,
};

// Auth reducer
export const authReducer: Reducer<AuthState, AuthActionTypes> = (
  state = initialAuthState,
  action
): AuthState => {
  switch (action.type) {
    case SET_CREDENTIALS: {
      const { id, email, token } = (action as SetCredentialsAction).payload;
      localStorage.setItem('token', token);
      return { id, email, token };
    }
    case CLEAR_CREDENTIALS: {
      localStorage.removeItem('token');
      return { id: null, email: null, token: null };
    }
    default:
      return state;
  }
};

// Action creators
export const setCredentials = (
  id: string,
  email: string,
  token: string
): SetCredentialsAction => ({
  type: SET_CREDENTIALS,
  payload: { id, email, token }
});

export const clearCredentials = (): ClearCredentialsAction => ({
  type: CLEAR_CREDENTIALS
});