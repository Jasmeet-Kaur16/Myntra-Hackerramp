import { Component } from '@angular/core';
import { Register } from 'src/app/models/register/register';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  obj=new Register()

  onSubmit(){
    console.log(this.obj)
    this.obj.createAt=new Date()
    this.obj.status=true
  }
}
