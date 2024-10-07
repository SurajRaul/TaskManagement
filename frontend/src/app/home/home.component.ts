import { Component } from '@angular/core';
import { TaskServService } from '../tasks/task-serv.service';
import { TaskAuthService } from '../auth/task-auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ReloadService } from '../service/reload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  totalTasks: number = 0;
  totalCompleted: number = 0;
  totalPending: number = 0;
  weeklyStats: any={};
  monthlyStats: any = {};
constructor(private taskService:TaskServService,private authService: TaskAuthService,private router:Router,private reloadService:ReloadService){
  
}
ngOnInit() {
  this.loadStatistics();
}

async loadStatistics() {
  const tasks = await this.taskService.getTaskStats();
  this.totalTasks = tasks.totalTasks;
  this.totalCompleted = tasks.totalCompleted;
  this.totalPending = tasks.totalPending;
  console.log(tasks.weekly);
  this.weeklyStats= tasks.weekly;
  this.monthlyStats=tasks.monthly;
  
}


}
