import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DoctorSchedulesComponent } from '../doctor-schedules/doctor-schedules.component';
import { PatientsComponent } from '../patients/patients.component';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { BillingComponent } from '../billing/billing.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardComponent,
    DoctorSchedulesComponent,
    PatientsComponent,
    AppointmentsComponent,
    ProfileViewComponent,
    NotificationsComponent,
    BillingComponent
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  sidebarOpen = false;
  activeTab = 'dashboard';
  showProfileDropdown = false;
  showProfileView = false;
  showNotifications = false;
  unreadNotifications = 5;
  currentRoute = '';
  userProfile = {
    initials: 'AK',
    name: 'Alexander Pierce',
    title: 'Plant Engineer',
    memberSince: 'Nov 2022'
  };

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  isProfileOrChangePasswordRoute(): boolean {
    return this.currentRoute.includes('/profile') || this.currentRoute.includes('/change-password');
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  setTab(tab: string) {
    this.activeTab = tab;
    this.sidebarOpen = false;
  }

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
    if (this.showProfileDropdown) {
      this.showNotifications = false;
    }
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.showProfileDropdown = false;
    }
  }

  closeNotifications() {
    this.showNotifications = false;
  }

  viewProfile() {
    this.router.navigate(['/dashboard/profile']);
    this.showProfileDropdown = false;
  }

  changePassword() {
    this.router.navigate(['/dashboard/change-password']);
    this.showProfileDropdown = false;
  }

  signOut() {
    console.log('Sign out');
    this.showProfileDropdown = false;
  }

  goBack() {
    this.showProfileView = false;
  }
}
