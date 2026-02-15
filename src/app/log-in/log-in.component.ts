import { Component, input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-log-in',
  imports: [FormsModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  constructor(private http : ApiService,private route: Router,private auth : AuthService){
    
  }


  logIn(inputs : NgForm){

      if(inputs.value.phoneNumber == "" || inputs.value.password == ""){
                    const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: "Fill all fields!"
              });
      }
      else {
                this.http.postt("https://rentcar.stepprojects.ge/api/Users/login", {
          phoneNumber : inputs.value.phoneNumber,
          password : inputs.value.password,
          // email : "",
          // firstName : "",
          // lastName : "",
          // role : ""
        })
        .subscribe({
          next: resp => {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "successfully Logged in"
              });
              this.auth.login()

              localStorage.setItem("token", (resp as any).token)
    
              setTimeout(() => {
                
                this.route.navigateByUrl("/main")
               
              }, 1500);
    
              console.log(resp);
              
          },
          error: err => console.log(err.message)
          
        })
      }

  }
}
