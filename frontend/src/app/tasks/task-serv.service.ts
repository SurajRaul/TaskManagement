import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class TaskServService {
  public baseUrl = 'http://localhost:4000/tasks';

  private token: string | null = localStorage.getItem('authToken');

  async getTasks() {
    const response = await axios.get(this.baseUrl, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  async createTask(task: any) {
    console.log(task);
    return await axios.post(this.baseUrl, task, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async updateTask(taskId: string, updatedTask: any) {
    return await axios.put(`${this.baseUrl}/${taskId}`, updatedTask, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async deleteTask(taskId: string) {
    return await axios.delete(`${this.baseUrl}/${taskId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async moveTask(taskId: string, direction: 'forward' | 'backward') {
    return await axios.patch(`${this.baseUrl}/${taskId}/move/${direction}`, {}, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async getTaskStats(){
    const response = await axios.get(`${this.baseUrl}/stats`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }
}

