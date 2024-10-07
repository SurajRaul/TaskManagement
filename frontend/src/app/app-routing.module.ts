import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { TaskComponent } from './tasks/task/task.component';
import { AuthGuard } from './auth/auth.guard';
import { RefreshComponent } from './refresh/refresh.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[AuthGuard]
  },{
    path:'tasks',
    component:TaskComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  { path: '**', redirectTo: '/login' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
