import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Doctor {
  id: number;
  employeeCode: string | null;
  username: string;
  fullName: string | null;
  address: string | null;
  phoneNumber: number;
  lastActive: string | null;
  dateOfBirth: string | null;
  status: string | null;
  roles: {
    id: number;
    name: string;
  }[];
}

export interface AppointmentDTO {
  id?: number;
  patientName: string;
  age: number;
  phoneNumber: number;
  bookingId: string;
  appointmentStatus: string;
  appointmentTime: string;
  appointmentType: 'Walkin' | 'ScheduledAppointment' | 'Follow_up' | 'Consultation';
  doctorId: number;
  duration: string;
  purpose: string;
}

export interface Appointment {
  id: number;
  bookingId: string;
  patientName: string;
  date: string;
  time: string;
  purpose: string;
  duration: string;
  type: string;
  doctor: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8081/nurse';

  constructor(private http: HttpClient) { }

  getAllDoctors(): Observable<Doctor[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Doctor[]>(`${this.baseUrl}/doctors`, { headers });
  }

  createAppointment(appointmentData: AppointmentDTO): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/appointment`, appointmentData, { headers });
  }

  getAllAppointments(): Observable<Appointment[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointmentSchedules`, { headers });
  }
} 