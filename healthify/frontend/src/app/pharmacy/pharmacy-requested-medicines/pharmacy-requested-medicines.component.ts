import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface MedicineRequest {
  id: number;
  medicineName: string;
  quantity: number;
  purpose: string;
  priority: string;
  status: string;
  requestedDate: string;
}

@Component({
  selector: 'app-pharmacy-requested-medicines',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="medicine-request-container">
      <div class="page-header">
        <h2>Medicine Requests</h2>
      </div>

      <!-- Request History -->
      <div class="history-section">
        <div class="table-header">
          <div class="entries-selector">
            <span>Show</span>
            <select [(ngModel)]="entriesPerPage" (change)="onEntriesChange()">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>entries</span>
          </div>
          <div class="search-filter-container">
            <div class="search-box">
              <input type="text" placeholder="Search..." [(ngModel)]="searchQuery" (input)="onSearch()">
              <button class="search-btn">
                <i class="fas fa-search"></i>
              </button>
            </div>
            <button class="filter-btn" (click)="toggleFilterDropdown()">
              <i class="fas fa-filter"></i> Filter
            </button>
            <div class="filter-dropdown" *ngIf="showFilterDropdown">
              <div class="filter-section">
                <label>Urgency</label>
                <select [(ngModel)]="selectedUrgency" (change)="applyFilters()">
                  <option value="">All</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div class="filter-section">
                <label>Status</label>
                <select [(ngModel)]="selectedStatus" (change)="applyFilters()">
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Medicine</th>
                <th>Quantity</th>
                <th>Urgency</th>
                <th>Reason</th>
                <th>Requested On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let request of filteredRequests; let i = index">
                <td>{{i + 1}}</td>
                <td>{{request.medicineName}}</td>
                <td>{{request.quantity}}</td>
                <td>
                  <select [(ngModel)]="request.priority" (change)="updateRequest(request)" class="priority-select">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </td>
                <td>{{request.purpose}}</td>
                <td>{{request.requestedDate}}</td>
                <td>
                  <select [(ngModel)]="request.status" (change)="updateRequest(request)" class="status-select">
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="action-btn view" (click)="viewRequest(request)">
                      <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" (click)="editRequest(request)">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" (click)="cancelRequest(request)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table-footer">
          <div class="entries-info">
            {{paginationInfo}}
          </div>
          <div class="pagination">
            <button class="pagination-btn" [disabled]="currentPage === 1" (click)="previousPage()">
              Previous
            </button>
            <button class="pagination-btn" [class.active]="currentPage === 1" (click)="goToPage(1)">1</button>
            <button class="pagination-btn" [class.active]="currentPage === 2" (click)="goToPage(2)">2</button>
            <button class="pagination-btn" [disabled]="currentPage === totalPages" (click)="nextPage()">
              Next
            </button>
          </div>
        </div>
      </div>

      <!-- View Request Modal -->
      <div class="modal" *ngIf="showViewModal" (click)="closeViewModal($event)">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Medicine Request Details</h3>
            <button class="close-btn" (click)="closeViewModal($event)">×</button>
          </div>
          <div class="modal-body" *ngIf="selectedRequest">
            <div class="detail-row">
              <span class="label">Medicine:</span>
              <span class="value">{{selectedRequest.medicineName}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Quantity:</span>
              <span class="value">{{selectedRequest.quantity}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Urgency:</span>
              <span class="value">
                <span class="priority-badge" [class.high]="selectedRequest.priority === 'high'"
                      [class.medium]="selectedRequest.priority === 'medium'"
                      [class.low]="selectedRequest.priority === 'low'">
                  {{selectedRequest.priority}}
                </span>
              </span>
            </div>
            <div class="detail-row">
              <span class="label">Reason:</span>
              <span class="value">{{selectedRequest.purpose}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Requested On:</span>
              <span class="value">{{selectedRequest.requestedDate}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Status:</span>
              <span class="value">
                <span class="status-badge" [class.pending]="selectedRequest.status === 'Pending'"
                      [class.approved]="selectedRequest.status === 'Approved'"
                      [class.rejected]="selectedRequest.status === 'Rejected'">
                  {{selectedRequest.status}}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .medicine-request-container {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 2rem);
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .page-header h2 {
      margin: 0;
      font-size: 1.5rem;
      color: #1f2937;
      font-weight: 600;
    }

    /* History Section */
    .history-section {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      flex: 1;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .entries-selector {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #4b5563;
      font-size: 0.875rem;
    }

    .entries-selector select {
      padding: 0.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-size: 0.875rem;
      color: #1f2937;
      background-color: white;
    }

    .search-filter-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      position: relative;
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .search-box input {
      padding: 0.5rem 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-size: 0.875rem;
      width: 200px;
    }

    .search-box input:focus {
      outline: none;
      border-color: #406e8d;
    }

    .search-btn {
      padding: 0.5rem 1rem;
      background-color: #406e8d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .search-btn:hover {
      background-color: #345a77;
    }

    .filter-btn {
      padding: 0.5rem 1rem;
      background-color: #f3f4f6;
      color: #374151;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }

    .filter-btn:hover {
      background-color: #e5e7eb;
    }

    .filter-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 0.5rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 1rem;
      min-width: 200px;
      z-index: 1000;
    }

    .filter-section {
      margin-bottom: 1rem;
    }

    .filter-section:last-child {
      margin-bottom: 0;
    }

    .filter-section label {
      display: block;
      margin-bottom: 0.5rem;
      color: #374151;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .filter-section select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-size: 0.875rem;
      color: #1f2937;
      background-color: white;
    }

    .filter-section select:focus {
      outline: none;
      border-color: #406e8d;
    }

    /* Table Styles */
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
      border-bottom: 2px solid #e5e7eb;
    }

    .data-table td {
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
      color: #4b5563;
      font-size: 0.875rem;
    }

    .data-table tr:hover {
      background-color: #f9fafb;
    }

    .priority-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .priority-badge.high {
      background-color: #fee2e2;
      color: #dc2626;
    }

    .priority-badge.medium {
      background-color: #fef3c7;
      color: #d97706;
    }

    .priority-badge.low {
      background-color: #dcfce7;
      color: #16a34a;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .status-badge.pending {
      background-color: #fef3c7;
      color: #d97706;
    }

    .status-badge.approved {
      background-color: #dcfce7;
      color: #16a34a;
    }

    .status-badge.rejected {
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

    .action-btn.view {
      background-color: #e0f2fe;
      color: #0369a1;
    }

    .action-btn.view:hover {
      background-color: #bae6fd;
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

    /* Modal Styles */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: white;
      border-radius: 8px;
      width: 100%;
      max-width: 500px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .modal-header {
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h3 {
      margin: 0;
      font-size: 1.25rem;
      color: #1f2937;
      font-weight: 600;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #6b7280;
      cursor: pointer;
      padding: 0.5rem;
      line-height: 1;
    }

    .close-btn:hover {
      color: #374151;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .detail-row {
      display: flex;
      margin-bottom: 1rem;
    }

    .detail-row:last-child {
      margin-bottom: 0;
    }

    .label {
      width: 120px;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .value {
      flex: 1;
      color: #1f2937;
      font-size: 0.875rem;
    }

    .priority-select, .status-select {
      padding: 0.25rem 0.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-size: 0.875rem;
      color: #1f2937;
      background-color: white;
      cursor: pointer;
      min-width: 100px;
    }

    .priority-select:focus, .status-select:focus {
      outline: none;
      border-color: #406e8d;
    }

    .priority-select option[value="high"] {
      color: #dc2626;
    }

    .priority-select option[value="medium"] {
      color: #d97706;
    }

    .priority-select option[value="low"] {
      color: #16a34a;
    }

    .status-select option[value="Pending"] {
      color: #d97706;
    }

    .status-select option[value="Approved"] {
      color: #16a34a;
    }

    .status-select option[value="Rejected"] {
      color: #dc2626;
    }

    .table-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
    }

    .entries-info {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .pagination {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .pagination-btn {
      padding: 0.5rem 1rem;
      border: 1px solid #e5e7eb;
      background-color: white;
      color: #374151;
      border-radius: 4px;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .pagination-btn:hover:not(:disabled) {
      background-color: #f3f4f6;
      border-color: #d1d5db;
    }

    .pagination-btn.active {
      background-color: #406e8d;
      color: white;
      border-color: #406e8d;
    }

    .pagination-btn:disabled {
      background-color: #f3f4f6;
      color: #9ca3af;
      cursor: not-allowed;
    }
  `]
})
export class PharmacyRequestedMedicinesComponent implements OnInit {
  searchQuery = '';
  entriesPerPage = '10';
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  Math = Math;
  showFilterDropdown = false;
  selectedUrgency = '';
  selectedStatus = 'pending';
  showViewModal = false;
  selectedRequest: MedicineRequest | null = null;

  requests: MedicineRequest[] = [
    {
      id: 1,
      medicineName: 'Amoxicilin 500mg',
      quantity: 100,
      purpose: 'Low stock, high demand for respiratory infections',
      priority: 'high',
      status: 'Pending',
      requestedDate: '24-05-2025'
    },
    {
      id: 2,
      medicineName: 'Atorvastatin 20mg',
      quantity: 50,
      purpose: 'Regular stock replenishment',
      priority: 'medium',
      status: 'Approved',
      requestedDate: '25-05-2025'
    },
    {
      id: 3,
      medicineName: 'Insulin Glargine',
      quantity: 20,
      purpose: 'Essential for diabetic patients',
      priority: 'high',
      status: 'Rejected',
      requestedDate: '21-05-2025'
    },
    {
      id: 4,
      medicineName: 'Albuterol Inhaler',
      quantity: 30,
      purpose: 'Increased asthma cases expected',
      priority: 'medium',
      status: 'Pending',
      requestedDate: '21-05-2025'
    },
    {
      id: 5,
      medicineName: 'Metformin 500mg',
      quantity: 200,
      purpose: 'Regular diabetes medication',
      priority: 'low',
      status: 'Pending',
      requestedDate: '22-05-2025'
    },
    {
      id: 6,
      medicineName: 'Omeprazole 20mg',
      quantity: 75,
      purpose: 'Gastrointestinal medication',
      priority: 'medium',
      status: 'Approved',
      requestedDate: '23-05-2025'
    },
    {
      id: 7,
      medicineName: 'Amlodipine 5mg',
      quantity: 60,
      purpose: 'Blood pressure medication',
      priority: 'high',
      status: 'Pending',
      requestedDate: '24-05-2025'
    },
    {
      id: 8,
      medicineName: 'Cetirizine 10mg',
      quantity: 100,
      purpose: 'Allergy medication',
      priority: 'low',
      status: 'Approved',
      requestedDate: '25-05-2025'
    },
    {
      id: 9,
      medicineName: 'Azithromycin 500mg',
      quantity: 40,
      purpose: 'Antibiotic for infections',
      priority: 'high',
      status: 'Pending',
      requestedDate: '26-05-2025'
    },
    {
      id: 10,
      medicineName: 'Pantoprazole 40mg',
      quantity: 50,
      purpose: 'Acid reflux medication',
      priority: 'medium',
      status: 'Rejected',
      requestedDate: '27-05-2025'
    },
    {
      id: 11,
      medicineName: 'Losartan 50mg',
      quantity: 80,
      purpose: 'Blood pressure control',
      priority: 'medium',
      status: 'Pending',
      requestedDate: '28-05-2025'
    },
    {
      id: 12,
      medicineName: 'Montelukast 10mg',
      quantity: 60,
      purpose: 'Asthma prevention',
      priority: 'high',
      status: 'Approved',
      requestedDate: '29-05-2025'
    }
  ];

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get paginationInfo(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    return `Showing ${start} to ${end} of ${this.totalItems} entries`;
  }

  onEntriesChange() {
    this.itemsPerPage = parseInt(this.entriesPerPage);
    this.currentPage = 1;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onSearch() {
    this.currentPage = 1;
  }

  applyFilters() {
    this.currentPage = 1;
  }

  toggleFilterDropdown() {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  get filteredRequests() {
    let filtered = this.requests;
    
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(request => 
        request.medicineName.toLowerCase().includes(query) ||
        request.purpose.toLowerCase().includes(query)
      );
    }

    if (this.selectedUrgency) {
      filtered = filtered.filter(request => 
        request.priority.toLowerCase() === this.selectedUrgency.toLowerCase()
      );
    }

    if (this.selectedStatus) {
      filtered = filtered.filter(request => 
        request.status.toLowerCase() === this.selectedStatus.toLowerCase()
      );
    }

    // Update total items count
    this.totalItems = filtered.length;

    // Calculate pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  }

  ngOnInit() {
    console.log('Pharmacy requested medicines component initialized');
  }

  viewRequest(request: MedicineRequest) {
    this.selectedRequest = request;
    this.showViewModal = true;
  }

  closeViewModal(event: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.showViewModal = false;
    this.selectedRequest = null;
  }

  editRequest(request: MedicineRequest) {
    console.log('Edit request:', request);
    // TODO: Implement edit functionality
  }

  cancelRequest(request: MedicineRequest) {
    console.log('Cancel request:', request);
    // TODO: Implement cancel functionality
  }

  updateRequest(request: MedicineRequest) {
    console.log('Updating request:', request);
    // TODO: Implement API call to update the request
  }
} 