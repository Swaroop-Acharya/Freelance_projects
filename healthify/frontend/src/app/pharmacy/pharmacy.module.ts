import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { PharmacyLayoutComponent } from './pharmacy-layout/pharmacy-layout.component';
import { DashboardPharmacyComponent } from './dashboard-pharmacy/dashboard-pharmacy.component';
import { PharmacyPrescriptionComponent } from './pharmacy-prescription/pharmacy-prescription.component';
import { PharmacyInventoryComponent } from './pharmacy-inventory/pharmacy-inventory.component';
import { PharmacyRequestedMedicinesComponent } from './pharmacy-requested-medicines/pharmacy-requested-medicines.component';
import { InventoryComponent } from './inventory/inventory.component';
import { PharmacyProfileComponent } from './pharmacy-profile/pharmacy-profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    PharmacyRoutingModule,
    PharmacyLayoutComponent,
    DashboardPharmacyComponent,
    PharmacyPrescriptionComponent,
    PharmacyInventoryComponent,
    PharmacyRequestedMedicinesComponent,
    InventoryComponent,
    PharmacyProfileComponent,
    ChangePasswordComponent
  ],
  exports: [
    PharmacyLayoutComponent,
    DashboardPharmacyComponent,
    PharmacyPrescriptionComponent,
    PharmacyInventoryComponent,
    PharmacyRequestedMedicinesComponent,
    PharmacyProfileComponent,
    ChangePasswordComponent
  ]
})
export class PharmacyModule {
  constructor() {
    console.log('PharmacyModule initialized');
  }
} 