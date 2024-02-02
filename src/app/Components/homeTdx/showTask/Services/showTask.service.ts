import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskTdx } from 'src/app/interfaces/TaskTdx';
import { ResultResponse } from 'src/app/interfaces/resultresponse';

@Injectable({
  providedIn: 'root'
})
export class ShowTaskService {
  private UrlBack = "https://localhost:44329/"
  private apiBack = "api/TaskTdx/";
  urlBackFull!: string;
  constructor(private http: HttpClient) { 
    this.urlBackFull = this.UrlBack+this.apiBack;
  }

  GetTask(): Observable<ResultResponse<TaskTdx>>{
    return this.http.get<ResultResponse<TaskTdx>>(`${this.urlBackFull}GetTask`);
  }

  DeleteTask(idTask: any) {
    return this.http.delete(`${this.urlBackFull}DeleteTask/${idTask}`);
  }

  UpdateTask(updateTask: any){
    return this.http.put(`${this.urlBackFull}UpdateTask`, updateTask);
  }
}
