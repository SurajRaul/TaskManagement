import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { TaskAuthService } from '../auth/task-auth.service';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../store/auth/auth.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 isLoggedIn:boolean=false;

constructor(private router:Router, private authService: TaskAuthService,private store: Store){
  // this.checkLoginStatus();
}



// checkLoginStatus() {
//   this.isLoggedIn = !!localStorage.getItem('authToken');
// }

ngOnInit() {
  this.store.select(selectIsLoggedIn).subscribe(loggedIn => {
    this.isLoggedIn = loggedIn;
  });
}

logout(){
  localStorage.removeItem('authToken');
  this.authService.logout();
  this.isLoggedIn=false;
  this.router.navigate(['/login']);
}

}
