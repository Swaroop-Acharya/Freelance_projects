import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PatientsComponent } from './patients/patients.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { BillingComponent } from './billing/billing.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { UsersComponent } from './admin/users/users.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { DoctorLayoutComponent } from './doctor/doctor-layout/doctor-layout.component';
import { DashboardDoctorComponent } from './dashboard-doctor/dashboard-doctor.component';
import { MedicineRequestComponent } from './medicine-request/medicine-request.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { DoctorNotesComponent } from './doctor-notes/doctor-notes.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'billing', component: BillingComponent }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'dashboard-doctor',
    component: DoctorLayoutComponent,
    children: [
      { path: '', component: DashboardDoctorComponent },
      { path: 'medicine-request', component: MedicineRequestComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'profile', component: ProfileViewComponent }
    ]
  },
  {
    path: 'doctor-appointments',
    component: DoctorLayoutComponent,
    children: [
      { path: 'appointments', component: DoctorAppointmentsComponent },
      { path: 'doctor-notes/:id', component: DoctorNotesComponent }
    ]
  },
  {
    path: 'dashboard-pharmacy',
    loadChildren: () => import('./pharmacy/pharmacy.module').then(m => m.PharmacyModule)
  }
];
