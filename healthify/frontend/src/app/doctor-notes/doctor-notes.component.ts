import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-notes.component.html',
  styleUrl: './doctor-notes.component.css'
})
export class DoctorNotesComponent implements OnInit {
  bookingId: string | null = null;
  activeTab: string = 'notes';
  activeNestedTab: string = 'overview';
  activeDocumentType: string = 'lab-reports';
  
  // Medical Certificate Form
  medicalCertificate = {
    patientStatus: '',
    days: '',
    fromDate: '',
    toDate: '',
    details: ''
  };
  
  patient = {
    name: 'John Doe',
    age: 45,
    dob: '1978-05-15',
    phone: '+1 234 567 8900'
  };

  appointment = {
    number: 'APT-2024-001',
    hospitalNumber: 'H12345',
    type: 'Emergency',
    date: '2024-03-20',
    time: '10:00 AM',
    duration: '30 mins'
  };

  immediateNotes: string = '';
  overviewNotes: string = '';

  constructor(private route: ActivatedRoute) {
    this.bookingId = this.route.snapshot.paramMap.get('id');
    // In a real app, fetch patient/appointment data using bookingId
  }

  ngOnInit(): void {
  }

  selectTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'notes') {
      this.activeNestedTab = 'overview';
    }
  }

  selectNestedTab(tab: string) {
    this.activeNestedTab = tab;
  }

  selectDocumentType(type: string) {
    this.activeDocumentType = type;
  }

  onImmediateNotesChange(event: any) {
    this.immediateNotes = event.target.innerHTML;
  }

  onOverviewNotesChange(event: any) {
    this.overviewNotes = event.target.innerHTML;
  }

  executeCommand(command: string, value: string = '') {
    document.execCommand(command, false, value);
  }

  // Medical Certificate Form Methods
  submitMedicalCertificate() {
    // Here you would typically send the data to your backend
    console.log('Medical Certificate Data:', this.medicalCertificate);
    // Reset form after submission
    this.medicalCertificate = {
      patientStatus: '',
      days: '',
      fromDate: '',
      toDate: '',
      details: ''
    };
  }

  submitForm() {
    // Here you would typically collect all form data and submit it
    console.log('Submitting form with data:', {
      overviewNotes: this.overviewNotes,
      immediateNotes: this.immediateNotes,
      // Add other form data as needed
    });
    // Add your API call here
  }

  resetForm() {
    // Reset all form fields to their initial state
    this.overviewNotes = '';
    this.immediateNotes = '';
    this.medicalCertificate = {
      patientStatus: '',
      days: '',
      fromDate: '',
      toDate: '',
      details: ''
    };
    // Reset other form fields as needed
  }
}
