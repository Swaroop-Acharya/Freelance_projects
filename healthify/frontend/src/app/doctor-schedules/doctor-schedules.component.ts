import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-schedules.component.html',
  styleUrls: ['./doctor-schedules.component.css']
})
export class DoctorSchedulesComponent {
  activeTab: 'all' | 'available' | 'unavailable' = 'all';

  doctors: Doctor[] = [
    {
      id: 'D001',
      name: 'Dr. Alexander Pierce',
      specialization: 'Cardiologist',
      status: 'available',
      workingHours: '09:00 AM - 05:00 PM',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      nextAvailable: 'Tomorrow, 10:00 AM'
    },
    {
      id: 'D002',
      name: 'Dr. Sunanda U',
      specialization: 'Dermatologist',
      status: 'unavailable',
      workingHours: '10:00 AM - 04:00 PM',
      workingDays: ['Mon', 'Wed', 'Fri'],
      nextAvailable: 'Monday, 11:00 AM'
    },
    {
      id: 'D003',
      name: 'Dr. Hitesh Rana',
      specialization: 'Neurologist',
      status: 'available',
      workingHours: '08:00 AM - 02:00 PM',
      workingDays: ['Tue', 'Thu', 'Sat'],
      nextAvailable: 'Today, 01:00 PM'
    }
  ];

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
  }

  get filteredDoctors(): Doctor[] {
    if (this.activeTab === 'all') {
      return this.doctors;
    }
    return this.doctors.filter(doc => doc.status === this.activeTab);
  }

  toggleAvailability(doctor: Doctor) {
    doctor.status = doctor.status === 'available' ? 'unavailable' : 'available';
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