import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmitObject } from 'src/app/interfaces/EmitObject';

@Component({
  selector: 'app-homeTdx',
  templateUrl: './homeTdx.component.html',
  styleUrls: ['./homeTdx.component.css']
})
export class HomeTdxComponent implements OnInit {

  isAddTask: boolean = false
  isShowList: boolean = false

  constructor() { }

  ngOnInit() {
  }

  intoComponent(e: string){
    if(e == 'show'){
      this.isShowList = true;
    }
    if(e == 'add'){
      this.isAddTask = true;
    }
  }

  exitComponent(e: EmitObject){
    this.isAddTask = e.add ? true:false;
    this.isShowList = e.show ? true:false;
  }

}
