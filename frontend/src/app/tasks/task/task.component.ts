import { Component } from '@angular/core';
import { TaskServService } from '../task-serv.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
tasks:any[]=[];
newTaskName:string='';

constructor(private taskService:TaskServService){

}

ngOnInit(){
  this.loadTasks();
}

async loadTasks() {
  this.tasks = await this.taskService.getTasks();
}

getTasksByStage(stage: number) {
  
  return this.tasks.filter(task => task.stage === stage);
  
}

async createTask(){
  if (this.newTaskName.trim() === '') {
    alert('Task name cannot be empty');
    return;
  }

await this.taskService.createTask({name:this.newTaskName,stage:0});
  this.newTaskName='';
  this.loadTasks();
}

async editTask(taskId: string, taskName: string,stage:string) {
  const updatedName = prompt('Edit Task Name', taskName);
  const updatedstage = prompt('Edit stage Name', stage);
  if (updatedName) {
    await this.taskService.updateTask(taskId, { name: updatedName,stage:updatedstage });
    this.loadTasks();
  }
} 
async updateTaskStage(task: any, direction: 'back' | 'forward') {
  const newStage = direction === 'back' ? task.stage - 1 : task.stage + 1;

  if (newStage >= 0 && newStage <= 3) {
    task.stage = newStage;
    await this.taskService.updateTask(task._id, { stage: newStage });
    this.loadTasks();
  }
}
async deleteTask(taskId: string) {
  const confirmDelete = confirm('Are you sure you want to delete this task?');
  if (confirmDelete) {
    await this.taskService.deleteTask(taskId);
    this.loadTasks();
  }
}

async moveTask(taskId: string, direction: 'forward' | 'backward') {
  await this.taskService.moveTask(taskId, direction);
  this.loadTasks();
}

}




