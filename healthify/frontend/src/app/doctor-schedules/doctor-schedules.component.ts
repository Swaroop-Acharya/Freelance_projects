import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorScheduleService, DoctorSchedule } from '../services/doctor-schedule.service';
import { HttpClientModule } from '@angular/common/http';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  status: 'available' | 'unavailable';
  workingHours: string;
  workingDays: string[];
  nextAvailable: string;
}

interface Appointment {
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
  selector: 'app-doctor-schedules',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './doctor-schedules.component.html',
  styleUrls: ['./doctor-schedules.component.css']
})
export class DoctorSchedulesComponent implements OnInit {
  activeTab: 'all' | 'available' | 'unavailable' = 'all';
  doctors: DoctorSchedule[] = [];
  loading = false;
  error: string | null = null;

  constructor(private doctorScheduleService: DoctorScheduleService) {}

  ngOnInit() {
    this.loadDoctors();
  }

  // Modal state and form model
  showAddModal = false;
  newAppointment: Appointment = {
    bookingId: '',
    patientName: '',
    date: '',
    time: '',
    purpose: 'Consultation',
    duration: '10 min',
    type: 'Appointment',
    doctor: ''
  };

  setActiveTab(tab: 'all' | 'available' | 'unavailable') {
    this.activeTab = tab;
    this.loadDoctors();
  }

  loadDoctors() {
    this.loading = true;
    this.error = null;

    let request$;
    switch (this.activeTab) {
      case 'available':
        request$ = this.doctorScheduleService.getAvailableDoctors();
        break;
      case 'unavailable':
        request$ = this.doctorScheduleService.getUnavailableDoctors();
        break;
      default:
        request$ = this.doctorScheduleService.getAllDoctors();
    }

    request$.subscribe({
      next: (doctors) => {
        this.doctors = doctors.map(doctor => ({
          ...doctor,
          specialization: 'General Medicine', // Static for now
          workingHours: `${doctor.startTime} - ${doctor.endTime}`
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading doctors:', error);
        this.error = 'Failed to load doctor schedules';
        this.loading = false;
      }
    });
  }

  get filteredDoctors(): DoctorSchedule[] {
    return this.doctors;
  }

  toggleAvailability(doctor: DoctorSchedule) {
    // This would be implemented when the API supports toggling availability
    console.log('Toggle availability for doctor:', doctor);
  }

  formatNextAvailable(dateTimeString: string): string {
    if (!dateTimeString) return 'Not available';
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  }

  addAppointment() {
    // Here you would add the appointment to a list or send to backend
    // For now, just close the modal
    this.showAddModal = false;
    this.resetAppointmentForm();
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