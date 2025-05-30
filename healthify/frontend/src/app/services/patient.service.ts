import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

export interface RegisterPatientDTO {
  verificationType: 'LocalID' | 'Passport';
  countryOfOrigin: string;
  firstname: string;
  lastname: string;
  identificationNumber: number;
  dob: string;
  gender: string;
  salutation: string;
  contactNumber1: number;
  contactNumber2?: number;
  source: string;
  date: string;
  createdBy: string;
  createdTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = 'http://localhost:8081';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.storageService.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  registerPatient(patientData: RegisterPatientDTO): Observable<any> {
    const headers = this.getHeaders();
    
    // Ensure the data is in the correct format
    const formattedData = {
      ...patientData,
      identificationNumber: Number(patientData.identificationNumber),
      contactNumber1: Number(patientData.contactNumber1),
      contactNumber2: patientData.contactNumber2 ? Number(patientData.contactNumber2) : undefined,
      date: new Date(patientData.date).toISOString().split('T')[0],
      createdTime: new Date(patientData.createdTime).toISOString()
    };

    return this.http.post(`${this.baseUrl}/nurse/registerPatient`, formattedData, { headers });
  }
} 