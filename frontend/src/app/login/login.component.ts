import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private _route: Router, private _auth: AuthService) {}

  loginForm = new FormGroup({
    contactNumber: new FormControl('', [Validators.required,Validators.minLength(10)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onsubmit() {
    if (
      this.loginForm.value.contactNumber &&
      this.loginForm.value.password
    ) {
      this._route.navigateByUrl('/customer/home');
      this._auth.setData();
      
    } 
  }
}
