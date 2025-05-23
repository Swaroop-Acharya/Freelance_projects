import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Appointment {
  id: number;
  bookingId: string;
  patientName: string;
  date: string;
  time: string;
  purpose: string;
  duration: string;
  type: 'Appointment' | 'Walk-in';
  doctor: string;
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  protected Math = Math;

  appointments: Appointment[] = [
    {
      id: 1,
      bookingId: 'BOO110',
      patientName: 'Jemimah Rodrigues',
      date: '09-05-2025',
      time: '10:00',
      purpose: 'Consultation',
      duration: '20 min',
      type: 'Appointment',
      doctor: 'Dr.Thamos'
    },
    {
      id: 2,
      bookingId: 'BOO114',
      patientName: 'Hitesh Rana',
      date: '09-05-2025',
      time: '10:45',
      purpose: 'Follow up',
      duration: '15 min',
      type: 'Appointment',
      doctor: 'Dr.Thamos'
    },
    {
      id: 3,
      bookingId: 'BOO214',
      patientName: 'Sameer',
      date: '09-05-2025',
      time: '11:15',
      purpose: 'Follow up',
      duration: '10 min',
      type: 'Appointment',
      doctor: 'Dr.Surya Kumar'
    },
    {
      id: 4,
      bookingId: 'BOO215',
      patientName: 'Jyothsna',
      date: '10-05-2025',
      time: '10:15',
      purpose: 'Consultation',
      duration: '10 min',
      type: 'Appointment',
      doctor: 'Dr.Surendranath'
    },
    {
      id: 5,
      bookingId: 'BOO220',
      patientName: 'Salma Begum',
      date: '10-05-2025',
      time: '10:45',
      purpose: 'Consultation',
      duration: '15 min',
      type: 'Appointment',
      doctor: 'Dr.Rafiq'
    }
  ];

  // Modal states and form models
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  selectedAppointment: Appointment | null = null;
  appointmentToDelete: Appointment | null = null;

  newAppointment: Partial<Appointment> = {
    bookingId: '',
    patientName: '',
    date: '',
    time: '',
    purpose: 'Consultation',
    duration: '10 min',
    type: 'Appointment',
    doctor: ''
  };

  doctors: string[] = [
    'Dr. Alexander Pierce',
    'Dr. Sunanda U',
    'Dr. Hitesh Rana'
  ];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  searchText = '';

  ngOnInit() {}

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

  editAppointment(appointment: Appointment) {
    this.selectedAppointment = { ...appointment };
    this.showEditModal = true;
  }

  updateAppointment() {
    if (this.selectedAppointment) {
      const index = this.appointments.findIndex(a => a.id === this.selectedAppointment?.id);
      if (index !== -1) {
        this.appointments[index] = { ...this.selectedAppointment };
        this.closeEditModal();
      }
    }
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedAppointment = null;
  }

  deleteAppointment(appointment: Appointment) {
    this.appointmentToDelete = appointment;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.appointmentToDelete) {
      this.appointments = this.appointments.filter(a => a.id !== this.appointmentToDelete?.id);
      this.closeDeleteModal();
    }
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.appointmentToDelete = null;
  }

  // Add Modal logic
  openAddModal() {
    this.showAddModal = true;
    this.resetAppointmentForm();
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  addAppointment() {
    if (
      this.newAppointment.bookingId &&
      this.newAppointment.patientName &&
      this.newAppointment.date &&
      this.newAppointment.time &&
      this.newAppointment.purpose &&
      this.newAppointment.duration &&
      this.newAppointment.type &&
      this.newAppointment.doctor
    ) {
      this.appointments.push({
        id: this.appointments.length + 1,
        bookingId: this.newAppointment.bookingId,
        patientName: this.newAppointment.patientName,
        date: this.newAppointment.date,
        time: this.newAppointment.time,
        purpose: this.newAppointment.purpose,
        duration: this.newAppointment.duration,
        type: this.newAppointment.type as 'Appointment' | 'Walk-in',
        doctor: this.newAppointment.doctor
      });
      this.closeAddModal();
    }
  }

  resetAppointmentForm() {
    this.newAppointment = {
      bookingId: '',
      patientName: '',
      date: '',
      time: '',
      purpose: 'Consultation',
      duration: '10 min',
      type: 'Appointment',
      doctor: ''
    };
  }
} 