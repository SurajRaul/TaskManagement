import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { token }) => ({
    state,
    isLoggedIn: true,
    token,
  })),
  on(logout, state => ({
    state,
    isLoggedIn: false,
    token: null,
  }))
);
