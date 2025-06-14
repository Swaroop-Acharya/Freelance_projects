import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Medicine {
  name: string;
  quantity: number;
  expiryDate: string;
  supplier: string;
}

interface ReorderRequest {
  medicineName: string;
  quantity: number;
  priority: string;
  notes: string;
}

interface Appointment {
  time: string;
  patientName: string;
  patientId: string;
  purpose: string;
  status: string;
}

@Component({
  selector: 'app-dashboard-doctor',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard-doctor.component.html',
  styleUrls: ['./dashboard-doctor.component.css']
})
export class DashboardDoctorComponent implements OnInit {
  searchQuery = '';
  showReorderModal = false;
  showProfileDropdown = false;
  selectedMedicine: Medicine | null = null;
  reorderRequest: ReorderRequest = {
    medicineName: '',
    quantity: 0,
    priority: 'medium',
    notes: ''
  };

  lowStackMedicines: Medicine[] = [
    {
      name: 'Paracetamol',
      quantity: 50,
      expiryDate: '2024-12-31',
      supplier: 'ABC Pharma'
    },
    {
      name: 'Amoxicillin',
      quantity: 30,
      expiryDate: '2024-11-30',
      supplier: 'XYZ Medical'
    },
    {
      name: 'Ibuprofen',
      quantity: 20,
      expiryDate: '2025-01-15',
      supplier: 'HealthCorp'
    },
    {
      name: 'Cetirizine',
      quantity: 15,
      expiryDate: '2024-10-10',
      supplier: 'AllergyFree Ltd.'
    },
    {
      name: 'Metformin',
      quantity: 40,
      expiryDate: '2025-03-20',
      supplier: 'DiabetesCare'
    },
    {
      name: 'Aspirin',
      quantity: 25,
      expiryDate: '2024-09-05',
      supplier: 'PainAway Pharma'
    },
    {
      name: 'Lisinopril',
      quantity: 10,
      expiryDate: '2024-08-18',
      supplier: 'HeartHealth Inc.'
    }
  ];

  todayPatientsHover = false;
  totalPatientsHover = false;
  requestedMedicineHover = false;
  todaysPrescriptionsHover = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  signOut() {
    // Clear any stored tokens or user data
    localStorage.removeItem('token');
    // Navigate to login page
    this.router.navigate(['/login']);
  }

  onSearch() {
    // Search is handled by the filteredAppointments getter
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  viewAppointment(appointment: Appointment) {
    // Implement view appointment functionality
    console.log('View appointment:', appointment);
  }

  cancelAppointment(appointment: Appointment) {
    // Implement cancel appointment functionality
    console.log('Cancel appointment:', appointment);
  }

  openReorderModal(medicine: Medicine) {
    this.selectedMedicine = medicine;
    this.reorderRequest.medicineName = medicine.name;
    this.showReorderModal = true;
  }

  closeReorderModal(event: Event) {
    event.preventDefault();
    this.showReorderModal = false;
    this.selectedMedicine = null;
    this.reorderRequest = {
      medicineName: '',
      quantity: 0,
      priority: 'medium',
      notes: ''
    };
  }

  submitReorder() {
    // Implement submit reorder functionality
    console.log('Reorder request:', this.reorderRequest);
    this.closeReorderModal(new Event('click'));
  }
} 