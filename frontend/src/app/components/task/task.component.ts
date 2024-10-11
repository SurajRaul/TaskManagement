import { Component } from '@angular/core';
import { TaskServService } from '../../shared_service/task-serv.service';
import { Task } from '../../customclass/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  tasks: any[] = [];
  newTaskName: string = '';
  newTaskPriority: string = '';
  newDescription: string='';
  newTaskType:string='';
  newTaskProject:string='';

  editingTaskId: string | null = null;
  editedTaskName: string = '';
  editedTaskStage: number | null = null;
  editedTaskPriority:string='';
  editedTaskDescription:string='';
  editedTaskType:string='';
  editedTaskProject:string='';
  constructor(private taskService: TaskServService) {

  }

  ngOnInit() {
    this.loadTasks();
  }

  async loadTasks() {
    const task = await this.taskService.getTasks();
    this.tasks = task.data;
  }

  getTasksByStage(stage: number) {
    return this.tasks.filter(task => task.stage === stage);
  }

  async createTask() {
    if (this.newTaskName.trim() === '' || this.newDescription.trim()=== '' || this.newTaskPriority === '' || this.newTaskType === '' || this.newTaskProject ==='') {
      alert('Please enter all values to proceed');
      return;
    }

    await this.taskService.createTask({ name: this.newTaskName, stage: 0, priority: this.newTaskPriority || 'medium', description:this.newDescription, type:this.newTaskType, project:this.newTaskProject });
    this.newTaskName = '';
    this.newTaskPriority = '';
    this.newDescription = '';
    this.newTaskType = '';
    this.newTaskProject = '';
    this.loadTasks();
  }


  async startEditing(task: Task) {
    this.editingTaskId = task._id;
    this.editedTaskName = task.name;
    this.editedTaskStage = task.stage;
    this.editedTaskPriority =task.priority;
    this.editedTaskDescription=task.description;
    this.editedTaskType=task.type;
    this.editedTaskProject=task.project;
    }

  async saveEditTask(taskId: string) {
    if (this.editedTaskName.trim() === '' || this.editedTaskStage === null) {
      alert('Task name or stage cannot be empty');
      return;
    }

    await this.taskService.updateTask(taskId, { name: this.editedTaskName, stage: this.editedTaskStage, priority:this.editedTaskPriority, description:this.editedTaskDescription, type:this.editedTaskType, project:this.editedTaskProject});
    this.cancelEdit();
    this.loadTasks();
  }

  cancelEdit() {
    this.editingTaskId = null;
    this.editedTaskName = '';
    this.editedTaskStage = null;
    this.editedTaskDescription='';
    this.editedTaskType='';
    this.editedTaskProject='';
  }


  async updateTaskStage(task: Task, direction: 'back' | 'forward') {
    const newStage = direction === 'back' ? task.stage - 1 : task.stage + 1;

    if (newStage >= 0 && newStage <= 3) {
      task.stage = newStage;
      await this.taskService.updateTask(task._id, { name: task.name, stage: newStage, priority: task.priority, description:task.description, type:task.type, project:task.project});
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




