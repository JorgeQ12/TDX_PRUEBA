import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTdxComponent } from './homeTdx.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './addTask/addTask.component';
import {MatTableModule} from '@angular/material/table';
import { ShowTaskComponent } from './showTask/showTask.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UpdateTaskComponent } from './showTask/updateTask/updateTask.component';
import { HomeTdxService } from './Services/homeTdx.service';

@NgModule({  
  declarations: [
    AddTaskComponent,
    ShowTaskComponent,
    HomeTdxComponent,
    UpdateTaskComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule
  ],
})
export class HomeTdxModule { }
