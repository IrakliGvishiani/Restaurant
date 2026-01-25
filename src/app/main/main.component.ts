import { Component } from '@angular/core';
import { ApiService } from '../header/services/api.service';
import { Products } from '../../models/products';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category';

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

  data: Products[] = []
  categoryArr: Category[] = []

  
  
  
}

