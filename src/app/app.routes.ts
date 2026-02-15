import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { authGuard } from './guards/auth.guard';
import { defendGuard } from './guards/defend.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'

    },
    {
        path: 'main',
        loadComponent: () => import('./main/main.component').then(comp => comp.MainComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(comp => comp.RegisterComponent),
        canActivate: [defendGuard]
    },
    {
        path: 'log-in',
        loadComponent: () => import("./log-in/log-in.component").then(comp => comp.LogInComponent),
        canActivate: [defendGuard]
    },
    {
         path: 'cart',
        loadComponent: () => import("./cart/cart.component").then(comp => comp.CartComponent),
        canActivate: [authGuard]
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
