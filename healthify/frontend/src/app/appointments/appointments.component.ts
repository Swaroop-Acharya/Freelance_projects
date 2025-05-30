import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService, Appointment, AppointmentDTO, Doctor } from '../services/appointment.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  protected Math = Math;

  appointments: Appointment[] = [];
  loading = false;
  error: string | null = null;

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  searchText = '';

  // Modals
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;

  // Form data
  newAppointment = {
    patientName: '',
    age: 0,
    phoneNumber: '',
    bookingId: '',
    appointmentStatus: 'Confirmed',
    appointmentTime: '',
    appointmentType: 'Walkin' as const,
    doctorId: 0,
    duration: '00:30:00',
    purpose: ''
  };

  selectedAppointment: Appointment | null = null;
  appointmentToDelete: Appointment | null = null;

  doctors: Doctor[] = [];
  appointmentTypes = ['Walkin', 'ScheduledAppointment', 'Follow_up', 'Consultation'] as const;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
    this.loadDoctors();
  }

  loadDoctors() {
    this.appointmentService.getAllDoctors().subscribe({
      next: (doctors: Doctor[]) => {
        console.log('Loaded doctors:', doctors);
        this.doctors = doctors;
        if (!this.doctors || this.doctors.length === 0) {
          console.warn('No doctors loaded or empty doctors array');
        } else {
          this.doctors.forEach(doctor => {
            if (!doctor.fullName && !doctor.username) {
              console.warn('Doctor with missing name and username:', doctor);
            }
          });
        }
      },
      error: (error: Error) => {
        console.error('Error loading doctors:', error);
        this.error = 'Failed to load doctors';
      }
    });
  }

  loadAppointments() {
    this.loading = true;
    this.appointmentService.getAllAppointments().subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
        this.error = 'Failed to load appointments';
        this.loading = false;
      }
    });
  }

  get filteredAppointments(): Appointment[] {
    return this.appointments.filter(appointment => 
      appointment.patientName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  get paginatedAppointments(): Appointment[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAppointments.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAppointments.length / this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.resetAppointmentForm();
  }

  resetAppointmentForm() {
    this.newAppointment = {
      patientName: '',
      age: 0,
      phoneNumber: '',
      bookingId: '',
      appointmentStatus: 'Confirmed',
      appointmentTime: '',
      appointmentType: 'Walkin' as const,
      doctorId: 0,
      duration: '00:30:00',
      purpose: ''
    };
  }

  addAppointment() {
    if (!this.validateAppointmentForm()) {
      return;
    }

    // Format the duration from "XX min" to "HH:mm:ss"
    const durationMinutes = parseInt(this.newAppointment.duration.split(' ')[0]);
    const formattedDuration = `00:${durationMinutes.toString().padStart(2, '0')}:00`;

    const appointmentData: AppointmentDTO = {
      ...this.newAppointment,
      phoneNumber: parseInt(this.newAppointment.phoneNumber.replace(/\D/g, '')), // Remove non-digits before parsing
      duration: formattedDuration,
      // Ensure appointmentTime is in ISO format
      appointmentTime: new Date(this.newAppointment.appointmentTime).toISOString()
    };

    this.appointmentService.createAppointment(appointmentData).subscribe({
      next: (response) => {
        this.loadAppointments();
        this.closeAddModal();
      },
      error: (error) => {
        console.error('Error creating appointment:', error);
        if (error.error?.message?.includes('Duplicate entry')) {
          this.error = 'An appointment already exists for this patient. Please check the phone number or existing appointments.';
        } else if (error.error?.message) {
          this.error = error.error.message;
        } else {
          this.error = 'Failed to create appointment. Please try again later.';
        }
      }
    });
  }

  validateAppointmentForm(): boolean {
    if (!this.newAppointment.patientName) {
      this.error = 'Patient name is required';
      return false;
    }
    if (!this.newAppointment.phoneNumber) {
      this.error = 'Phone number is required';
      return false;
    }
    if (!this.newAppointment.appointmentTime) {
      this.error = 'Appointment time is required';
      return false;
    }
    if (!this.newAppointment.doctorId) {
      this.error = 'Doctor selection is required';
      return false;
    }
    return true;
  }

  editAppointment(appointment: Appointment) {
    this.selectedAppointment = { ...appointment };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedAppointment = null;
  }

  updateAppointment() {
    // Implementation for updating appointment
  }

  deleteAppointment(appointment: Appointment) {
    this.appointmentToDelete = appointment;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.appointmentToDelete = null;
  }

  confirmDelete() {
    // Implementation for deleting appointment
  }
} 