import { Injectable } from '@angular/core';
import axios from 'axios';
import { CreateT } from '../customclass/create-t';
import { UpdateT } from '../customclass/update-t';

@Injectable({
  providedIn: 'root'
})

export class TaskServService {
  public baseUrl = 'http://localhost:4000/tasks';

  // private token: string | null = localStorage.getItem('authToken');

  private getToken() {
    return localStorage.getItem('authToken');
  }

  async getTasks() {
    const token = this.getToken();
    const response = await axios.get(this.baseUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async createTask(task: CreateT) {
    const token = this.getToken();
    return await axios.post(this.baseUrl, task, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateTask(taskId: string, updatedTask: UpdateT) {
    const token = this.getToken();
    return await axios.put(`${this.baseUrl}/${taskId}`, updatedTask, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deleteTask(taskId: string) {
    const token = this.getToken();
    return await axios.delete(`${this.baseUrl}/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async moveTask(taskId: string, direction: 'forward' | 'backward') {
    const token = this.getToken();
    return await axios.patch(`${this.baseUrl}/${taskId}/move/${direction}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

}


