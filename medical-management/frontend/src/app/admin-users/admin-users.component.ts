import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-users">
      <div class="header">
        <h1>User Management</h1>
        <button class="add-user-btn">
          <i class="fas fa-plus"></i>
          Add User
        </button>
      </div>

      <div class="search-bar">
        <div class="search-input">
          <i class="fas fa-search"></i>
          <input type="text" 
                 placeholder="Search users..." 
                 [(ngModel)]="searchTerm"
                 (ngModelChange)="onSearch()">
        </div>
        <div class="filters">
          <select [(ngModel)]="roleFilter" (ngModelChange)="onSearch()">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
            <option value="staff">Staff</option>
          </select>
          <select [(ngModel)]="statusFilter" (ngModelChange)="onSearch()">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div class="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of filteredUsers">
              <td>
                <div class="user-info">
                  <div class="user-avatar">{{user.name[0]}}</div>
                  <div>
                    <div class="user-name">{{user.name}}</div>
                    <div class="user-id">ID: {{user.id}}</div>
                  </div>
                </div>
              </td>
              <td>{{user.email}}</td>
              <td>
                <span class="role-badge" [ngClass]="user.role.toLowerCase()">
                  {{user.role}}
                </span>
              </td>
              <td>
                <span class="status-badge" [ngClass]="user.status.toLowerCase()">
                  {{user.status}}
                </span>
              </td>
              <td>{{user.lastLogin}}</td>
              <td>
                <div class="actions">
                  <button class="action-btn edit">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="action-btn delete">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .admin-users {
      padding: 1rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    h1 {
      color: #1f2937;
      margin: 0;
    }

    .add-user-btn {
      background-color: #16a34a;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .add-user-btn:hover {
      background-color: #15803d;
    }

    .search-bar {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .search-input {
      flex: 1;
      position: relative;
    }

    .search-input i {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
    }

    .search-input input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 0.875rem;
    }

    .filters {
      display: flex;
      gap: 1rem;
    }

    .filters select {
      padding: 0.75rem 2rem 0.75rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      background-color: white;
      cursor: pointer;
    }

    .users-table {
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      background-color: #f9fafb;
      padding: 1rem;
      text-align: left;
      font-weight: 500;
      color: #4b5563;
      font-size: 0.875rem;
    }

    td {
      padding: 1rem;
      border-top: 1px solid #e5e7eb;
      color: #1f2937;
      font-size: 0.875rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      background-color: #406e8d;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }

    .user-name {
      font-weight: 500;
    }

    .user-id {
      color: #6b7280;
      font-size: 0.75rem;
    }

    .role-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .role-badge.admin {
      background-color: #fef3c7;
      color: #92400e;
    }

    .role-badge.doctor {
      background-color: #dbeafe;
      color: #1e40af;
    }

    .role-badge.staff {
      background-color: #f3f4f6;
      color: #1f2937;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .status-badge.active {
      background-color: #dcfce7;
      color: #166534;
    }

    .status-badge.inactive {
      background-color: #fee2e2;
      color: #991b1b;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 0.375rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .action-btn.edit {
      background-color: #dbeafe;
      color: #1e40af;
    }

    .action-btn.edit:hover {
      background-color: #bfdbfe;
    }

    .action-btn.delete {
      background-color: #fee2e2;
      color: #991b1b;
    }

    .action-btn.delete:hover {
      background-color: #fecaca;
    }
  `]
})
export class AdminUsersComponent {
  users = [
    {
      id: 'USR001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-02-20 10:30'
    },
    {
      id: 'USR002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Doctor',
      status: 'Active',
      lastLogin: '2024-02-20 09:15'
    },
    {
      id: 'USR003',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'Staff',
      status: 'Inactive',
      lastLogin: '2024-02-19 16:45'
    }
  ];

  searchTerm = '';
  roleFilter = '';
  statusFilter = '';
  filteredUsers: User[] = [];

  constructor() {
    this.filteredUsers = [...this.users];
  }

  onSearch() {
    const searchLower = this.searchTerm.toLowerCase();
    const roleLower = this.roleFilter.toLowerCase();
    const statusLower = this.statusFilter.toLowerCase();

    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = !this.searchTerm || 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.id.toLowerCase().includes(searchLower);

      const matchesRole = !this.roleFilter || 
        user.role.toLowerCase() === roleLower;

      const matchesStatus = !this.statusFilter || 
        user.status.toLowerCase() === statusLower;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }
} 