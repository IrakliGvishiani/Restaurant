import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 

    this.checkStatus()
  }

  isAuthorized = signal(false)

  checkStatus(){
    let token = localStorage.getItem("token")
    if(token){
      this.isAuthorized.set(true)
    }
  }

  login(){
    this.isAuthorized.set(true)
  }

  logout(){
    this.isAuthorized.set(false)
  }
}
