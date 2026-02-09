import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../header/services/api.service';
import Swal from 'sweetalert2'
import { Route, Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private http : ApiService,private route : Router){

  }

  register(inputs : NgForm){
    this.http.postt("https://rentcar.stepprojects.ge/api/Users/register", {
      phoneNumber : inputs.value.phoneNumber,
      password : inputs.value.password,
      email : inputs.value.email,
      firstName : inputs.value.firstName,
      lastName : inputs.value.lastName,
      role : "Default"
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
            title: "successfully Created Account"
          });

          setTimeout(() => {
            this.route.navigateByUrl("/log-in")
          }, 1500);

          console.log(resp);
          
      },
      error: err => console.log(err)
      
    })
  }
}
