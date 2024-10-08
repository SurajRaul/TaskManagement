import { Component } from '@angular/core';
import { TaskServService } from '../tasks/task-serv.service';
import { TaskAuthService } from '../auth/task-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  total: number = 0;
  totalTasks: number = 0;
  totalCompleted: number = 0;
  totalPending: number = 0;

  tasks: any[] = [];
  filterTask: any[] = [];

  yearToFilter: number = 2024;
  totalTasksY: number = 0;
  totalCompletedY: number = 0;
  totalPendingY: number = 0;

  // monthToFilter: number = 10;
  monthToFilter: number = new Date().getMonth() + 1;
  totalTasksM: number = 0;
  totalCompletedM: number = 0;
  totalPendingM: number = 0;

  weekToFilter: number = 0;
  totalTasksW: number = 0;
  totalCompletedW: number = 0;
  totalPendingW: number = 0;

  constructor(private taskService: TaskServService) { }

  ngOnInit() {
    this.load();
  }

  async load() {
    const tasks = await this.taskService.getTasks();
    this.tasks = tasks;
    this.filterTasks();
    this.filterTaskByYear(this.yearToFilter);
  }
  filterTasks() {
    this.totalTasks = this.tasks.length;
    this.totalCompleted = this.tasks.filter(task => task.stage === 3).length;
    this.totalPending = this.tasks.filter(task => task.stage < 3).length;
  }

  filterTaskByYear(year: number) {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    this.filterTask = this.tasks.filter((task: any) => {
      const createDate = new Date(task.createdAt);
      return createDate >= startDate && createDate <= endDate;
    });

    this.totalTasksY = this.filterTask.length;
    this.totalCompletedY = this.filterTask.filter(task => task.stage === 3).length;
    this.totalPendingY = this.filterTask.filter(task => task.stage < 3).length;

    if (this.monthToFilter > 0) {
      this.filterTaskByMonth(this.yearToFilter, this.monthToFilter);
    }
    if (this.weekToFilter > 0) {
      this.filterTaskByWeek(this.yearToFilter, this.weekToFilter);
    }
  }

  filterTaskByMonth(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59); // Last day of the month

    const monthFilteredTasks = this.filterTask.filter((task: any) => {
      const createDate = new Date(task.createdAt);
      return createDate >= startDate && createDate <= endDate;
    });

    this.totalTasksM = monthFilteredTasks.length;
    this.totalCompletedM = monthFilteredTasks.filter(task => task.stage === 3).length;
    this.totalPendingM = monthFilteredTasks.filter(task => task.stage < 3).length;
  }

  filterTaskByWeek(year: number, weekNum: number) {
    const firstDayOfYear = new Date(year, 0, 1);
    const dayOffset = (weekNum - 1) * 7;

    const startDate = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + dayOffset));
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Start week on Sunday

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(23, 59, 59);

    const weekFilteredTasks = this.filterTask.filter((task: any) => {
      const createDate = new Date(task.createdAt);
      return createDate >= startDate && createDate <= endDate;
    });

    this.totalTasksW = weekFilteredTasks.length;
    this.totalCompletedW = weekFilteredTasks.filter(task => task.stage === 3).length;
    this.totalPendingW = weekFilteredTasks.filter(task => task.stage < 3).length;
  }
}
