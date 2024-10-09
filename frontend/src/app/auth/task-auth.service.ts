import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { login, logout } from '../store/auth/auth.actions';
import { Register } from '../customclass/register';
import { Credlogin } from '../customclass/credlogin';

@Injectable({
  providedIn: 'root'
})
export class TaskAuthService {

  constructor(private store: Store) { 
  }

  async register(user:Register){
    return await axios.post('http://localhost:4000/auth/register',user);
  }

  async login(cred: Credlogin) {
    const response = await axios.post('http://localhost:4000/auth/login', cred);
    const token = response.data.data.token;
    console.log(token)
    this.store.dispatch(login({ token })); 
    localStorage.setItem('authToken', token);
    return response;
  }

  logout(){
    localStorage.removeItem('authToken');
    console.log('logout');
    this.store.dispatch(logout()); 
  }
}
