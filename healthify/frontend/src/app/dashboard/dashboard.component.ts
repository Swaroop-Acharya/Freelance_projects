import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  hoveredCard: string | null = null;
  private baseUrl = 'http://localhost:8081/nurse/dashboard';
  
  stats = {
    totalUsers: {
      total: 0,
      label: 'Doctors Available'
    },
    activePatients: {
      total: 0,
      label: 'Total Patients'
    },
    prescriptions: {
      total: 0,
      label: 'Total Prescriptions'
    },
    totalPayments: {
      total: 0,
      label: "Today's Appointments"
    }
  };

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.fetchDashboardData();
  }

  private getHeaders() {
    const token = this.storageService.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private fetchDashboardData() {
    const headers = this.getHeaders();

    // Fetch available doctors count
    this.http.get<number>(`${this.baseUrl}/countCurrentlyAvailableDoctors`, { headers })
      .subscribe({
        next: (count) => {
          this.stats.totalUsers.total = count;
        },
        error: (error) => {
          console.error('Error fetching available doctors:', error);
        }
      });

    // Fetch registered patients count
    this.http.get<number>(`${this.baseUrl}/registeredPatients`, { headers })
      .subscribe({
        next: (count) => {
          this.stats.activePatients.total = count;
        },
        error: (error) => {
          console.error('Error fetching registered patients:', error);
        }
      });

    // Fetch today's appointments count
    this.http.get<number>(`${this.baseUrl}/countTodayAppointments`, { headers })
      .subscribe({
        next: (count) => {
          this.stats.totalPayments.total = count;
        },
        error: (error) => {
          console.error('Error fetching today\'s appointments:', error);
        }
      });
  }
} 