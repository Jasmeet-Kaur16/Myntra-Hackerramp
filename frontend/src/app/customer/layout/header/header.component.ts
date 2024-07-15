import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
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

  logOut(){
    this._auth.remove()
    this._route.navigateByUrl('/login')
  }

}
