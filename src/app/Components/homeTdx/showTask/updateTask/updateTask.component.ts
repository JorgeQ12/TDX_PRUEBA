import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmitObject } from 'src/app/interfaces/EmitObject';
import { HomeTdxService } from '../../Services/homeTdx.service';
import { ShowTaskService } from '../Services/showTask.service';
import { TaskTdx } from 'src/app/interfaces/TaskTdx';

@Component({
  selector: 'app-updateTask',
  templateUrl: './updateTask.component.html',
  styleUrls: ['./updateTask.component.css']
})
export class UpdateTaskComponent implements OnInit {
  @Output() exitComponentEmitter = new EventEmitter<EmitObject>();
  @Input('dataTaskEdit') dataTaskEdit!: TaskTdx;
  saveDataForm!: FormGroup;
  stateTask: any;
  dataTaskUpdate = {
    idDTO: '',
    taskNameDTO: '',
    taskDescriptionDTO: '',
    idStateTaskDTO: ''
  };

  constructor(private formBuilder: FormBuilder,  private _snackBar: MatSnackBar, private HomeTdxService: HomeTdxService, private ShowTaskService: ShowTaskService,) { }

  ngOnInit() {
    this.validatorsForms();
    this.getStateCheck();
    this.Getdata();
  }

  validatorsForms(){
    this.saveDataForm = this.formBuilder.group({
      taskName: ['', [Validators.required, Validators.pattern(/\S/)]], // Valida que el campo no esté vacío y no tenga espacios al principio ni al final
      taskDescription: ['', [Validators.required, Validators.pattern(/\S/)]], // Valida que el campo no esté vacío y no tenga espacios al principio ni al final
      idStateTask: ['', [Validators.required, Validators.pattern(/\S/)]], // Valida que el campo no esté vacío y no tenga espacios al principio ni al final
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

  getStateCheck() {
    return this.HomeTdxService.GetStateTask().subscribe(x => {
      this.stateTask = x.data
    });
  }

  Getdata(){
    this.saveDataForm.setValue({
      taskName: this.dataTaskEdit.taskName,
      taskDescription: this.dataTaskEdit.taskDescription,
      idStateTask: this.dataTaskEdit.idStateTask
    });
    console.log(this.saveDataForm)
  }
  updateTask(){

    this.mappInfoDto(this.saveDataForm)
    this.ShowTaskService.UpdateTask(this.dataTaskUpdate).subscribe((x: any) => {
      if(x.isSucces){
        this._snackBar.open('Persona Ingresada Correctamente', 'Cerrar', {
          duration: 3000
        });
        this.exitComponent();
      }
    })
  }

  mappInfoDto(data: FormGroup){
    this.dataTaskUpdate.idDTO = this.dataTaskEdit.id;
    this.dataTaskUpdate.taskNameDTO = data.value['taskName'];
    this.dataTaskUpdate.taskDescriptionDTO = data.value['taskDescription'];
    this.dataTaskUpdate.idStateTaskDTO = data.value['idStateTask'];
  }
  exitComponent(){
    this.exitComponentEmitter.emit({update: false})
  }
}
