import { Routes } from '@angular/router';
import { AdoptionComponent } from './components/pages/adoption/adoption.component';
import { AdoptionDetailsComponent } from './components/pages/adoption-details/adoption-details.component';
import { RehomingComponent } from './components/pages/rehoming/rehoming.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';

export const routes: Routes = [
  {path:'', redirectTo:'Home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:"adoption", component:AdoptionComponent },
  {path:'adoption-details/:id', component:AdoptionDetailsComponent},
  {path:'rehoming', component:RehomingComponent},
  {path:'about', component:AboutComponent},
  {path:'**', redirectTo:'home'}
];
