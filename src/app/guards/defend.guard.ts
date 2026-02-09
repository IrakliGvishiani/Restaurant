import { CanActivateFn } from '@angular/router';

export const defendGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem("token")){
    return false;
  }
  else return true;
};
