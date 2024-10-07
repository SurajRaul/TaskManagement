import { Component } from '@angular/core';
import { TaskAuthService } from '../task-auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Signin } from '../../customclass/signin';
import { Customval } from '../../customclass/customval';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  signin=new Signin();
  // username:string='';
  // email:string='';
  // contactNumber:string='';
  // password:string='';
  // confirmPassword:string='';

  constructor(private authService: TaskAuthService, private router: Router, private fb: FormBuilder) {
    this.registerForm = new FormGroup({
      username: new FormControl(this.signin.username, [Validators.required, Validators.pattern('[A-Za-z ]*'), Validators.minLength(2)]),
      email: new FormControl(this.signin.email, [Validators.required, Validators.email]),
      contactNumber: new FormControl(this.signin.contactNumber, [Validators.required,Validators.minLength(2),Validators.maxLength(10)]),
      password: new FormControl(this.signin.password, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(""),
    },[Customval.valueMatch("password","confirmPassword")])
  }

  get username(){
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email'); 
  }

  get contactNumber() {
    return this.registerForm.get('contactNumber'); 
  }

  get password() {
    return this.registerForm.get('password'); 
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword'); 
  }

  async handleRegister() {

    if (this.registerForm.invalid) {
      return;
    }

    try {
      await this.authService.register(this.registerForm.value);
      this.router.navigate(['/login']);
    } catch (err) {
      console.log('Registration failed', err);
    }
  }
}
