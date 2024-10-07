import { createAction, props } from '@ngrx/store';

export const login = createAction('Login', props<{ token: string }>());
export const logout = createAction('Logout');
export const checkLoginStatus = createAction('Check Login Status');
