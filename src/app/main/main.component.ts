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
  


  data: Products[] = []
  categoryArr: Category[] = []

  
  
}

