import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddTaskService } from './Services/addTask.service';
import { ResultResponse } from 'src/app/interfaces/resultresponse';
import { StateCheck } from 'src/app/interfaces/stateCheck';
import { TaskTdx } from 'src/app/interfaces/TaskTdx';
import { TaskTdxDTO } from 'src/app/class/TaskTdxDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmitObject } from 'src/app/interfaces/EmitObject';

@Component({
  selector: 'app-addTask',
  templateUrl: './addTask.component.html',
  styleUrls: ['./addTask.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() exitComponentEmitter = new EventEmitter<EmitObject>();
  saveDataForm!: FormGroup;
  stateTask: any;
  dataTask: TaskTdxDTO = {
    taskNameDTO: '',
    taskDescriptionDTO: '',
    idStateTaskDTO: ''
  };
  constructor(private formBuilder: FormBuilder, private AddTaskService: AddTaskService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.validatorsForms();
    this.getStateCheck();
  }
  validatorsForms(){
    this.saveDataForm = this.formBuilder.group({
      nombreTask: ['', [Validators.required, Validators.pattern(/\S/)]], // Valida que el campo no esté vacío y no tenga espacios al principio ni al final
      descriptionTask: ['', [Validators.required, Validators.pattern(/\S/)]], // Valida que el campo no esté vacío y no tenga espacios al principio ni al final
      stateTask: ['', [Validators.required, Validators.pattern(/\S/)]], // Valida que el campo no esté vacío y no tenga espacios al principio ni al final
    });
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.saveDataForm.get(controlName);
  
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
  
    if (control?.hasError('pattern')) {
      return 'Por favor, digite correctamente el campo.';
    }

    return null;
  }

  getStateCheck(){
    this.AddTaskService.GetStateTask().subscribe((x: ResultResponse<StateCheck>) => {
      this.stateTask = x.data
    })
  }

  addTask(){
    this.validatorsForms();

    this.mappInfoDto(this.saveDataForm)
    this.AddTaskService.InsertTask(this.dataTask).subscribe((x: ResultResponse<TaskTdx>) => {
      if(x.isSucces){
        this._snackBar.open('Persona Ingresada Correctamente', 'Cerrar', {
          duration: 3000
        });
        this.exitComponent();
      }
    })
  }

  mappInfoDto(data: FormGroup){
    if(data.valid)
    {
      this.dataTask.taskNameDTO = data.value['nombreTask'];
      this.dataTask.taskDescriptionDTO = data.value['descriptionTask'];
      this.dataTask.idStateTaskDTO = data.value['stateTask'];
    }
  }

  exitComponent(){
    this.exitComponentEmitter.emit({add: false})
  }
}
