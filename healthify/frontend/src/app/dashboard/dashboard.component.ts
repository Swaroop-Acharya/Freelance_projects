import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  hoveredCard: string | null = null;
  
  stats = {
    totalUsers: {
      total: 25,
      label: 'Doctors Available'
    },
    activePatients: {
      total: 850,
      label: 'Total Patients'
    },
    prescriptions: {
      total: 1250,
      label: 'Total Prescriptions'
    },
    totalPayments: {
      total: 45,
      label: "Today's Appointments"
    }
  };
} 