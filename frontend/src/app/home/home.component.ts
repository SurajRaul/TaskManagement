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
  weeklyStats: any = {};
  monthlyStats: any = {};

  tasks: any[] = [];
  filterTask: any[] = [];
  yearToFilter: number = 2024;
  totalTasksY:number=0;
  totalCompletedY:number=0;
  totalPendingY:number=0;

  constructor(private taskService: TaskServService, private authService: TaskAuthService, private router: Router, private reloadService: ReloadService) {
 
  }
  ngOnInit() {
    this.loadStatistics();
    this.load()
  }

  async loadStatistics() {
    const tasks = await this.taskService.getTaskStats();
    this.totalTasks = tasks.totalTasks;
    this.totalCompleted = tasks.totalCompleted;
    this.totalPending = tasks.totalPending;
    console.log(tasks.weekly);
    this.weeklyStats = tasks.weekly;
    this.monthlyStats = tasks.monthly;
  }
  async load() {
    const tasks = await this.taskService.getTasks();
    this.tasks=tasks;
    const total=this.filterTaskByYear(this.yearToFilter);
  }

  filterTaskByYear(year: number) {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    this.filterTask = this.tasks.filter((task: any) => {
        const createDate = new Date(task.createdAt);
        return createDate >= startDate && createDate <= endDate; 
    });
    this.totalTasksY=this.filterTask.length;
    this.totalCompletedY = this.filterTask.filter(task => task.stage === 3).length;
    this.totalPendingY = this.filterTask.filter(task => task.stage >= 3).length;
}

}
