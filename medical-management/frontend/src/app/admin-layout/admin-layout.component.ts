import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NotificationsComponent } from '../notifications/notifications.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationsComponent, FormsModule, ProfileComponent],
  template: `
    <div class="admin-container">
      <!-- Top Navigation -->
      <nav class="top-navbar">
        <div class="navbar-left">
          <div class="company-name" [class.company-logo]="!sidebarOpen">
            <span *ngIf="sidebarOpen">C2CAS Admin</span>
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
              <div class="profile-initials">AP</div>
            </button>
            
            <div class="dropdown-menu" *ngIf="showProfile">
              <div class="profile-info">
                <div class="profile-avatar">AP</div>
                <div class="profile-details">
                  <div class="profile-name">Alexander Pierce</div>
                  <div class="profile-title">Plant Engineer</div>
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
          <div class="user-avatar">AP</div>
          <div class="user-info" *ngIf="sidebarOpen">
            <div class="user-name">Dr. Alexander Pierce</div>
            <div class="availability">
              <span class="status-dot"></span>
              Available
            </div>
          </div>
        </div>

        <div class="menu-title" *ngIf="sidebarOpen">MAIN NAVIGATION</div>
        <ul class="menu-list">
          <li>
            <button class="menu-item" routerLink="/admin/dashboard" routerLinkActive="active">
              <i class="fas fa-dashboard"></i>
              <span class="menu-text" *ngIf="sidebarOpen">Dashboard</span>
            </button>
          </li>
          <li>
            <button class="menu-item" routerLink="/admin/users" routerLinkActive="active">
              <i class="fas fa-users"></i>
              <span class="menu-text" *ngIf="sidebarOpen">Users</span>
            </button>
          </li>
          <li>
            <button class="menu-item" routerLink="/admin/settings" routerLinkActive="active">
              <i class="fas fa-cog"></i>
              <span class="menu-text" *ngIf="sidebarOpen">Settings</span>
            </button>
          </li>
        </ul>
      </div>

      <!-- Main Content -->
      <div class="main-content" [class.main-content-expanded]="!sidebarOpen">
        <main class="page-content">
          <router-outlet></router-outlet>
        </main>
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

    /* Dropdown Styles */
    .notification-dropdown,
    .profile-dropdown {
      position: relative;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 0.5rem;
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      min-width: 300px;
      z-index: 1000;
      border: 1px solid #e2e8f0;
    }

    .dropdown-header {
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .dropdown-header h3 {
      margin: 0;
      font-size: 1rem;
      color: #1e293b;
    }

    .mark-all-read {
      background: none;
      border: none;
      color: #3b82f6;
      font-size: 0.875rem;
      cursor: pointer;
    }

    .mark-all-read:hover {
      color: #2563eb;
    }

    .notification-list {
      max-height: 400px;
      overflow-y: auto;
    }

    .notification-item {
      padding: 1rem;
      display: flex;
      gap: 1rem;
      border-bottom: 1px solid #e2e8f0;
      transition: background-color 0.2s;
    }

    .notification-item:hover {
      background-color: #f8fafc;
    }

    .notification-item.unread {
      background-color: #eff6ff;
    }

    .notification-icon {
      width: 40px;
      height: 40px;
      background-color: #dbeafe;
      color: #3b82f6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .notification-content {
      flex: 1;
    }

    .notification-text {
      margin: 0 0 0.25rem 0;
      color: #1e293b;
      font-size: 0.875rem;
    }

    .notification-time {
      color: #64748b;
      font-size: 0.75rem;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: #1e293b;
      text-decoration: none;
      transition: all 0.2s;
    }

    .dropdown-item:hover {
      background-color: #f8fafc;
      color: #3b82f6;
    }

    .dropdown-item i {
      width: 1rem;
      color: #64748b;
    }

    .dropdown-item:hover i {
      color: #3b82f6;
    }

    .dropdown-divider {
      height: 1px;
      background-color: #e2e8f0;
      margin: 0.5rem 0;
    }

    /* Statistics Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .stat-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .stat-info {
      flex: 1;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .stat-info h3 {
      color: #6b7280;
      font-size: 0.875rem;
      margin: 0;
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      background-color: #406e8d;
      color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    /* Table Section */
    .table-section {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .search-box {
      position: relative;
      width: 300px;
    }

    .search-box i {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
    }

    .search-box input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 0.875rem;
    }

    .search-box input:focus {
      outline: none;
      border-color: #406e8d;
    }

    .add-user-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      background-color: #406e8d;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .add-user-btn:hover {
      background-color: #345a77;
    }

    .table-container {
      overflow-x: auto;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      background-color: #f9fafb;
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      color: #374151;
      font-size: 0.875rem;
    }

    .data-table td {
      padding: 1rem;
      border-top: 1px solid #e5e7eb;
      color: #4b5563;
      font-size: 0.875rem;
    }

    .user-cell {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      background-color: #406e8d;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .user-info {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-weight: 500;
      color: #1f2937;
    }

    .user-id {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .status-badge.active {
      background-color: #dcfce7;
      color: #16a34a;
    }

    .status-badge.inactive {
      background-color: #fee2e2;
      color: #dc2626;
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }

    .action-btn.edit {
      background-color: #e0f2fe;
      color: #0369a1;
    }

    .action-btn.edit:hover {
      background-color: #bae6fd;
    }

    .action-btn.delete {
      background-color: #fee2e2;
      color: #dc2626;
    }

    .action-btn.delete:hover {
      background-color: #fecaca;
    }

    /* Profile View Styles */
    .profile-view {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .profile-content {
      background: white;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .profile-header {
      padding: 1rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .profile-body {
      padding: 1.5rem;
    }

    .profile-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .info-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .info-group label {
      font-weight: 600;
      color: #666;
    }

    /* Change Password View Styles */
    .change-password-view {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .change-password-content {
      background: white;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .change-password-header {
      padding: 1rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .change-password-body {
      padding: 1.5rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #666;
    }

    .form-group input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      color: #666;
    }

    .close-btn:hover {
      color: #333;
    }
  `]
})
export class AdminLayoutComponent {
  sidebarOpen = true;
  showNotifications = false;
  showProfile = false;
  unreadNotifications = 3;
  currentPage = 'Dashboard';
  searchQuery = '';
  showProfileView = false;
  showChangePassword = false;
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(private router: Router) {}

  // Sample data for the table
  users = [
    {
      id: 'USR001',
      name: 'John Doe',
      initials: 'JD',
      role: 'Doctor',
      email: 'john.doe@example.com',
      status: 'Active'
    },
    {
      id: 'USR002',
      name: 'Jane Smith',
      initials: 'JS',
      role: 'Nurse',
      email: 'jane.smith@example.com',
      status: 'Active'
    },
    {
      id: 'USR003',
      name: 'Mike Johnson',
      initials: 'MJ',
      role: 'Pharmacy Staff',
      email: 'mike.johnson@example.com',
      status: 'Inactive'
    }
  ];

  get filteredUsers() {
    if (!this.searchQuery) return this.users;
    const query = this.searchQuery.toLowerCase();
    return this.users.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  }

  onSearch() {
    // Additional search logic if needed
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
    this.router.navigate(['/profile']);
    this.showProfile = false;
  }

  navigateToChangePassword() {
    this.router.navigate(['/admin/change-password']);
    this.showProfile = false;
  }

  logout() {
    // Implement logout logic here
    console.log('Logout clicked');
    this.router.navigate(['/login']);
    this.showProfile = false;
  }

  onChangePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // TODO: Implement password change logic
    this.showChangePassword = false;
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
} 