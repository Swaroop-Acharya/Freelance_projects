import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="change-password-container">
      <div class="change-password-header">
        <button class="back-button" (click)="goBack()">
          <i class="fas fa-arrow-left"></i> Back
        </button>
        <h2>Change Password</h2>
      </div>
      <div class="change-password-body">
        <form (ngSubmit)="onSubmit()" class="password-form">
          <div class="form-group">
            <label>Current Password</label>
            <input type="password" [(ngModel)]="currentPassword" name="currentPassword" required>
          </div>
          <div class="form-group">
            <label>New Password</label>
            <input type="password" [(ngModel)]="newPassword" name="newPassword" required>
          </div>
          <div class="form-group">
            <label>Confirm New Password</label>
            <input type="password" [(ngModel)]="confirmPassword" name="confirmPassword" required>
          </div>

          <div class="password-requirements">
            <h3>Password Requirements:</h3>
            <ul class="requirements-list">
              <li class="valid">
                <i class="fas fa-check-circle"></i>
                Minimum length 8 characters
              </li>
              <li class="valid">
                <i class="fas fa-check-circle"></i>
                One special character
              </li>
              <li [class.valid]="hasUpperCase">
                <i class="fas" [class.fa-check-circle]="hasUpperCase" [class.fa-times-circle]="!hasUpperCase"></i>
                One uppercase letter
              </li>
            </ul>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" (click)="goBack()">Cancel</button>
            <button type="submit" class="btn btn-primary" [disabled]="!isPasswordValid">Update Password</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .change-password-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .change-password-header {
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

    .change-password-header h2 {
      color: #406e8d;
      margin: 0;
      font-size: 1.5rem;
    }

    .change-password-body {
      padding: 1rem 0;
    }

    .password-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .form-group label {
      font-weight: 600;
      color: #666;
      font-size: 0.9rem;
      min-width: 150px;
    }

    .form-group input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    .form-group input:focus {
      outline: none;
      border-color: #406e8d;
    }

    .password-requirements {
      background-color: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
    }

    .password-requirements h3 {
      color: #406e8d;
      font-size: 1rem;
      margin: 0 0 0.75rem 0;
    }

    .requirements-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .requirements-list li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
      font-size: 0.9rem;
    }

    .requirements-list li i {
      font-size: 1rem;
    }

    .requirements-list li.valid {
      color: #2ecc71;
    }

    .requirements-list li:not(.valid) {
      color: #e74c3c;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-primary {
      background-color: #406e8d;
      color: white;
      border: none;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #345a77;
    }

    .btn-secondary {
      background-color: #f3f4f6;
      color: #666;
      border: 1px solid #ddd;
    }

    .btn-secondary:hover {
      background-color: #e5e7eb;
    }
  `]
})
export class ChangePasswordComponent {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(private router: Router) {}

  get hasSpecialChar(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.newPassword);
  }

  get hasUpperCase(): boolean {
    return /[A-Z]/.test(this.newPassword);
  }

  get isPasswordValid(): boolean {
    return this.newPassword.length >= 8 && this.hasSpecialChar && this.hasUpperCase;
  }

  goBack() {
    window.history.back();
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (!this.isPasswordValid) {
      alert('Please meet all password requirements');
      return;
    }
    // TODO: Implement password change logic
    alert('Password updated successfully');
    this.goBack();
  }
} 