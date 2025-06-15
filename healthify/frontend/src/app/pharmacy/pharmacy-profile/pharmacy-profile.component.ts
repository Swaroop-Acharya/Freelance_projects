import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pharmacy-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <button class="back-button" (click)="goBack()">
          <i class="fas fa-arrow-left"></i> Back
        </button>
        <h2>Profile Information</h2>
      </div>

      <div class="profile-body">
        <div class="profile-avatar">
          <div class="avatar-circle">AK</div>
        </div>

        <div class="profile-info">
          <div class="info-group">
            <label>Name</label>
            <p>Pharmacy Staff</p>
          </div>

          <div class="info-group">
            <label>Phone Number</label>
            <p>XXXXXXXXX</p>
          </div>

          <div class="info-group">
            <label>Email</label>
            <p>pharmacystaff&#64;gmail.com</p>
          </div>

          <div class="info-group">
            <label>Employee Code</label>
            <p>EMP00445</p>
          </div>

          <div class="info-group">
            <label>Designation</label>
            <p>Pharmacy Staff</p>
          </div>

          <div class="info-group">
            <label>Location</label>
            <p>Malaysia</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .profile-header {
      margin-bottom: 2rem;
      border-bottom: 1px solid #eee;
      padding-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .back-button {
      background: none;
      border: none;
      color: #406e8d;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .back-button:hover {
      background-color: #f3f4f6;
    }

    .back-button i {
      font-size: 1.1rem;
    }

    .profile-header h2 {
      color: #406e8d;
      margin: 0;
      font-size: 1.5rem;
    }

    .profile-body {
      padding: 1rem 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    .profile-avatar {
      display: flex;
      justify-content: center;
    }

    .avatar-circle {
      width: 120px;
      height: 120px;
      background-color: #406e8d;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: 600;
      letter-spacing: 2px;
    }

    .profile-info {
      width: 100%;
      max-width: 500px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .info-group {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid #eee;
    }

    .info-group label {
      font-weight: 600;
      color: #666;
      font-size: 0.9rem;
      min-width: 120px;
    }

    .info-group p {
      margin: 0;
      color: #333;
      font-size: 1.1rem;
      flex: 1;
    }
  `]
})
export class PharmacyProfileComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/dashboard-pharmacy']);
  }
} 