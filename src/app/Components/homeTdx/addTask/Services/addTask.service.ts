import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskTdxDTO } from 'src/app/class/TaskTdxDTO';
import { TaskTdx } from 'src/app/interfaces/TaskTdx';
import { ResultResponse } from 'src/app/interfaces/resultresponse';
import { StateCheck } from 'src/app/interfaces/stateCheck';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {
  private UrlBack = "https://localhost:44329/"
  private apiBack = "api/TaskTdx/";
  
  constructor(private http: HttpClient) { }

  GetStateTask(): Observable<ResultResponse<StateCheck>>{
    return this.http.get<ResultResponse<StateCheck>>(this.UrlBack + this.apiBack + "GetStateTask");
  }

  InsertTask(task: TaskTdxDTO): Observable<ResultResponse<TaskTdx>> {
    return this.http.post<ResultResponse<TaskTdx>>(this.UrlBack + this.apiBack + 'InsertTask', task);
  }
}
