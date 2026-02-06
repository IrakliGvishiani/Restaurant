import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public route: Router){

  }


  isScrolled = false

 @HostListener('window:scroll',[])
 onWindowScroll() {
  this.isScrolled = window.scrollY > 0
 }

  show = false


 
  toggleMenu(){
    this.show = !this.show
  }

  closeMenu(){
    this.show = false
  }

  goToRegister(){
  this.route.navigateByUrl('/register')
}

}




  // isScrolled = false;

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   this.isScrolled = window.scrollY > 0;
  // }