import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-view">
      <div class="profile-header">
        <button class="back-button" (click)="goBack()">
          <i class="fas fa-arrow-left"></i> Back
        </button>
        <h2>Profile Information</h2>
      </div>

      <div class="profile-content">
        <div class="profile-avatar">
          <div class="avatar-circle">AK</div>
        </div>

        <div class="profile-details">
          <div class="detail-item">
            <label>Name</label>
            <div class="value">Alexander ahfaf Pierce</div>
          </div>

          <div class="detail-item">
            <label>Phone Number</label>
            <div class="value">XXXXXXXXX</div>
          </div>

          <div class="detail-item">
            <label>Email</label>
            <div class="value">alexanderpierce&#64;gmail.com</div>
          </div>

          <div class="detail-item">
            <label>Employee Code</label>
            <div class="value">EMP00445</div>
          </div>

          <div class="detail-item">
            <label>Designation</label>
            <div class="value">Plant Engineer</div>
          </div>

          <div class="detail-item">
            <label>Location</label>
            <div class="value">Malaysia</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-view {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .back-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: #f3f4f6;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .back-button:hover {
      background-color: #e5e7eb;
    }

    .profile-content {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 2rem;
    }

    .profile-avatar {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .avatar-circle {
      width: 120px;
      height: 120px;
      background-color: #4a90e2;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: bold;
    }

    .profile-details {
      display: grid;
      gap: 1.5rem;
    }

    .detail-item {
      display: grid;
      gap: 0.5rem;
    }

    .detail-item label {
      color: #666;
      font-size: 0.9rem;
    }

    .detail-item .value {
      color: #333;
      font-size: 1.1rem;
      font-weight: 500;
    }
  `]
})
export class ProfileViewComponent {
  @Output() backToDashboard = new EventEmitter<void>();

  goBack() {
    this.backToDashboard.emit();
  }
} 