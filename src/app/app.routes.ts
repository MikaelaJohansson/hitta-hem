import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'adoption', loadComponent: () => import('./components/pages/adoption/adoption.component').then(m => m.AdoptionComponent) },
  { path: 'adoption-details/:id', loadComponent: () => import('./components/pages/adoption-details/adoption-details.component').then(m => m.AdoptionDetailsComponent) },
  {path:'rehoming', loadComponent: () => import ('./components/pages/rehoming/rehoming.component').then(m => m.RehomingComponent)},
];
