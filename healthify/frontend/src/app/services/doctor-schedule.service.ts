import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

export interface DoctorSchedule {
  empCode: string;
  name: string;
  id: number;
  startTime: string;
  endTime: string;
  workingDays: string[];
  nxtAvailableSlot: string;
  status?: 'available' | 'unavailable';
  specialization?: string; // This is static for now as it's not in API
}

@Injectable({
  providedIn: 'root'
})
export class DoctorScheduleService {
  private baseUrl = 'http://localhost:8081/nurse';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAvailableDoctors(): Observable<DoctorSchedule[]> {
    const headers = this.getHeaders();
    return this.http.get<DoctorSchedule[]>(`${this.baseUrl}/doctorSchedules/availableNow`, { headers })
      .pipe(
        map(doctors => doctors.map(doctor => ({
          ...doctor,
          status: 'available' as const
        })))
      );
  }

  getUnavailableDoctors(): Observable<DoctorSchedule[]> {
    const headers = this.getHeaders();
    return this.http.get<DoctorSchedule[]>(`${this.baseUrl}/doctorSchedules/unAvailableNow`, { headers })
      .pipe(
        map(doctors => doctors.map(doctor => ({
          ...doctor,
          status: 'unavailable' as const
        })))
      );
  }

  getAllDoctors(): Observable<DoctorSchedule[]> {
    return forkJoin([
      this.getAvailableDoctors(),
      this.getUnavailableDoctors()
    ]).pipe(
      map(([available, unavailable]) => [...available, ...unavailable])
    );
  }
} 