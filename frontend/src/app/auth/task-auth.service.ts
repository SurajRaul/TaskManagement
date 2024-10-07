import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { login, logout } from '../store/auth/auth.actions';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskAuthService {

  constructor(private store: Store) { }

  
  async register(user:any){
    return await axios.post('http://localhost:4000/auth/register',user);
  }

  async login(cred: any) {
    const response = await axios.post('http://localhost:4000/auth/login', cred);
    const token = response.data.token;
    console.log(token)
    this.store.dispatch(login({ token })); // Dispatch login action
    localStorage.setItem('authToken', token);
    return response;
  }

  logout(){
    localStorage.removeItem('authToken');
    console.log('logout');
    this.store.dispatch(logout()); // Dispatch logout action
  }
}
