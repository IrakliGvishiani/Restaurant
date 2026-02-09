import { Component, effect, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { routes } from '../app.routes';
import { AuthService } from './services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public route: Router,private auth : AuthService){
    
  }


  isScrolled = false

 @HostListener('window:scroll',[])
 onWindowScroll() {
  this.isScrolled = window.scrollY > 0
 }

  show = false

 isAuth = () => this.auth.isAuthorized()
 
  toggleMenu(){
    this.show = !this.show
  }

  closeMenu(){
    this.show = false
  }

  logOut(){
    Swal.fire({
  title: "Log Out",
  text: "Are you sure you want to log out?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes!"
}).then((result) => {
  if (result.isConfirmed) {
    localStorage.removeItem("token")
    this.auth.logout()
    window.location.reload()
  }
});
  }

//   goToRegister(){
//   this.route.navigateByUrl('/register')
// }

  active = "activ"
}




  // isScrolled = false;

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   this.isScrolled = window.scrollY > 0;
  // }