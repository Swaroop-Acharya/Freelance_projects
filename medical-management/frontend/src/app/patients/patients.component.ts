import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Patient {
  id: number;
  name: string;
  age: number;
  phoneNumber: string;
  bookingId: string;
  waitingNo: string;
  status: 'Pending' | 'Confirmed' | 'Arrived' | 'Started' | 'Billing' | 'No Show';
  category: 'Consultation' | 'Followup';
  appointmentTime: string;
  showDropdown: boolean;
}

interface Form {
  id: number;
  name: string;
  isSelected: boolean;
}

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  // Add Math property to make it available in template
  protected Math = Math;

  statusOptions = [
    { value: 'Pending', icon: 'fa-clock', color: '#92400e', bgColor: '#fef3c7' },
    { value: 'Confirmed', icon: 'fa-check-circle', color: '#166534', bgColor: '#dcfce7' },
    { value: 'Arrived', icon: 'fa-user-check', color: '#1e40af', bgColor: '#dbeafe' },
    { value: 'Started', icon: 'fa-play-circle', color: '#7e22ce', bgColor: '#f3e8ff' },
    { value: 'Billing', icon: 'fa-file-invoice-dollar', color: '#854d0e', bgColor: '#fef9c3' },
    { value: 'No Show', icon: 'fa-user-times', color: '#991b1b', bgColor: '#fee2e2' }
  ];

  patients: Patient[] = [
    {
      id: 1,
      name: 'Jemimah Rodrigues',
      age: 32,
      phoneNumber: '+11 4567770089',
      bookingId: 'HSPB0012',
      waitingNo: 'W001',
      status: 'Pending',
      category: 'Consultation',
      appointmentTime: '10:30 - 11:00',
      showDropdown: false
    },
    {
      id: 2,
      name: 'Amarpali',
      age: 25,
      phoneNumber: '+11 4567745543',
      bookingId: 'HSPB0013',
      waitingNo: 'W002',
      status: 'Pending',
      category: 'Consultation',
      appointmentTime: '11:00 - 11:30',
      showDropdown: false
    },
    {
      id: 3,
      name: 'Muragan',
      age: 60,
      phoneNumber: '+11 4567745543',
      bookingId: 'HSPB0034',
      waitingNo: 'W003',
      status: 'Pending',
      category: 'Followup',
      appointmentTime: '11:30 - 12:00',
      showDropdown: false
    },
    {
      id: 4,
      name: 'Amarpali',
      age: 25,
      phoneNumber: '+11 4567745543',
      bookingId: 'HSPB0013',
      waitingNo: 'W004',
      status: 'Pending',
      category: 'Followup',
      appointmentTime: '12:30 - 13:00',
      showDropdown: false
    },
    {
      id: 5,
      name: 'Ameer MD',
      age: 45,
      phoneNumber: '+11 4567745543',
      bookingId: 'HSPB0043',
      waitingNo: 'W005',
      status: 'Pending',
      category: 'Consultation',
      appointmentTime: '14:00 - 14:30',
      showDropdown: false
    },
    {
      id: 6,
      name: 'Ajay',
      age: 13,
      phoneNumber: '+11 4567745543',
      bookingId: 'HSPB0064',
      waitingNo: 'W006',
      status: 'Pending',
      category: 'Consultation',
      appointmentTime: '14:30 - 15:00',
      showDropdown: false
    }
  ];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  searchText = '';

  showAddModal = false;
  activeSection: 'personal' | 'invoice' | 'forms' = 'personal';
  newPatient = {
    firstName: '',
    lastName: '',
    email: '',
    contact1: '',
    contact2: '',
    country: '',
    idNumber: '',
    dateOfBirth: '',
    gender: '',
    salutation: 'Mr',
    hasPassport: false,
    useExistingId: false,
    useConsolidatedInvoice: false,
    idType: '',
    tin: ''
  };

  // E-Forms properties
  formsPerPage = 10;
  currentFormPage = 1;
  formSearchText = '';
  forms: Form[] = [
    { id: 1, name: 'Consent for Procedure', isSelected: false },
    { id: 2, name: 'Consent Form 2', isSelected: false },
    { id: 3, name: 'Consent Form 1', isSelected: false }
  ];

  showViewModal = false;
  selectedPatient: Patient | null = null;

  showDeleteModal = false;
  patientToDelete: Patient | null = null;

  get filteredPatients(): Patient[] {
    return this.patients.filter(patient => 
      patient.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      patient.bookingId.toLowerCase().includes(this.searchText.toLowerCase()) ||
      patient.waitingNo.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  get paginatedPatients(): Patient[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPatients.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPatients.length / this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  viewPatient(patient: Patient) {
    this.selectedPatient = patient;
    this.showViewModal = true;
  }

  deletePatient(patient: Patient) {
    this.patientToDelete = patient;
    this.showDeleteModal = true;
  }

  addNewPatient() {
    this.openAddModal();
  }

  toggleStatusDropdown(patient: Patient) {
    // Close all other dropdowns first
    this.patients.forEach(p => {
      if (p !== patient) {
        p.showDropdown = false;
      }
    });
    // Toggle the clicked dropdown
    patient.showDropdown = !patient.showDropdown;
  }

  // Add click outside handler
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Check if click is outside of any status dropdown
    const target = event.target as HTMLElement;
    if (!target.closest('.status-dropdown')) {
      this.patients.forEach(patient => {
        patient.showDropdown = false;
      });
    }
  }

  getStatusIcon(status: string | undefined): string {
    if (!status) return 'fa-clock';
    const option = this.statusOptions.find(opt => opt.value === status);
    return option ? option.icon : 'fa-clock';
  }

  getStatusColor(status: string | undefined): string {
    if (!status) return '#92400e';
    const option = this.statusOptions.find(opt => opt.value === status);
    return option ? option.color : '#92400e';
  }

  getStatusBgColor(status: string | undefined): string {
    if (!status) return '#fef3c7';
    const option = this.statusOptions.find(opt => opt.value === status);
    return option ? option.bgColor : '#fef3c7';
  }

  updateStatus(patient: Patient, newStatus: string) {
    patient.status = newStatus as Patient['status'];
    patient.showDropdown = false;
  }

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.resetNewPatient();
  }

  resetNewPatient() {
    this.newPatient = {
      firstName: '',
      lastName: '',
      email: '',
      contact1: '',
      contact2: '',
      country: '',
      idNumber: '',
      dateOfBirth: '',
      gender: '',
      salutation: 'Mr',
      hasPassport: false,
      useExistingId: false,
      useConsolidatedInvoice: false,
      idType: '',
      tin: ''
    };
  }

  addPatient() {
    // Create a new patient with all required fields from the interface
    const patient: Patient = {
      id: this.patients.length + 1,
      name: `${this.newPatient.firstName} ${this.newPatient.lastName}`,
      age: this.calculateAge(this.newPatient.dateOfBirth),
      phoneNumber: this.newPatient.contact1,
      bookingId: `HSPB${String(this.patients.length + 1).padStart(4, '0')}`,
      waitingNo: `W${String(this.patients.length + 1).padStart(3, '0')}`,
      status: 'Pending',
      category: 'Consultation',
      appointmentTime: '10:00 - 10:30',
      showDropdown: false
    };
    
    this.patients.unshift(patient);
    this.closeAddModal();
  }

  private calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  get filteredForms(): Form[] {
    return this.forms.filter(form => 
      form.name.toLowerCase().includes(this.formSearchText.toLowerCase())
    );
  }

  get paginatedForms(): Form[] {
    const startIndex = (this.currentFormPage - 1) * this.formsPerPage;
    return this.filteredForms.slice(startIndex, startIndex + this.formsPerPage);
  }

  get totalFormPages(): number {
    return Math.ceil(this.filteredForms.length / this.formsPerPage);
  }

  setActiveSection(section: 'personal' | 'invoice' | 'forms') {
    this.activeSection = section;
  }

  getInitials(firstName: string, lastName: string): string {
    if (!firstName && !lastName) return 'NA';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  onFormPageChange(page: number) {
    this.currentFormPage = page;
  }

  viewForm(form: Form) {
    console.log('View form:', form);
  }

  downloadForm(form: Form) {
    console.log('Download form:', form);
  }

  resetForm() {
    this.resetNewPatient();
  }

  submitForm() {
    // Validate required fields based on active section
    if (this.activeSection === 'personal') {
      if (!this.newPatient.firstName || !this.newPatient.lastName || !this.newPatient.contact1) {
        // Show error message
        return;
      }
    } else if (this.activeSection === 'invoice') {
      if (this.newPatient.useExistingId && !this.newPatient.idNumber) {
        // Show error message
        return;
      }
    }

    // If all validations pass, add the patient
    this.addPatient();
  }

  toggleForm(form: Form) {
    form.isSelected = !form.isSelected;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedPatient = null;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.patientToDelete = null;
  }

  confirmDelete() {
    if (this.patientToDelete) {
      const index = this.patients.findIndex(p => p.id === this.patientToDelete?.id);
      if (index !== -1) {
        this.patients.splice(index, 1);
      }
    }
    this.closeDeleteModal();
  }

  ngOnInit() {
    // Initialize component if needed
  }
} 