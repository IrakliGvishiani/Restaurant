import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Products } from '../models/products';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../models/category';
import Swal from 'sweetalert2';
import { Cart } from '../models/cart-model';
@Component({
  selector: 'app-main',
  imports: [CommonModule,FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(private api : ApiService){}


  ngOnInit(){

     this.showAll()



    this.api.gett('https://restaurant.stepprojects.ge/api/Categories/GetAll')
    .subscribe({
      next : (resp : any) => {
        this.categoryArr = resp
        console.log(this.categoryArr);
        
      },
      error : err => {
        console.log(err);
        
      }
    })


  }

      showAll(){
            this.api.gett('https://restaurant.stepprojects.ge/api/Products/GetAll')
    .subscribe({
      next: (resp : any) => {
      this.data = resp
      console.log(this.data);
      }
      ,
      error : err => {
        console.log(err);
        
      }
    })
    }

  filterCategory(id: number){
    this.api.gett(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`)
    .subscribe({
      next: (resp : any) => {
        // console.log(resp.products);
        this.data = resp.products
        
      },
      error: err => {
        console.log(err);
        
      }
    })
    
  }
    check = false
    check2 = false

  value: number | null = null;

onSpicinessChange(event: Event) {
  const input = event.target as HTMLInputElement;
  this.value = Number(input.value);
}

  checked(){
    // if(this.check == false){
    //   this.check = true
    // }
    // else if(this.check == true){
    //   this.check = false
    // }
    this.check = !this.check
}

  checked2(){
    //     if(this.check2 == false){
    //   this.check2 = true
    // }
    // else if(this.check2 == true){
    //   this.check2 = false
    // }

    this.check2 = !this.check2
  }


  getFiltered(){
    this.api.gett(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${this.check2}&nuts=${this.check}&spiciness=${this.value}`)
    .subscribe({
      next: (resp : any) => {
        this.data = resp
      },
      error: err => console.log(err)
      
    })
  }

  reset(){
    this.showAll()
    this.check = false
    this.check2 = false
    this.value = 0
  }


  addToCart(productID: number,price:number){



        this.api.gett("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
        .subscribe({
          next: (resp : Cart[]) => {

              const exists = resp.some(item => item.product.id === productID)
            
             if(exists){
              this.showToast("info","Product already in the cart")
             }
             else {
            this.api.postt("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
               quantity: 1,
               price: price,
               productId: productID

             }).subscribe({
           next: resp => {

           this.showToast("success","Added to cart")

           console.log(resp);
        
      },
      error: err => console.log(err)
      
    })
             }

          },
          error: () => {
            

          }
        })



  }

  showToast(icon: any , message: string){
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
          icon: icon,
         title: message
        });
  }

  data: Products[] = []
  categoryArr: Category[] = []


  
  
}

