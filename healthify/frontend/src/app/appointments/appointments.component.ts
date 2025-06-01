import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService, AppointmentDTO, Appointment, Doctor, AppointmentTypes, AppointmentStatus } from '../services/appointment.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  protected Math = Math;

  appointments:  Appointment[] = [];
  doctors: Doctor[] = [];
  appointmentTypes = Object.values(AppointmentTypes);
  appointmentStatuses = Object.values(AppointmentStatus);
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
  newAppointment: AppointmentDTO = {
    patientName: '',
    age: 0,
    phoneNumber: 0,
    bookingId: '',
    appointmentStatus: AppointmentStatus.Pending,
    appointmentTime: '',
    appointmentType: AppointmentTypes.ScheduledAppointment,
    doctorId: 0,
    duration: '',
    purpose: ''
  };

  selectedAppointment: Appointment | null = null;
  appointmentToDelete: Appointment | null = null;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
    this.loadDoctors();
  }

  loadDoctors() {
    this.appointmentService.getAllDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
      },
      error: (error) => {
        console.error('Error loading doctors:', error);
      }
    });
  }

  loadAppointments() {
    this.loading = true;
    this.appointmentService.getAllAppointments().subscribe({
      next: (appointments) => {
        console.log('Raw appointments data:', appointments);
        this.appointments = appointments.map(appointment => ({
          ...appointment,
          id: appointment.id || 0
        }));
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
      appointment.patientName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      appointment.bookingId.toLowerCase().includes(this.searchText.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  get paginatedAppointments(): Appointment[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAppointments.slice(startIndex, startIndex + this.itemsPerPage);
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
    this.resetNewAppointment();
  }

  resetNewAppointment() {
    this.newAppointment = {
      patientName: '',
      age: 0,
      phoneNumber: 0,
      bookingId: '',
      appointmentStatus: AppointmentStatus.Pending,
      appointmentTime: '',
      appointmentType: AppointmentTypes.ScheduledAppointment,
      doctorId: 0,
      duration: '',
      purpose: ''
    };
  }

  addAppointment() {
    this.appointmentService.createAppointment(this.newAppointment).subscribe({
      next: (response) => {
        console.log('Appointment created successfully:', response);
        this.loadAppointments();
        this.closeAddModal();
      },
      error: (error) => {
        console.error('Error creating appointment:', error);
        this.error = 'Failed to create appointment';
      }
    });
  }

  editAppointment(appointment: Appointment) {
    if (!appointment.id) {
      console.error('Appointment ID is undefined');
      this.error = 'Cannot edit appointment: Invalid appointment ID';
      return;
    }

    const appointmentTime = new Date(`${appointment.date}T${appointment.time}`);
    
    // Find the doctor ID based on the doctor's name
    const doctorId = this.doctors.find(d => d.fullName === appointment.doctor)?.id || 0;
    
    this.newAppointment = {
      id: appointment.id,
      patientName: appointment.patientName,
      age: appointment.age || 0,
      phoneNumber: appointment.phoneNumber || 0,
      bookingId: appointment.bookingId,
      appointmentStatus: appointment.status as AppointmentStatus,
      appointmentTime: appointmentTime.toISOString().slice(0, 16),
      appointmentType: appointment.type as AppointmentTypes,
      doctorId: doctorId,
      duration: appointment.duration,
      purpose: appointment.purpose
    };
    
    this.selectedAppointment = appointment;
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedAppointment = null;
  }

  updateAppointment() {
    if (this.selectedAppointment && this.newAppointment.id) {
      this.appointmentService.updateAppointment(this.newAppointment.id, this.newAppointment).subscribe({
        next: (response) => {
          this.loadAppointments();
          this.closeEditModal();
        },
        error: (error) => {
          console.error('Error updating appointment:', error);
          this.error = error.error?.message || 'Failed to update appointment';
        }
      });
    }
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
    // TODO: Implement delete functionality
    this.closeDeleteModal();
  }
} 