import { Injectable } from '@angular/core';
import axios from 'axios';

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

  async createTask(task: any) {
    const token = this.getToken();
    console.log(task);
    return await axios.post(this.baseUrl, task, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateTask(taskId: string, updatedTask: any) {
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

