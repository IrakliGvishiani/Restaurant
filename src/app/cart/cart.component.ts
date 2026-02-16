import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Cart } from '../models/cart-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(private api: ApiService){

  }

  ngOnInit(){
    this.getProducts()
  }

  getProducts(){
        this.api.gett("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .subscribe({
      next: (resp:any) => {
        this.productsArray = resp
      },
      error: err => console.log(err)
      
    })
  }
  

  removeFromCart(id:number){
    this.api.deletee(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`)
    .subscribe({
      next: resp => {
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
                  icon: "success",
                 title: "Product removed from cart"
                });

               this.getProducts()
                console.log(resp);
                
      },
      error: err => console.log(err)
      
    })
  }

  productsArray: Cart[] = [] 
}
