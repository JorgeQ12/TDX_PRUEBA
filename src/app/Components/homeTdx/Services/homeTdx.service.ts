import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultResponse } from 'src/app/interfaces/resultresponse';
import { StateCheck } from 'src/app/interfaces/stateCheck';

@Injectable({
  providedIn: 'root'
})
export class HomeTdxService {
  private UrlBack = "https://localhost:44329/"
  private apiBack = "api/TaskTdx/";
  
  constructor(private http: HttpClient) { }
  GetStateTask(): Observable<ResultResponse<StateCheck>>{
    return this.http.get<ResultResponse<StateCheck>>(this.UrlBack + this.apiBack + "GetStateTask");
  }
}
