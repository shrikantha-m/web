import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EarlyAccessComponent } from './pages/early-access/early-access.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'early-access', component: EarlyAccessComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect any unknown routes to home
];
