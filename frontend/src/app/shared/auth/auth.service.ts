import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setData(){
    sessionStorage.setItem('isLogin','true')
  }

  getData(){
    return sessionStorage.getItem('isLogin')
  }

  remove(){
    sessionStorage.clear()
  }

}
