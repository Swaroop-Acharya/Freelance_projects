import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DoctorSchedulesComponent } from '../doctor-schedules/doctor-schedules.component';
import { PatientsComponent } from '../patients/patients.component';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage.service';

interface UserProfile {
  fullName: string;
  employeeCode: string;
  email: string;
  roleName: string;
  oldPassword: string | null;
  newPassword: string | null;
}

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
    NotificationsComponent
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  sidebarOpen = false;
  activeTab = 'dashboard';
  showProfileDropdown = false;
  showProfileView = false;
  showNotifications = false;
  unreadNotifications = 5;
  currentRoute = '';
  private baseUrl = 'http://localhost:8081';
  userProfile: UserProfile = {
    fullName: '',
    employeeCode: '',
    email: '',
    roleName: '',
    oldPassword: null,
    newPassword: null
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  ngOnInit() {
    this.fetchUserProfile();
  }

  private getHeaders() {
    const token = this.storageService.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  fetchUserProfile() {
    const headers = this.getHeaders();
    this.http.get<UserProfile>(`${this.baseUrl}/nurse/profile`, { headers })
      .subscribe({
        next: (profile) => {
          this.userProfile = profile;
        },
        error: (error) => {
          console.error('Error fetching user profile:', error);
        }
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
    const token = this.storageService.getItem('token');
    if (token) {
      // Call the backend logout endpoint
      this.http.post(`${this.baseUrl}/auth/logout`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).subscribe({
        next: () => {
          this.storageService.removeItem('token');
          this.router.navigate(['/login']);
        },
        error: () => {
          // Even if the backend call fails, we should still clear local storage and redirect
          this.storageService.removeItem('token');
          this.router.navigate(['/login']);
        }
      });
    } else {
      // If no token exists, just redirect to login
      this.router.navigate(['/login']);
    }
    this.showProfileDropdown = false;
  }

  goBack() {
    this.showProfileView = false;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }
}
