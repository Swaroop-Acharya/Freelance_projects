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

  // Patient data for the chart
  patientData = [
    { week: 1, total: 45 },
    { week: 2, total: 52 },
    { week: 3, total: 38 },
    { week: 4, total: 48 },
    { week: 5, total: 55 }
  ];

  maxPatients = 60; // Maximum value for the chart scale

  // Appointments data
  appointments = [
    {
      patientName: 'John Smith',
      type: 'General Checkup',
      doctorName: 'Dr. Rahul Hegde',
      time: '10:30 AM',
      room: 'Room 101'
    },
    {
      patientName: 'John Smith',
      type: 'General Checkup',
      doctorName: 'Dr. Rahul Hegde',
      time: '10:30 AM',
      room: 'Room 101'
    },
    {
      patientName: 'John Smith',
      type: 'General Checkup',
      doctorName: 'Dr. Rahul Hegde',
      time: '10:30 AM',
      room: 'Room 101'
    },
    {
      patientName: 'John Smith',
      type: 'General Checkup',
      doctorName: 'Dr. Rahul Hegde',
      time: '10:30 AM',
      room: 'Room 101'
    },
    {
      patientName: 'John Smith',
      type: 'General Checkup',
      doctorName: 'Dr. Rahul Hegde',
      time: '10:30 AM',
      room: 'Room 101'
    }
  ];

  // Recent activities data
  recentActivities = [
    {
      description: 'Dr.Miller updated patient records for Tom Wilson',
      timeAgo: '10 min ago',
      icon: 'fas fa-user',
      iconClass: 'patient'
    },
    {
      description: 'Nurse Jhonson administrated medication to Room 32',
      timeAgo: '23 min ago',
      icon: 'fas fa-pills',
      iconClass: 'medicine'
    },
    {
      description: 'Dr. Gracia completed appoinment',
      timeAgo: '28 min ago',
      icon: 'fas fa-calendar-check',
      iconClass: 'appointment'
    },
    {
      description: 'Front desk processed payment for outpatient services',
      timeAgo: '30 min ago',
      icon: 'fas fa-money-bill-wave',
      iconClass: 'payment'
    }
  ];

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.fetchDashboardStats();
  }

  private getHeaders(): HttpHeaders {
    const token = this.storageService.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  fetchDashboardStats() {
    const headers = this.getHeaders();
    this.http.get<any>(`${this.baseUrl}/stats`, { headers })
      .subscribe({
        next: (data) => {
          this.stats = {
            totalUsers: {
              total: data.totalDoctors || 0,
              label: 'Doctors Available'
            },
            activePatients: {
              total: data.totalPatients || 0,
              label: 'Total Patients'
            },
            prescriptions: {
              total: data.totalPrescriptions || 0,
              label: 'Total Prescriptions'
            },
            totalPayments: {
              total: data.todayAppointments || 0,
              label: "Today's Appointments"
            }
          };
        },
        error: (error) => {
          console.error('Error fetching dashboard stats:', error);
        }
      });
  }
} 