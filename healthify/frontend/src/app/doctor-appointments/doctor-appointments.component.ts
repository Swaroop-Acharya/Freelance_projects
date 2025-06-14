import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface Appointment {
  slNo: number;
  patientName: string;
  age: number;
  phone: string;
  bookingId: string;
  status: string;
  time: string;
  diagnosis?: string;
}

@Component({
  selector: 'app-doctor-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="p-6 bg-gray-100 min-h-screen">
      <h1 class="text-3xl font-semibold text-gray-800 mb-6">Appointments</h1>
      <div class="overflow-x-auto bg-white rounded-lg shadow-md">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4 px-4 pt-4">
          <div class="flex items-center gap-2">
            <span>Show</span>
            <select class="border rounded px-2 py-1" [(ngModel)]="entriesToShow">
              <option *ngFor="let n of [10, 25, 50, 100]" [value]="n">{{n}}</option>
            </select>
            <span>entries</span>
          </div>
          <div class="flex items-center gap-2">
            <span>Search:</span>
            <input type="text" class="border rounded px-2 py-1" [(ngModel)]="searchQuery" placeholder="Search appointments...">
          </div>
        </div>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer select-none" (click)="toggleSortOrder()">
                Sl No
                <span *ngIf="sortDescending">&#8595;</span><span *ngIf="!sortDescending">&#8593;</span>
              </th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Patient Name</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phone Number</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Appointment Status</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Appointment Time</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Diagnosis</th>
              </tr>
            </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let appt of paginatedAppointments; let i = index" class="hover:bg-pink-100 transition-colors duration-150">
              <td class="px-4 py-2">{{appt.slNo}}</td>
              <td class="px-4 py-2 text-green-700 font-semibold flex items-center gap-2 cursor-pointer" (click)="goToDoctorNotes(appt)">
                <i class="fas fa-user-circle text-green-600"></i> {{appt.patientName}}
              </td>
              <td class="px-4 py-2">{{appt.age}}</td>
              <td class="px-4 py-2 text-green-700 font-semibold flex items-center gap-2">
                <i class="fas fa-phone-alt text-green-600"></i> {{appt.phone}}
              </td>
              <td class="px-4 py-2">{{appt.bookingId}}</td>
              <td class="px-4 py-2 font-semibold flex items-center gap-2">
                <ng-container [ngSwitch]="appt.status">
                  <span *ngSwitchCase="'Pending'" class="text-blue-800 flex items-center gap-1">
                    <i class="fas fa-clock text-blue-800"></i> {{appt.status}}
                  </span>
                  <span *ngSwitchCase="'No Show'" class="text-red-600 flex items-center gap-1">
                    <i class="fas fa-thumbs-down text-red-600"></i> {{appt.status}}
                  </span>
                  <span *ngSwitchCase="'Completed'" class="text-green-700 flex items-center gap-1">
                    <i class="fas fa-check-circle text-green-700"></i> {{appt.status}}
                  </span>
                  <span *ngSwitchCase="'Arrived'" class="text-lime-600 flex items-center gap-1">
                    <i class="fas fa-map-marker-alt text-lime-600"></i> {{appt.status}}
                  </span>
                  <span *ngSwitchDefault>{{appt.status}}</span>
                </ng-container>
                </td>
              <td class="px-4 py-2">{{appt.time}}</td>
              <td class="px-4 py-2">
                <button class="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded px-3 py-1 font-semibold" (click)="goToDoctorNotes(appt)">
                  <img src="assets/images/casenotes-icon.png" alt="Case Notes" class="w-5 h-5" />
                    </button>
                </td>
              </tr>
            </tbody>
          </table>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-2 px-4 pb-4">
          <div>
            Showing {{startEntry + 1}} to {{endEntry}} of {{filteredAppointments.length}} entries
          </div>
          <div class="flex items-center gap-2">
            <button class="px-3 py-1 rounded border bg-gray-200 hover:bg-gray-300" [disabled]="currentPage === 1" (click)="prevPage()">Previous</button>
            <span class="px-3 py-1 rounded bg-[#1e3a8a] text-white font-bold">{{currentPage}}</span>
            <button class="px-3 py-1 rounded border bg-gray-200 hover:bg-gray-300" [disabled]="endEntry >= filteredAppointments.length" (click)="nextPage()">Next</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DoctorAppointmentsComponent {
  entriesToShow = 10;
  searchQuery = '';
  currentPage = 1;
  sortDescending = false;

  appointments: Appointment[] = [
    { slNo: 1, patientName: 'Jemimah Rodrigues', age: 32, phone: '+11 4567770089', bookingId: 'HSPB0012', status: 'Pending', time: '10:30 - 11:00' },
    { slNo: 2, patientName: 'Amarpali', age: 25, phone: '+11 5557895003', bookingId: 'HSPB0013', status: 'No Show', time: '11:00 - 11:30' },
    { slNo: 3, patientName: 'Muragan', age: 60, phone: '+11 4995649010', bookingId: 'HSPB0034', status: 'Completed', time: '11:30 - 12:00' },
    { slNo: 4, patientName: 'Amarpali', age: 25, phone: '+11 4580041168', bookingId: 'HSPB0013', status: 'Completed', time: '12:30 - 13:00' },
    { slNo: 5, patientName: 'Ameer MD', age: 45, phone: '+11 4567745543', bookingId: 'HSPB0043', status: 'Arrived', time: '14:00 - 14:30' },
    { slNo: 6, patientName: 'Ajay', age: 13, phone: '+11 4567745543', bookingId: 'HSPB0064', status: 'Pending', time: '14:30 - 15:00' },
  ];

  constructor(private router: Router) {}

  get filteredAppointments() {
    if (!this.searchQuery) return this.appointments;
    const query = this.searchQuery.toLowerCase();
    return this.appointments.filter(appt =>
      appt.patientName.toLowerCase().includes(query) ||
      appt.phone.toLowerCase().includes(query) ||
      appt.bookingId.toLowerCase().includes(query) ||
      appt.status.toLowerCase().includes(query) ||
      appt.time.toLowerCase().includes(query)
    );
  }

  get sortedAppointments() {
    const sorted = [...this.filteredAppointments];
    sorted.sort((a, b) => this.sortDescending ? b.slNo - a.slNo : a.slNo - b.slNo);
    return sorted;
    }

  get startEntry() {
    return (this.currentPage - 1) * this.entriesToShow;
  }
  get endEntry() {
    return Math.min(this.startEntry + this.entriesToShow, this.filteredAppointments.length);
        }
  get paginatedAppointments() {
    return this.sortedAppointments.slice(this.startEntry, this.endEntry);
  }
  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
    }
  nextPage() {
    if (this.endEntry < this.filteredAppointments.length) this.currentPage++;
    }
  toggleSortOrder() {
    this.sortDescending = !this.sortDescending;
  }

  goToDoctorNotes(appt: Appointment) {
    this.router.navigate(['/doctor-appointments/doctor-notes', appt.bookingId]);
  }
} 