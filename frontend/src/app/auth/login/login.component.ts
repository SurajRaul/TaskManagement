import { Component,Output, EventEmitter } from '@angular/core';
import { TaskAuthService } from '../task-auth.service';
import { Router } from '@angular/router';
import { Login } from '../../customclass/login';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskServService } from '../../tasks/task-serv.service';
import { ReloadService } from '../../service/reload.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm:FormGroup;
Login=new Login();
  // email:string='';
  // password:string='';
  
  constructor(private authService:TaskAuthService, private router:Router, private taskService:TaskServService,private reloadService:ReloadService){
    this.loginForm=new FormGroup({
      email: new FormControl(this.Login.email,[Validators.required,Validators.email]),
      password: new FormControl(this.Login.password,[Validators.required])
    })
  }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  async handleLogin(){
    if (this.loginForm.invalid) {
      return;
    }
    try{
        const res=await this.authService.login(this.loginForm.value);
        localStorage.setItem('authToken',res.data.token);
       this.router.navigate(['/home'])
    }catch(err){
      console.log('LOgin failed',err);
    }
  }
}