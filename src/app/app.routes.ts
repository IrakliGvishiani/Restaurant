import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';

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
        loadComponent: () => import('./register/register.component').then(comp => comp.RegisterComponent)
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
