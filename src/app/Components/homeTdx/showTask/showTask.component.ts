import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShowTaskService } from './Services/showTask.service';
import { HomeTdxService } from '../Services/homeTdx.service';
import { TaskTdx } from 'src/app/interfaces/TaskTdx';
import { StateCheck } from 'src/app/interfaces/stateCheck';
import { of, switchMap } from 'rxjs';
import { EmitObject } from 'src/app/interfaces/EmitObject';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-showTask',
  templateUrl: './showTask.component.html',
  styleUrls: ['./showTask.component.css']
})
export class ShowTaskComponent implements OnInit {
  @Output() exitComponentEmitter = new EventEmitter<EmitObject>();
  dataSource: any;
  isUpdateTask: boolean = false
  stateTask: any;
  dataTaskEdit!: TaskTdx;

  constructor(private ShowTaskService: ShowTaskService, private _snackBar: MatSnackBar, private HomeTdxService: HomeTdxService) { 
    
  }

  ngOnInit() {
    this.getInfoData();
  }

  getInfoData(){
    this.getStateCheck().pipe(
      switchMap(stateData =>  this.getListData().pipe(
        switchMap(taskData => {
          return of({ stateData, taskData });
        })
      ))
    ).subscribe(({ stateData, taskData }) => {
      this.dataSource = taskData.data;
      this.stateTask = stateData.data
      this.dataSource.forEach((taskD: any) => {
        const estado = this.stateTask.find((state: StateCheck) => state.id == taskD.idStateTask)
        if(estado){
          taskD.estadoDecription = estado.name;
        }
      });
    });
    
  }

  getStateCheck() {
    return this.HomeTdxService.GetStateTask();
  }
  
  getListData() {
    return this.ShowTaskService.GetTask();
  }

  editData(e: TaskTdx){
    this.isUpdateTask = true
    this.dataTaskEdit = e;
  }

  openAdd(){
    this.exitComponentEmitter.emit({add: true, show: false})
  }

  deleteTask(idTask: string){
    this.ShowTaskService.DeleteTask(idTask).subscribe((x: any) => {
      if(x.isSucces){
        this._snackBar.open(x.message, 'Cerrar', {
          duration: 3000
        });
        this.getInfoData()
      }
    })
  }

  exitComponent(e: EmitObject){
    if(!e.update){
      this.isUpdateTask = false;
    }
    this.getInfoData();
  }
}
