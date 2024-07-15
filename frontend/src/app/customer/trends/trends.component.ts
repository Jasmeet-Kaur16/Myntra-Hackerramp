import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit{
  constructor(private _route: Router, private _auth:AuthService) {}
  
  isLoggedIn: boolean=false;
  
  ngOnInit(): void {
    this.checkLogin()
  }

  checkLogin(){
    if(this._auth.getData()=="true")
    {
      this.isLoggedIn=true
    }
  }
}
