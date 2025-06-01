import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum AppointmentTypes {
  Walkin = 'Walkin',
  ScheduledAppointment = 'ScheduledAppointment',
  Follow_up = 'Follow_up',
  Consultation = 'Consultation'
}

export enum AppointmentStatus {
  Confirmed = 'Confirmed',
  Pending = 'Pending',
  Cancelled = 'Cancelled',
  Finished = 'Finished'
}

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
  appointmentStatus: AppointmentStatus | string;
  appointmentTime: string;
  appointmentType: AppointmentTypes;
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
  status: string;
  age: number;
  phoneNumber: number;
}

export interface DisplayAppointment {
  id: number;
  bookingID: string;
  patientName: string;
  date: string;
  time: string;
  purpose: string;
  duration: string;
  type: string;
  doctor: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8081/nurse';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllDoctors(): Observable<Doctor[]> {
    const headers = this.getHeaders();
    return this.http.get<Doctor[]>(`${this.baseUrl}/doctors`, { headers });
  }

  createAppointment(appointmentData: AppointmentDTO): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/appointment`, appointmentData, { headers });
  }

  updateAppointment(id: number, appointmentData: AppointmentDTO): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/appointment/${id}`, appointmentData, { headers });
  }

  getAllAppointments(): Observable<Appointment[]> {
    const headers = this.getHeaders();
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointmentSchedules`, { headers });
  }

  getAppointmentById(id: number): Observable<AppointmentDTO> {
    const headers = this.getHeaders();
    return this.http.get<AppointmentDTO>(`${this.baseUrl}/appointment/${id}`, { headers });
  }
} 