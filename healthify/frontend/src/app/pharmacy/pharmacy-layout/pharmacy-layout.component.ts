import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-pharmacy-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationsComponent, FormsModule],
  template: `
    <div class="admin-container">
      <!-- Top Navigation -->
      <nav class="top-navbar">
        <div class="navbar-left">
          <div class="company-name" [class.company-logo]="!sidebarOpen">
            <span *ngIf="sidebarOpen">C2CAS Pharmacy</span>
            <img *ngIf="!sidebarOpen" src="assets/images/logo-sml.jpg" alt="C2CAS Logo" class="logo-image">
          </div>
          <button class="menu-toggle" (click)="toggleSidebar()">
            <i class="fas fa-bars"></i>
          </button>
        </div>
        <div class="dashboard-title">{{currentPage}}</div>
        <div class="navbar-right">
          <!-- Notifications -->
          <div class="notification-bell" (click)="toggleNotifications()">
            <i class="fas fa-bell"></i>
            <span class="notification-badge" *ngIf="unreadNotifications > 0">
              {{unreadNotifications}}
            </span>
            <app-notifications 
              *ngIf="showNotifications" 
              (closeDropdown)="closeNotifications()"
            ></app-notifications>
          </div>

          <!-- Profile -->
          <div class="profile-dropdown">
            <button class="profile-button" (click)="toggleProfile()">
              <div class="profile-initials">Ph</div>
            </button>
            
            <div class="dropdown-menu" *ngIf="showProfile">
              <div class="profile-info">
                <div class="profile-avatar">Ph</div>
                <div class="profile-details">
                  <div class="profile-name">Pharmacist</div>
                  <div class="profile-title">Pharmacy Staff</div>
                  <div class="member-since">Member since Nov 2022</div>
                </div>
              </div>
              
              <div class="dropdown-divider"></div>
              
              <button class="dropdown-item" (click)="navigateToProfile()">
                <i class="fas fa-user"></i>
                Profile
              </button>
              <button class="dropdown-item" (click)="navigateToChangePassword()">
                <i class="fas fa-key"></i>
                Change Password
              </button>
              <button class="dropdown-item" (click)="logout()">
                <i class="fas fa-sign-out-alt"></i>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Sidebar -->
      <div class="sidebar" [class.sidebar-closed]="!sidebarOpen">
        <div class="user-profile">
          <div class="user-avatar">Ph</div>
          <div class="user-info" *ngIf="sidebarOpen">
            <div class="user-name">Ph. Alexander Pierce</div>
            <div class="availability">
              <span class="status-dot"></span>
              Available
            </div>
          </div>
        </div>

        <div class="menu-title" *ngIf="sidebarOpen">MAIN NAVIGATION</div>
        <ul class="menu-list">
          <li>
            <a class="menu-item" routerLink="dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" data-tooltip="Dashboard">
              <i class="fas fa-dashboard"></i>
              <span class="menu-text" *ngIf="sidebarOpen">Dashboard</span>
            </a>
          </li>
          <li>
            <a class="menu-item" routerLink="inventory" routerLinkActive="active" data-tooltip="Inventory">
              <i class="fas fa-boxes"></i>
              <span class="menu-text" *ngIf="sidebarOpen">Inventory</span>
            </a>
          </li>
          <li>
            <a class="menu-item" routerLink="prescriptions" routerLinkActive="active" data-tooltip="Prescriptions">
              <i class="fas fa-prescription"></i>
              <span class="menu-text" *ngIf="sidebarOpen">Prescriptions</span>
            </a>
          </li>
          <li>
            <a class="menu-item" routerLink="requested-medicines" routerLinkActive="active" data-tooltip="Requested Medicines">
              <i class="fas fa-pills"></i>
              <span class="menu-text" *ngIf="sidebarOpen">Requested Medicines</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Main Content -->
      <div class="main-content" [class.main-content-expanded]="!sidebarOpen">
        <main class="page-content">
          <router-outlet></router-outlet>
        </main>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="copyright">Copyright © 2025. All rights reserved.</div>
        <div class="powered-by">Powered by SYNLOG</div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    /* Top Navigation Styles */
    .top-navbar {
      background-color: #406e8d;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1001;
      height: 64px;
    }

    .navbar-left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .company-name {
      font-size: 1.5rem;
      font-weight: 600;
      color: white;
      transition: all 0.3s ease;
      margin-right: 0.5rem;
      display: flex;
      align-items: center;
    }

    .company-logo {
      font-size: 1.5rem;
      color: #3498db;
      background-color: #f8f9fa;
      padding: 0.5rem;
      border-radius: 8px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .logo-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 8px;
    }

    .menu-toggle {
      font-size: 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      color: white;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .menu-toggle:hover {
      color: rgba(255, 255, 255, 0.8);
    }

    .dashboard-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: white;
    }

    .navbar-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    /* Notification Bell */
    .notification-bell {
      position: relative;
      cursor: pointer;
      padding: 0.5rem;
      color: #666;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #f3f4f6;
    }

    .notification-bell:hover {
      color: #333;
      background-color: #e5e7eb;
    }

    .notification-bell i {
      font-size: 1.25rem;
    }

    .notification-badge {
      position: absolute;
      top: 0;
      right: 0;
      background-color: #ff4444;
      color: white;
      font-size: 0.75rem;
      font-weight: bold;
      min-width: 18px;
      height: 18px;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      transform: translate(25%, -25%);
    }

    /* Profile Dropdown */
    .profile-dropdown {
      position: relative;
    }

    .profile-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .profile-initials {
      width: 40px;
      height: 40px;
      background-color: #FFFFFF;
      color: #222d32;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 0.5rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      min-width: 240px;
      z-index: 1000;
    }

    .profile-info {
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .profile-avatar {
      width: 48px;
      height: 48px;
      background-color: #FFFFFF;
      color: #222d32;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.4rem;
    }

    .profile-details {
      flex: 1;
    }

    .profile-name {
      font-weight: bold;
      color: #333;
      margin-bottom: 0.25rem;
    }

    .profile-title {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }

    .member-since {
      color: #999;
      font-size: 0.8rem;
    }

    .dropdown-divider {
      height: 1px;
      background-color: #eee;
      margin: 0.5rem 0;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      width: 100%;
      border: none;
      background: none;
      color: #333;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .dropdown-item:hover {
      background-color: #f5f5f5;
      color: #3b82f6;
    }

    .dropdown-item i {
      width: 20px;
      color: #666;
    }

    .dropdown-item:hover i {
      color: #3b82f6;
    }

    /* Sidebar Styles */
    .sidebar {
      width: 250px;
      height: calc(100vh - 64px);
      background-color: #222d32;
      color: #FFFFFF !important;
      padding: 1rem;
      transition: all 0.3s ease;
      position: fixed;
      left: 0;
      top: 64px;
      z-index: 1000;
    }

    .sidebar-closed {
      width: 70px;
      padding: 1rem 0.5rem;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 1.5rem;
    }

    .sidebar-closed .user-profile {
      justify-content: center;
      padding: 0.5rem 0;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      background-color: #FFFFFF;
      color: #222d32;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 1.1rem;
      flex-shrink: 0;
    }

    .user-info {
      flex: 1;
      min-width: 0;
    }

    .user-name {
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #FFFFFF !important;
    }

    .availability {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #FFFFFF !important;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      background-color: #2ecc71;
      border-radius: 50%;
      animation: blink 2s infinite;
      flex-shrink: 0;
    }

    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0.4; }
      100% { opacity: 1; }
    }

    .menu-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: #95a5a6;
      padding: 0.5rem 0;
      margin-bottom: 0.5rem;
      letter-spacing: 0.05em;
    }

    .menu-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .menu-item {
      width: 100%;
      padding: 0.75rem 1rem;
      background: none;
      border: none;
      color: #FFFFFF !important;
      text-align: left;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.2s;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .sidebar-closed .menu-item {
      padding: 0.75rem;
      justify-content: center;
    }

    .menu-item i {
      font-size: 1.25rem;
      width: 24px;
      text-align: center;
      color: #FFFFFF !important;
    }

    .menu-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #FFFFFF !important;
    }

    .menu-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .menu-item.active {
      background-color: #406e8d;
      color: #FFFFFF !important;
      font-weight: 500;
    }

    .menu-item.active i {
      color: #FFFFFF !important;
    }

    .sidebar-closed .menu-item .menu-text {
      display: none;
    }

    .sidebar-closed .menu-item {
      position: relative;
    }

    .sidebar-closed .menu-item::before {
      content: attr(data-tooltip);
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      background: #1e293b;
      color: #fff;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 13px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
      margin-left: 8px;
      z-index: 1000;
    }

    .sidebar-closed .menu-item:hover::before {
      opacity: 1;
    }

    /* Main Content Styles */
    .main-content {
      flex: 1;
      margin-left: 250px;
      transition: margin-left 0.3s ease;
      width: calc(100% - 250px);
      display: flex;
      flex-direction: column;
    }

    .main-content-expanded {
      margin-left: 70px;
      width: calc(100% - 70px);
    }

    .page-content {
      padding: 1.5rem;
      background-color: #f3f4f6;
      min-height: calc(100vh - 64px);
      margin-top: 64px;
    }

    /* Footer Styles */
    .footer {
      background: #fff;
      padding: 1rem 2rem;
      border-top: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #666;
      font-size: 0.9rem;
      position: fixed;
      bottom: 0;
      left: 250px;
      right: 0;
      z-index: 1000;
      transition: left 0.3s ease;
    }

    .main-content-expanded .footer {
      left: 70px;
    }

    .copyright {
      color: #666;
    }

    .powered-by {
      color: #406e8d;
      font-weight: 500;
    }
  `]
})
export class PharmacyLayoutComponent implements OnInit {
  sidebarOpen = true;
  showNotifications = false;
  showProfile = false;
  unreadNotifications = 3;
  currentPage = 'Dashboard';

  constructor(private router: Router) {
    console.log('PharmacyLayoutComponent constructor');
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('Navigation event:', event);
      this.updateCurrentPage(event.url);
    });
  }

  ngOnInit(): void {
    console.log('PharmacyLayoutComponent ngOnInit');
    this.updateCurrentPage(this.router.url);
  }

  updateCurrentPage(url: string) {
    console.log('Updating current page for URL:', url);
    const path = url.split('/').pop() || 'dashboard';
    this.currentPage = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    console.log('Current page updated to:', this.currentPage);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    this.showProfile = false;
  }

  closeNotifications() {
    this.showNotifications = false;
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
    this.showNotifications = false;
  }

  navigateToProfile() {
    this.router.navigate(['/dashboard-pharmacy/profile']);
    this.showProfile = false;
  }

  navigateToChangePassword() {
    this.router.navigate(['/dashboard-pharmacy/change-password']);
    this.showProfile = false;
  }

  logout() {
    this.router.navigate(['/login']);
    this.showProfile = false;
  }
} 