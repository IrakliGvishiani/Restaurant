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
        path: '**',
        component: ErrorComponent
    }
];
