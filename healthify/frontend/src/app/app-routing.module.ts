import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard-pharmacy',
    pathMatch: 'full'
  },
  {
    path: 'dashboard-pharmacy',
    loadChildren: () => import('./pharmacy/pharmacy.module').then(m => m.PharmacyModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {} 