import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Cart } from '../models/cart-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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



  addQuantity(item: any){
    item.quantity++

  }
  decreaseQuantity(item: any){
    if(item.quantity > 1){
      item.quantity--
    }
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
               this.getProducts()
                console.log(resp);
                
      },
      error: err => console.log(err)
      
    })
  }

  productsArray: Cart[] = [] 
}
