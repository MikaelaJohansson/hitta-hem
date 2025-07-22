import { Routes } from '@angular/router';
import { AdoptionComponent } from './components/pages/adoption/adoption.component';
import app from '../server';
import { AppComponent } from './app.component';
import { AdoptionDetailsComponent } from './components/pages/adoption-details/adoption-details.component';

export const routes: Routes = [
  { path: 'adoption', loadComponent: () => import('./components/pages/adoption/adoption.component').then(m => m.AdoptionComponent) },
  { path: 'adoption-details/:id', loadComponent: () => import('./components/pages/adoption-details/adoption-details.component').then(m => m.AdoptionDetailsComponent) }
];
