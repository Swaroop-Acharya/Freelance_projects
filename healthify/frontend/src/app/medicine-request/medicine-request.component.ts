import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage.service';

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
  selector: 'app-medicine-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="medicine-request-container">
      <div class="page-header">
        <h2>Medicine Requests</h2>
        <button class="new-request-btn" (click)="openNewRequestModal()">
          <i class="fas fa-plus"></i>
          Request New Medicine
        </button>
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
          <div class="search-box">
            <input type="text" placeholder="Search..." [(ngModel)]="searchQuery" (input)="onSearch()">
            <button class="search-btn">
              <i class="fas fa-search"></i>
            </button>
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
                  <span class="priority-badge" [class.high]="request.priority === 'high'"
                        [class.medium]="request.priority === 'medium'"
                        [class.low]="request.priority === 'low'">
                    {{request.priority}}
                  </span>
                </td>
                <td>{{request.purpose}}</td>
                <td>{{request.requestedDate}}</td>
                <td>
                  <span class="status-badge" [class.pending]="request.status === 'Pending'"
                        [class.approved]="request.status === 'Approved'"
                        [class.rejected]="request.status === 'Rejected'">
                    {{request.status}}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="action-btn edit" (click)="viewRequest(request)">
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
            Showing {{(currentPage - 1) * itemsPerPage + 1}} to {{Math.min(currentPage * itemsPerPage, totalItems)}} of {{totalItems}} entries
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

      <!-- New Request Modal -->
      <div class="modal-overlay" *ngIf="showNewRequestModal" (click)="closeNewRequestModal($event)">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Request New Medicine</h2>
            <button class="close-btn" (click)="closeNewRequestModal($event)">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="submitNewRequest()" #newRequestForm="ngForm">
              <div class="form-group">
                <label for="newMedicineName">Medicine Name</label>
                <input type="text" id="newMedicineName" name="newMedicineName" 
                       [(ngModel)]="newMedicineRequest.medicineName" required
                       placeholder="Enter full medicine name with strength"
                       #medicineName="ngModel">
                <div class="error-message" *ngIf="medicineName.invalid && (medicineName.dirty || medicineName.touched)">
                  Medicine name is required
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="newQuantity">Quantity</label>
                  <input type="number" id="newQuantity" name="newQuantity" 
                         [(ngModel)]="newMedicineRequest.quantity" required min="1"
                         placeholder="Enter quantity"
                         #quantity="ngModel">
                  <div class="error-message" *ngIf="quantity.invalid && (quantity.dirty || quantity.touched)">
                    Valid quantity is required
                  </div>
                </div>

                <div class="form-group">
                  <label for="newPriority">Urgency Level</label>
                  <select id="newPriority" name="newPriority" [(ngModel)]="newMedicineRequest.priority" required
                          #priority="ngModel">
                    <option value="">Select</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <div class="error-message" *ngIf="priority.invalid && (priority.dirty || priority.touched)">
                    Urgency level is required
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="newPurpose">Reason for Request</label>
                <textarea id="newPurpose" name="newPurpose" 
                          [(ngModel)]="newMedicineRequest.purpose" required rows="3"
                          placeholder="Enter reason for request"
                          #purpose="ngModel"></textarea>
                <div class="error-message" *ngIf="purpose.invalid && (purpose.dirty || purpose.touched)">
                  Reason is required
                </div>
              </div>

              <div class="form-actions">
                <button type="button" class="reset-btn" (click)="resetNewRequestForm()">Reset</button>
                <button type="submit" class="submit-btn">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .medicine-request-container {
      padding: 1.5rem;
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

    .new-request-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      background-color: #22c55e;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .new-request-btn:hover {
      background-color: #16a34a;
    }

    .new-request-btn i {
      font-size: 1rem;
    }

    /* History Section */
    .history-section {
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
    .modal-overlay {
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
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #406e8d;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 1.25rem;
      color: white;
    }

    .close-btn {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 0.5rem;
      font-size: 1.25rem;
      transition: color 0.2s;
    }

    .close-btn:hover {
      color: #e5e7eb;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #374151;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 0.875rem;
      transition: border-color 0.2s;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #406e8d;
    }

    .form-group input::placeholder,
    .form-group textarea::placeholder {
      color: #9ca3af;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    .reset-btn {
      padding: 0.75rem 1.5rem;
      background-color: #f3f4f6;
      color: #374151;
      border: none;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .reset-btn:hover {
      background-color: #e5e7eb;
    }

    .submit-btn {
      padding: 0.75rem 1.5rem;
      background-color: #22c55e;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .submit-btn:hover:not(:disabled) {
      background-color: #16a34a;
    }

    .submit-btn:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
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

    .form-row {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .form-row .form-group {
      flex: 1;
      margin-bottom: 0;
    }

    .error-message {
      color: #dc2626;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }

    .form-group input.ng-invalid.ng-touched,
    .form-group select.ng-invalid.ng-touched,
    .form-group textarea.ng-invalid.ng-touched {
      border-color: #dc2626;
    }
  `]
})
export class MedicineRequestComponent implements OnInit {
  searchQuery = '';
  showNewRequestModal = false;
  entriesPerPage = '10';
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 4;
  Math = Math; // Make Math available in template

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  newMedicineRequest: MedicineRequest = {
    id: 0,
    medicineName: '',
    quantity: 1,
    purpose: '',
    priority: '',
    status: 'Pending',
    requestedDate: new Date().toISOString().split('T')[0]
  };

  requests: MedicineRequest[] = [
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
    }
  ];

  get filteredRequests() {
    if (!this.searchQuery) return this.requests;
    const query = this.searchQuery.toLowerCase();
    return this.requests.filter(request => 
      request.medicineName.toLowerCase().includes(query) ||
      request.purpose.toLowerCase().includes(query)
    );
  }

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.fetchSubmittedRequests();
  }

  onEntriesChange() {
    // Handle entries per page change
    console.log('Entries per page changed to:', this.entriesPerPage);
  }

  openNewRequestModal() {
    this.showNewRequestModal = true;
  }

  closeNewRequestModal(event: Event) {
    event.preventDefault();
    this.showNewRequestModal = false;
    this.resetNewRequestForm();
  }

  resetNewRequestForm() {
    this.newMedicineRequest = {
      id: 0,
      medicineName: '',
      quantity: 1,
      purpose: '',
      priority: '',
      status: 'Pending',
      requestedDate: new Date().toISOString().split('T')[0]
    };
  }

  submitNewRequest() {
    if (this.newMedicineRequest.medicineName && 
        this.newMedicineRequest.quantity && 
        this.newMedicineRequest.priority && 
        this.newMedicineRequest.purpose) {
      console.log('New medicine request submitted:', this.newMedicineRequest);
      // Here you would typically make an API call to submit the request
      this.requests.unshift(this.newMedicineRequest);
      this.closeNewRequestModal(new Event('click'));
    }
  }

  private getHeaders() {
    const token = this.storageService.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private fetchSubmittedRequests() {
    const headers = this.getHeaders();
    const baseUrl = 'http://localhost:8081/doctor/medicine-requests';

    this.http.get<MedicineRequest[]>(baseUrl, { headers })
      .subscribe({
        next: (requests) => {
          this.requests = requests;
        },
        error: (error) => {
          console.error('Error fetching submitted requests:', error);
        }
      });
  }

  onSearch() {
    // Additional search logic if needed
  }

  viewRequest(request: MedicineRequest) {
    console.log('View request:', request);
  }

  cancelRequest(request: MedicineRequest) {
    console.log('Cancel request:', request);
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
    this.currentPage = page;
  }
} 