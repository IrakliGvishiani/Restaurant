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
    this.updateCartTotal()
  }
  decreaseQuantity(item: any){
    if(item.quantity > 1){
      item.quantity--
      this.updateCartTotal()
    }
  }



  getProducts(){
        this.api.gett("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .subscribe({
      next: (resp:any) => {
        this.productsArray = resp
        this.updateCartTotal()
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
                this.updateCartTotal()
                
      },
      error: err => console.log(err)
      
    })
  }
  


  cartTotal: number = 0

  updateCartTotal(){
    this.cartTotal = this.productsArray.reduce((sum,item) => {
      return sum + (item.product.price * item.quantity);
    },0)
  }
  productsArray: Cart[] = [] 
}
