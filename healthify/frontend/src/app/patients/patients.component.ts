import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService, RegisterPatientDTO, Patient } from '../services/patient.service';

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
  protected Math = Math;

  patients: Patient[] = [];
  loading = false;
  error: string | null = null;

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  searchText = '';

  showAddModal = false;
  activeSection: 'personal' | 'invoice' | 'forms' = 'personal';
  isNavCollapsed = false;

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

  showEditModal = false;
  editPatient: Patient | null = null;
  originalEditPatient: Patient | null = null;

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.loading = true;
    this.error = null;
    this.patientService.getAllPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading patients:', error);
        this.error = 'Failed to load patients. Please try again.';
        this.loading = false;
      }
    });
  }

  get filteredPatients(): Patient[] {
    return this.patients.filter(patient => 
      patient.firstname.toLowerCase().includes(this.searchText.toLowerCase()) ||
      patient.lastname.toLowerCase().includes(this.searchText.toLowerCase()) ||
      patient.bookingId.toLowerCase().includes(this.searchText.toLowerCase())
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

  closeViewModal() {
    this.showViewModal = false;
    this.selectedPatient = null;
  }

  addNewPatient() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.resetForm();
  }

  setActiveSection(section: 'personal' | 'invoice' | 'forms') {
    this.activeSection = section;
  }

  resetForm() {
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

  submitForm() {
    if (this.validateForm()) {
      const patientData: RegisterPatientDTO = {
        verificationType: this.newPatient.hasPassport ? 'Passport' : 'LocalID',
        countryOfOrigin: this.newPatient.country,
        firstname: this.newPatient.firstName,
        lastname: this.newPatient.lastName,
        identificationNumber: parseInt(this.newPatient.idNumber),
        dob: this.newPatient.dateOfBirth,
        gender: this.newPatient.gender,
        salutation: this.newPatient.salutation,
        contactNumber1: parseInt(this.newPatient.contact1),
        contactNumber2: this.newPatient.contact2 ? parseInt(this.newPatient.contact2) : undefined,
        source: 'Online',
        date: new Date().toISOString().split('T')[0],
        createdBy: 'NURSE',
        createdTime: new Date().toISOString()
    };
    
      this.patientService.registerPatient(patientData).subscribe({
        next: (response) => {
          console.log('Patient registered successfully:', response);
    this.closeAddModal();
          this.loadPatients(); // Reload the patients list
        },
        error: (error) => {
          console.error('Error registering patient:', error);
          // TODO: Add error notification
        }
      });
    }
  }

  validateForm(): boolean {
    if (this.activeSection === 'personal') {
      return !!(
        this.newPatient.country &&
        this.newPatient.firstName &&
        this.newPatient.lastName &&
        this.newPatient.idNumber &&
        this.newPatient.dateOfBirth &&
        this.newPatient.gender &&
        this.newPatient.salutation &&
        this.newPatient.contact1
      );
    }
    return true;
  }

  toggleForm(form: Form) {
    form.isSelected = !form.isSelected;
  }

  calculateAge(dob: string | null | undefined): number {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  openEditModal(patient: Patient) {
    this.editPatient = { ...patient };
    this.originalEditPatient = { ...patient };
    this.showEditModal = true;
  }

  resetEditPatient() {
    if (this.originalEditPatient && this.editPatient) {
      Object.assign(this.editPatient, this.originalEditPatient);
    }
  }

  updatePatient() {
    if (this.editPatient) {
      // TODO: Implement update patient functionality when backend endpoint is available
      this.closeEditModal();
    }
  }

  // Added missing methods for forms pagination
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

  onFormPageChange(page: number) {
    this.currentFormPage = page;
  }

  // Added missing methods for profile initials
  getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }

  // Added missing methods for delete functionality
  closeDeleteModal() {
    this.showDeleteModal = false;
    this.patientToDelete = null;
  }

  confirmDelete() {
    if (this.patientToDelete) {
      // TODO: Implement delete functionality when backend endpoint is available
      const index = this.patients.findIndex(p => p.id === this.patientToDelete?.id);
      if (index !== -1) {
        this.patients.splice(index, 1);
    }
    this.closeDeleteModal();
  }
  }
} 