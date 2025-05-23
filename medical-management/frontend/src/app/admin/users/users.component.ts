import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  lastActive: string;
  dob?: string;
  address?: string;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="users-container">
      <div class="header-section">
        <h2 class="page-title">Users</h2>
        <button class="add-user-btn" (click)="openAddModal()">
          <i class="fas fa-plus"></i>
          Add User
        </button>
      </div>

      <div class="stats-grid">
        <!-- Total Users -->
        <div class="stat-card">
          <div class="stat-logo">
            <img src="assets/images/total-staff.png" alt="Total Users">
          </div>
          <div class="stat-content">
            <h3 class="stat-title">Total Users</h3>
            <p class="stat-value">120</p>
          </div>
        </div>

        <!-- Total Doctors -->
        <div class="stat-card">
          <div class="stat-logo">
            <img src="assets/images/doctors-icon.png" alt="Doctors">
          </div>
          <div class="stat-content">
            <h3 class="stat-title">Total Doctors</h3>
            <p class="stat-value">45</p>
          </div>
        </div>

        <!-- Total Nurses -->
        <div class="stat-card">
          <div class="stat-logo">
            <img src="assets/images/nurse-icon.png" alt="Nurses">
          </div>
          <div class="stat-content">
            <h3 class="stat-title">Total Nurses</h3>
            <p class="stat-value">78</p>
          </div>
        </div>

        <!-- Total Pharmacies -->
        <div class="stat-card">
          <div class="stat-logo">
            <img src="assets/images/pharmacy-icon.png" alt="Pharmacies">
          </div>
          <div class="stat-content">
            <h3 class="stat-title">Total Pharmacies</h3>
            <p class="stat-value">12</p>
          </div>
        </div>
      </div>

      <div class="table-container">
        <div class="table-header">
          <div class="entries-info">
            Show
            <select class="entries-select" [(ngModel)]="itemsPerPage" (change)="onPageChange(1)">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            entries
          </div>
          <div class="search-box">
            <input type="text" 
                   placeholder="Search:" 
                   class="search-input"
                   [(ngModel)]="searchTerm"
                   (ngModelChange)="onSearch()">
          </div>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Active Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of paginatedUsers; let i = index">
              <td>{{ (currentPage - 1) * itemsPerPage + i + 1 }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.role }}</td>
              <td>
                <span [ngClass]="user.status === 'Available' ? 'status-available' : 'status-unavailable'">
                  {{ user.status }}
                </span>
              </td>
              <td>{{ user.lastActive }}</td>
              <td class="actions-cell">
                <button class="action-btn view" title="View" (click)="openViewModal(user)">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" title="Edit" (click)="openEditModal(user)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" title="Delete" (click)="confirmDelete(user)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="table-footer">
          <div class="showing-entries">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to 
            {{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }} 
            of {{ filteredUsers.length }} entries
          </div>
          <div class="pagination">
            <button [disabled]="currentPage === 1" (click)="onPageChange(currentPage - 1)">
              Previous
            </button>
            <button *ngFor="let page of [].constructor(totalPages); let i = index"
                    [class.active]="currentPage === i + 1"
                    (click)="onPageChange(i + 1)">
              {{ i + 1 }}
            </button>
            <button [disabled]="currentPage === totalPages" (click)="onPageChange(currentPage + 1)">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- View Modal -->
    <div class="modal" *ngIf="showViewModal" (click)="closeViewModal($event)">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>View User Details</h2>
          <button class="close-btn" (click)="closeViewModal($event)">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="detail-row">
            <span class="detail-label">Name:</span>
            <span class="detail-value">{{selectedUser?.name}}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Email:</span>
            <span class="detail-value">{{selectedUser?.email}}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Phone:</span>
            <span class="detail-value">{{selectedUser?.phone}}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Role:</span>
            <span class="detail-value">{{selectedUser?.role}}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Status:</span>
            <span class="detail-value" [ngClass]="selectedUser?.status === 'Available' ? 'status-available' : 'status-unavailable'">
              {{selectedUser?.status}}
            </span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Last Active:</span>
            <span class="detail-value">{{selectedUser?.lastActive}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div class="modal" *ngIf="showEditModal" (click)="closeEditModal($event)">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Edit User Details</h2>
          <button class="close-btn" (click)="closeEditModal($event)">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form (ngSubmit)="onSubmit()" #editForm="ngForm">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" name="name" [(ngModel)]="editUser.name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" [(ngModel)]="editUser.email" required>
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="tel" id="phone" name="phone" [(ngModel)]="editUser.phone" required>
            </div>
            <div class="form-group">
              <label for="role">Role</label>
              <select id="role" name="role" [(ngModel)]="editUser.role" required>
                <option value="Admin">Admin</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Pharmacy">Pharmacy</option>
              </select>
            </div>
            <div class="form-group">
              <label for="status">Status</label>
              <select id="status" name="status" [(ngModel)]="editUser.status" required>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="reset-btn" (click)="resetForm()">Reset</button>
              <button type="submit" class="submit-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal" *ngIf="showDeleteModal" (click)="closeDeleteModal($event)">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Confirm Delete</h2>
          <button class="close-btn" (click)="closeDeleteModal($event)">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this user?</p>
          <div class="modal-footer">
            <button type="button" class="reset-btn" (click)="closeDeleteModal($event)">Cancel</button>
            <button type="button" class="delete-btn" (click)="deleteUser()">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <div class="modal" *ngIf="showAddModal" (click)="closeAddModal($event)">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Add User</h2>
          <button class="close-btn" (click)="closeAddModal($event)">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form (ngSubmit)="onAddSubmit()" #addForm="ngForm">
            <div class="form-group">
              <label for="newName">Name</label>
              <input type="text" id="newName" name="name" [(ngModel)]="newUser.name" required>
            </div>
            <div class="form-group">
              <label for="newPhone">Phone Number</label>
              <input type="tel" id="newPhone" name="phone" [(ngModel)]="newUser.phone" required>
            </div>
            <div class="form-group">
              <label for="newEmail">Email Address</label>
              <input type="email" id="newEmail" name="email" [(ngModel)]="newUser.email" required>
            </div>
            <div class="form-group">
              <label for="newRole">Role</label>
              <select id="newRole" name="role" [(ngModel)]="newUser.role" required>
                <option value="">Select</option>
                <option value="Admin">Admin</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Pharmacy">Pharmacy</option>
              </select>
            </div>
            <div class="form-group">
              <label for="newDob">DOB</label>
              <input type="date" id="newDob" name="dob" [(ngModel)]="newUser.dob" required>
            </div>
            <div class="form-group">
              <label for="newAddress">Address</label>
              <textarea id="newAddress" name="address" [(ngModel)]="newUser.address" rows="3" required></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="reset-btn" (click)="resetAddForm()">Reset</button>
              <button type="submit" class="submit-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .users-container {
      padding: 1.5rem;
    }

    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .page-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1f2937;
      margin: 0;
    }

    .add-user-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background-color: #16a34a;
      color: white;
      border: none;
      border-radius: 2rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .add-user-btn:hover {
      background-color: #15803d;
    }

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
      display: flex;
      align-items: center;
      gap: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
      position: relative;
      overflow: hidden;
    }

    .stat-card:hover {
      transform: translateY(-2px);
    }

    .stat-logo {
      width: 80px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }

    /* Total Users - Dark Blue */
    .stat-card:nth-child(1) .stat-logo {
      background-color: #1a75ff;
    }

    /* Total Doctors - Dark Red */
    .stat-card:nth-child(2) .stat-logo {
      background-color: #ff3333;
    }

    /* Total Nurses - Dark Green */
    .stat-card:nth-child(3) .stat-logo {
      background-color: #33cc33;
    }

    /* Total Pharmacies - Dark Orange */
    .stat-card:nth-child(4) .stat-logo {
      background-color: #ff9933;
    }

    .stat-logo img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: brightness(0) invert(1);
    }

    .stat-content {
      flex: 1;
      margin-left: 100px;
    }

    .stat-title {
      color: #6b7280;
      font-size: 0.875rem;
      margin: 0 0 0.5rem 0;
    }

    .stat-value {
      color: #1f2937;
      font-size: 1.75rem;
      font-weight: 600;
      margin: 0;
    }

    .table-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .entries-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #6b7280;
    }

    .entries-select {
      border: 1px solid #d1d5db;
      border-radius: 4px;
      padding: 0.25rem 0.5rem;
      color: #374151;
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .search-input {
      border: 1px solid #d1d5db;
      border-radius: 4px;
      padding: 0.5rem;
      color: #374151;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      background-color: #f9fafb;
      color: #374151;
      font-weight: 600;
      text-align: left;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .data-table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #e5e7eb;
      color: #4b5563;
    }

    .status-available {
      color: #059669;
      font-weight: 500;
    }

    .status-unavailable {
      color: #dc2626;
      font-weight: 500;
    }

    .actions-cell {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-start;
      align-items: center;
      min-width: 100px;
    }

    .action-btn {
      padding: 0.5rem;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
    }

    .action-btn i {
      font-size: 1rem;
    }

    .action-btn.view {
      background-color: #e0f2fe;
      color: #0369a1;
    }

    .action-btn.edit {
      background-color: #e0f2fe;
      color: #0369a1;
    }

    .action-btn.delete {
      background-color: #fee2e2;
      color: #dc2626;
    }

    .action-btn:hover {
      opacity: 0.9;
      transform: scale(1.05);
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }

    .table-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-top: 1px solid #e5e7eb;
    }

    .showing-entries {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .pagination {
      display: flex;
      gap: 0.5rem;
    }

    .pagination button {
      padding: 0.5rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background-color: white;
      color: #374151;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.875rem;
    }

    .pagination button:hover:not(:disabled) {
      background-color: #f3f4f6;
    }

    .pagination button.active {
      background-color: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .pagination button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: white;
      border-radius: 8px;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
      background-color: #406e8d;
      border-radius: 8px 8px 0 0;
    }

    .modal-header h2 {
      margin: 0;
      color: white;
      font-size: 1.25rem;
      font-weight: 500;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.25rem;
      color: white;
      cursor: pointer;
      padding: 0.5rem;
      opacity: 0.8;
      transition: opacity 0.2s;
    }

    .close-btn:hover {
      opacity: 1;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .detail-row {
      display: flex;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .detail-row:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .detail-label {
      width: 120px;
      color: #6b7280;
      font-weight: 500;
    }

    .detail-value {
      flex: 1;
      color: #1f2937;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #374151;
      font-weight: 500;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
    }

    .form-group textarea {
      resize: vertical;
      min-height: 80px;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    .reset-btn,
    .submit-btn {
      padding: 0.75rem 1.5rem;
      border-radius: 0.375rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .reset-btn {
      background-color: #f3f4f6;
      color: #374151;
      border: 1px solid #d1d5db;
    }

    .reset-btn:hover {
      background-color: #e5e7eb;
    }

    .submit-btn {
      background-color: #16a34a;
      color: white;
      border: none;
    }

    .submit-btn:hover {
      background-color: #15803d;
    }

    .delete-btn {
      background-color: #dc2626;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 0.375rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .delete-btn:hover {
      background-color: #b91c1c;
    }
  `]
})
export class UsersComponent {
  protected Math = Math;
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm = '';
  filteredUsers: User[] = [];
  showAddModal = false;
  showViewModal = false;
  showEditModal = false;
  showDeleteModal = false;
  selectedUser: User | null = null;
  editUser: User = {
    name: '',
    email: '',
    phone: '',
    role: '',
    status: '',
    lastActive: ''
  };
  newUser: User = {
    name: '',
    email: '',
    phone: '',
    role: '',
    status: 'Available',
    lastActive: new Date().toLocaleString(),
    dob: '',
    address: ''
  };

  constructor() {
    this.filteredUsers = [...this.users];
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = [...this.users];
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower) ||
        user.status.toLowerCase().includes(searchLower)
      );
    }
    this.currentPage = 1;
  }

  openViewModal(user: User) {
    this.selectedUser = user;
    this.showViewModal = true;
  }

  closeViewModal(event: Event) {
    event.preventDefault();
    this.showViewModal = false;
    this.selectedUser = null;
  }

  openEditModal(user: User) {
    this.selectedUser = user;
    this.editUser = { ...user };
    this.showEditModal = true;
  }

  closeEditModal(event: Event) {
    event.preventDefault();
    this.showEditModal = false;
    this.selectedUser = null;
    this.editUser = {
      name: '',
      email: '',
      phone: '',
      role: '',
      status: '',
      lastActive: ''
    };
  }

  confirmDelete(user: User) {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  closeDeleteModal(event: Event) {
    event.preventDefault();
    this.showDeleteModal = false;
    this.selectedUser = null;
  }

  deleteUser() {
    if (this.selectedUser) {
      const index = this.users.findIndex(u => u.email === this.selectedUser?.email);
      if (index !== -1) {
        this.users.splice(index, 1);
        this.onSearch(); // Refresh the filtered list
      }
    }
    this.closeDeleteModal(new Event('delete'));
  }

  resetForm() {
    if (this.selectedUser) {
      this.editUser = { ...this.selectedUser };
    }
  }

  onSubmit() {
    if (this.selectedUser) {
      const index = this.users.findIndex(u => u.email === this.selectedUser?.email);
      if (index !== -1) {
        this.users[index] = { ...this.editUser };
        this.onSearch(); // Refresh the filtered list
      }
    }
    this.closeEditModal(new Event('submit'));
  }

  openAddModal() {
    console.log('Opening add modal'); // Debug log
    this.showAddModal = true;
  }

  closeAddModal(event: Event) {
    event.preventDefault();
    this.showAddModal = false;
    this.resetAddForm();
  }

  resetAddForm() {
    this.newUser = {
      name: '',
      email: '',
      phone: '',
      role: '',
      status: 'Available',
      lastActive: new Date().toLocaleString(),
      dob: '',
      address: ''
    };
  }

  onAddSubmit() {
    console.log('Submitting new user:', this.newUser); // Debug log
    this.users.push({ ...this.newUser });
    this.onSearch(); // Refresh the filtered list
    this.closeAddModal(new Event('submit'));
  }

  users = [
    {
      name: 'John thamos',
      email: 'johnthamos11@gmail.com',
      phone: '+11 4567770089',
      role: 'Doctor',
      status: 'Available',
      lastActive: '12 April 11:30AM'
    },
    {
      name: 'John thamos',
      email: 'johnthamos11@gmail.com',
      phone: '+11 4567770089',
      role: 'Pharmacy',
      status: 'Unavailable',
      lastActive: '12 April 11:30AM'
    },
    {
      name: 'Shiva',
      email: 'johnthamos11@gmail.com',
      phone: '+11 4567770089',
      role: 'Nurse',
      status: 'Available',
      lastActive: '12 April 11:30AM'
    },
    {
      name: 'Yashoda',
      email: 'johnthamos11@gmail.com',
      phone: '+11 4567770089',
      role: 'Doctor',
      status: 'Unavailable',
      lastActive: '12 April 11:30AM'
    },
    {
      name: 'Sreekanth',
      email: 'johnthamos11@gmail.com',
      phone: '+11 4567770089',
      role: 'Nurse',
      status: 'Available',
      lastActive: '12 April 11:30AM'
    },
    {
      name: 'Ravi',
      email: 'johnthamos11@gmail.com',
      phone: '+11 4567770089',
      role: 'Admin',
      status: 'Unavailable',
      lastActive: '12 April 11:30AM'
    },
    {
      name: 'Vivek',
      email: 'johnthamos11@gmail.com',
      phone: '+11 4567770089',
      role: 'Admin',
      status: 'Available',
      lastActive: '12 April 11:30AM'
    },
    {
      name: 'John thamos',
      email: 'johnthamos11@gmail.com',
      phone: '+11 4567770089',
      role: 'Doctor',
      status: 'Unavailable',
      lastActive: '12 April 11:30AM'
    },
    {
      name: 'John thamos',
      email: 'johnthamos11@gmail.com',
      phone: '+11 4567770089',
      role: 'Admin',
      status: 'Available',
      lastActive: '12 April 11:30AM'
    },
    {
      name: 'John thamos',
      email: 'johnthamos11@gmail.com',
      phone: '+11 4567770089',
      role: 'Doctor',
      status: 'Unavailable',
      lastActive: '12 April 11:30AM'
    }
  ];
} 