import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacyLayoutComponent } from './pharmacy-layout/pharmacy-layout.component';
import { DashboardPharmacyComponent } from './dashboard-pharmacy/dashboard-pharmacy.component';
import { PharmacyPrescriptionComponent } from './pharmacy-prescription/pharmacy-prescription.component';
import { PharmacyInventoryComponent } from './pharmacy-inventory/pharmacy-inventory.component';
import { PharmacyRequestedMedicinesComponent } from './pharmacy-requested-medicines/pharmacy-requested-medicines.component';
import { InventoryComponent } from './inventory/inventory.component';
import { PharmacyProfileComponent } from './pharmacy-profile/pharmacy-profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: PharmacyLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardPharmacyComponent
      },
      {
        path: 'inventory',
        component: InventoryComponent
      },
      {
        path: 'prescriptions',
        component: PharmacyPrescriptionComponent
      },
      {
        path: 'requested-medicines',
        component: PharmacyRequestedMedicinesComponent
      },
      {
        path: 'profile',
        component: PharmacyProfileComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyRoutingModule {} 