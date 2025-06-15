import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pharmacy-prescription',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="prescription-container">
      <div class="page-header">
        <h2>Prescriptions</h2>
        <div class="header-actions">
          <div class="search-box">
            <input type="text" placeholder="Search..." [(ngModel)]="searchQuery" (input)="onSearch()">
            <button class="search-btn">
              <i class="fas fa-search"></i>
            </button>
          </div>
          <div class="date-filter">
            <input 
              type="date" 
              [(ngModel)]="selectedDate" 
              (change)="applyDateFilter()"
              class="date-input"
            >
          </div>
        </div>
      </div>

      <div class="table-container">
        <div class="table-header">
          <div class="entries-selector">
            <span>Show</span>
            <select [(ngModel)]="entriesPerPage" (change)="onEntriesPerPageChange()">
              <option [value]="10">10</option>
              <option [value]="25">25</option>
              <option [value]="50">50</option>
              <option [value]="100">100</option>
            </select>
            <span>entries</span>
          </div>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Quantity</th>
              <th>Prescriber</th>
              <th>Received At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let prescription of paginatedPrescriptions">
              <td>{{prescription.patient}}</td>
              <td>{{prescription.medication}}</td>
              <td>{{prescription.dosage}}</td>
              <td>{{prescription.quantity}}</td>
              <td>{{prescription.prescriber}}</td>
              <td>{{prescription.receivedAt | date:'mediumDate'}}</td>
              <td>
                <div class="action-buttons">
                  <button class="action-btn view" (click)="viewPrescription(prescription)" title="View">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="action-btn edit" (click)="editPrescription(prescription)" title="Edit">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="action-btn delete" (click)="deletePrescription(prescription)" title="Delete">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="table-footer">
          <div class="entries-info">
            Showing {{(currentPage - 1) * entriesPerPage + 1}} to {{Math.min(currentPage * entriesPerPage, filteredPrescriptions.length)}} of {{filteredPrescriptions.length}} entries
          </div>
          <div class="pagination">
            <button class="pagination-btn" [disabled]="currentPage === 1" (click)="onPageChange(1)">
              Previous
            </button>
            <button class="pagination-btn" [class.active]="currentPage === 1" (click)="onPageChange(1)">1</button>
            <button class="pagination-btn" [class.active]="currentPage === 2" (click)="onPageChange(2)">2</button>
            <button class="pagination-btn" [disabled]="currentPage === totalPages" (click)="onPageChange(currentPage + 1)">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Prescription View Modal -->
    <div class="modal" *ngIf="showModal" (click)="closeModal($event)">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Prescription Details</h2>
          <button class="close-button" (click)="closeModal($event)">×</button>
        </div>
        <div class="prescription-details" *ngIf="selectedPrescription">
          <div class="detail-row">
            <span class="label">Patient:</span>
            <span class="value">{{selectedPrescription.patient}}</span>
          </div>
          <div class="detail-row">
            <span class="label">Medication:</span>
            <span class="value">{{selectedPrescription.medication}}</span>
          </div>
          <div class="detail-row">
            <span class="label">Dosage:</span>
            <span class="value">{{selectedPrescription.dosage}}</span>
          </div>
          <div class="detail-row">
            <span class="label">Quantity:</span>
            <span class="value">{{selectedPrescription.quantity}}</span>
          </div>
          <div class="detail-row">
            <span class="label">Prescriber:</span>
            <span class="value">{{selectedPrescription.prescriber}}</span>
          </div>
          <div class="detail-row">
            <span class="label">Received At:</span>
            <span class="value">{{selectedPrescription.receivedAt | date:'mediumDate'}}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .prescription-container {
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

    .header-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
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

    .date-filter {
      display: flex;
      align-items: center;
    }

    .date-input {
      padding: 0.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-size: 0.875rem;
      color: #333;
      background-color: #fff;
      cursor: pointer;
      transition: border-color 0.2s;
    }

    .date-input:focus {
      outline: none;
      border-color: #406e8d;
    }

    .table-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background-color: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
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

    .table-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      padding: 1rem;
      background-color: #f9fafb;
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

    .modal-header h2 {
      margin: 0;
      font-size: 1.25rem;
      color: #1f2937;
      font-weight: 600;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #6b7280;
      cursor: pointer;
      padding: 0.5rem;
      line-height: 1;
    }

    .close-button:hover {
      color: #374151;
    }

    .prescription-details {
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
  `]
})
export class PharmacyPrescriptionComponent implements OnInit {
  searchQuery = '';
  selectedDate: string = '';
  selectedPrescription: any = null;
  showModal = false;
  currentPage = 1;
  entriesPerPage = 10;
  Math = Math; // Make Math available in template
  prescriptions = [
    { 
      patient: 'John Doe', 
      medication: 'Amoxicillin', 
      dosage: '500mg', 
      quantity: '30', 
      prescriber: 'Dr. Smith', 
      receivedAt: new Date('2024-03-15') 
    },
    { 
      patient: 'Jane Smith', 
      medication: 'Lisinopril', 
      dosage: '10mg', 
      quantity: '60', 
      prescriber: 'Dr. Johnson', 
      receivedAt: new Date('2024-03-14') 
    },
    { 
      patient: 'Mike Johnson', 
      medication: 'Metformin', 
      dosage: '1000mg', 
      quantity: '90', 
      prescriber: 'Dr. Williams', 
      receivedAt: new Date('2024-03-13') 
    },
    { 
      patient: 'Sarah Wilson', 
      medication: 'Atorvastatin', 
      dosage: '20mg', 
      quantity: '30', 
      prescriber: 'Dr. Brown', 
      receivedAt: new Date('2024-03-12') 
    },
    { 
      patient: 'David Brown', 
      medication: 'Omeprazole', 
      dosage: '20mg', 
      quantity: '60', 
      prescriber: 'Dr. Davis', 
      receivedAt: new Date('2024-03-11') 
    }
  ];
  filteredPrescriptions = [...this.prescriptions];

  get totalPages() {
    return Math.ceil(this.filteredPrescriptions.length / this.entriesPerPage);
  }

  get paginatedPrescriptions() {
    const start = (this.currentPage - 1) * this.entriesPerPage;
    const end = start + this.entriesPerPage;
    return this.filteredPrescriptions.slice(start, end);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  onEntriesPerPageChange() {
    this.currentPage = 1; // Reset to first page when changing entries per page
  }

  ngOnInit() {
    console.log('Prescription component initialized');
    // Set default date to today
    this.selectedDate = new Date().toISOString().split('T')[0];
  }

  onSearch() {
    const query = this.searchQuery.toLowerCase();
    this.filteredPrescriptions = this.prescriptions.filter(prescription => 
      prescription.patient.toLowerCase().includes(query) ||
      prescription.medication.toLowerCase().includes(query) ||
      prescription.prescriber.toLowerCase().includes(query)
    );
    this.applyDateFilter(); // Re-apply date filter after search
  }

  applyDateFilter() {
    let filtered = [...this.prescriptions];

    // Apply search filter first
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(prescription => 
        prescription.patient.toLowerCase().includes(query) ||
        prescription.medication.toLowerCase().includes(query) ||
        prescription.prescriber.toLowerCase().includes(query)
      );
    }

    // Then apply date filter
    if (this.selectedDate) {
      const selectedDate = new Date(this.selectedDate);
      selectedDate.setHours(0, 0, 0, 0);
      
      filtered = filtered.filter(prescription => {
        const prescriptionDate = new Date(prescription.receivedAt);
        prescriptionDate.setHours(0, 0, 0, 0);
        return prescriptionDate.getTime() === selectedDate.getTime();
      });
    }

    this.filteredPrescriptions = filtered;
  }

  viewPrescription(prescription: any) {
    this.selectedPrescription = prescription;
    this.showModal = true;
  }

  closeModal(event: Event) {
    this.showModal = false;
    this.selectedPrescription = null;
  }

  editPrescription(prescription: any) {
    console.log('Edit prescription:', prescription);
    // TODO: Implement edit functionality
  }

  deletePrescription(prescription: any) {
    console.log('Delete prescription:', prescription);
    // TODO: Implement delete functionality
  }
} 