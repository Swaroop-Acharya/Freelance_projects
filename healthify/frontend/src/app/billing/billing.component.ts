import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface BillingRecord {
  id: number;
  billId: string;
  patientName: string;
  date: string;
  amount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
  paymentMethod: string;
  description: string;
  doctor: string;
  showDropdown?: boolean;
}

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  protected Math = Math;

  statusOptions = [
    { value: 'Paid', icon: 'fa-check-circle', color: '#166534', bgColor: '#dcfce7' },
    { value: 'Pending', icon: 'fa-clock', color: '#92400e', bgColor: '#fef3c7' },
    { value: 'Overdue', icon: 'fa-exclamation-circle', color: '#991b1b', bgColor: '#fee2e2' }
  ];

  billingRecords: BillingRecord[] = [
    {
      id: 1,
      billId: 'BILL001',
      patientName: 'John Doe',
      date: '2024-03-15',
      amount: 150.00,
      paymentStatus: 'Paid',
      paymentMethod: 'Credit Card',
      description: 'Consultation Fee',
      doctor: 'Dr. Smith',
      showDropdown: false
    },
    {
      id: 2,
      billId: 'BILL002',
      patientName: 'Jane Smith',
      date: '2024-03-16',
      amount: 200.00,
      paymentStatus: 'Pending',
      paymentMethod: 'Cash',
      description: 'Lab Tests',
      doctor: 'Dr. Johnson',
      showDropdown: false
    }
  ];

  // Modal states
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  selectedRecord: BillingRecord | null = null;
  recordToDelete: BillingRecord | null = null;

  // Form models
  newRecord: BillingRecord = {
    id: 0,
    billId: '',
    patientName: '',
    date: '',
    amount: 0,
    paymentStatus: 'Pending',
    paymentMethod: '',
    description: '',
    doctor: '',
    showDropdown: false
  };

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  searchText = '';

  // Dropdown options
  paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'Insurance', 'Online Payment'];
  doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown'];

  // Computed properties
  get filteredRecords(): BillingRecord[] {
    return this.billingRecords.filter(record => 
      record.billId.toLowerCase().includes(this.searchText.toLowerCase()) ||
      record.patientName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      record.doctor.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  get paginatedRecords(): BillingRecord[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredRecords.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredRecords.length / this.itemsPerPage);
  }

  constructor() {}

  ngOnInit(): void {}

  // Modal methods
  openAddModal(): void {
    this.showAddModal = true;
    this.resetRecordForm();
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.resetRecordForm();
  }

  openEditModal(record: BillingRecord): void {
    this.selectedRecord = { ...record };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedRecord = null;
  }

  openDeleteModal(record: BillingRecord): void {
    this.recordToDelete = record;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.recordToDelete = null;
  }

  // Form methods
  resetRecordForm(): void {
    this.newRecord = {
      id: 0,
      billId: '',
      patientName: '',
      date: '',
      amount: 0,
      paymentStatus: 'Pending',
      paymentMethod: '',
      description: '',
      doctor: '',
      showDropdown: false
    };
  }

  addRecord(): void {
    if (this.newRecord.billId && this.newRecord.patientName) {
      const newId = Math.max(...this.billingRecords.map(r => r.id)) + 1;
      this.billingRecords.push({
        ...this.newRecord,
        id: newId,
        showDropdown: false
      });
      this.closeAddModal();
    }
  }

  updateRecord(): void {
    if (this.selectedRecord) {
      const index = this.billingRecords.findIndex(r => r.id === this.selectedRecord?.id);
      if (index !== -1) {
        this.billingRecords[index] = { ...this.selectedRecord, showDropdown: false };
        this.closeEditModal();
      }
    }
  }

  deleteRecord(record: BillingRecord): void {
    this.openDeleteModal(record);
  }

  confirmDelete(): void {
    if (this.recordToDelete) {
      this.billingRecords = this.billingRecords.filter(r => r.id !== this.recordToDelete?.id);
      this.closeDeleteModal();
    }
  }

  // Pagination methods
  onPageChange(page: number): void {
    this.currentPage = page;
  }

  // Status dropdown methods
  toggleStatusDropdown(record: BillingRecord) {
    this.billingRecords.forEach(r => {
      if (r !== record) r.showDropdown = false;
    });
    record.showDropdown = !record.showDropdown;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.status-dropdown')) {
      this.billingRecords.forEach(record => record.showDropdown = false);
    }
  }

  getStatusIcon(status: string): string {
    const option = this.statusOptions.find(opt => opt.value === status);
    return option ? option.icon : 'fa-clock';
  }
  getStatusColor(status: string): string {
    const option = this.statusOptions.find(opt => opt.value === status);
    return option ? option.color : '#92400e';
  }
  getStatusBgColor(status: string): string {
    const option = this.statusOptions.find(opt => opt.value === status);
    return option ? option.bgColor : '#fef3c7';
  }
  updateStatus(record: BillingRecord, newStatus: string) {
    record.paymentStatus = newStatus as BillingRecord['paymentStatus'];
    record.showDropdown = false;
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
} 