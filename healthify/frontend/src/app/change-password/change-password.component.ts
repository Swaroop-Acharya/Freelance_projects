import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  template: `
    <div class="change-password-container">
      <!-- Toast Message -->
      <div *ngIf="showToast" class="toast-message" [class.success]="successMessage" [class.error]="errorMessage">
        {{ successMessage || errorMessage }}
      </div>

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
            <div class="password-input-group">
              <input [type]="showCurrentPassword ? 'text' : 'password'" 
                     [(ngModel)]="currentPassword" 
                     name="currentPassword" 
                     required>
              <button type="button" class="toggle-password" (click)="showCurrentPassword = !showCurrentPassword">
                <i class="fas" [class.fa-eye]="!showCurrentPassword" [class.fa-eye-slash]="showCurrentPassword"></i>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label>New Password</label>
            <div class="password-input-group">
              <input [type]="showNewPassword ? 'text' : 'password'" 
                     [(ngModel)]="newPassword" 
                     name="newPassword" 
                     required>
              <button type="button" class="toggle-password" (click)="showNewPassword = !showNewPassword">
                <i class="fas" [class.fa-eye]="!showNewPassword" [class.fa-eye-slash]="showNewPassword"></i>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label>Confirm New Password</label>
            <div class="password-input-group">
              <input [type]="showConfirmPassword ? 'text' : 'password'" 
                     [(ngModel)]="confirmPassword" 
                     name="confirmPassword" 
                     required>
              <button type="button" class="toggle-password" (click)="showConfirmPassword = !showConfirmPassword">
                <i class="fas" [class.fa-eye]="!showConfirmPassword" [class.fa-eye-slash]="showConfirmPassword"></i>
              </button>
            </div>
          </div>

          <div class="password-requirements">
            <h3>Password Requirements:</h3>
            <ul class="requirements-list">
              <li [class.valid]="newPassword.length >= 8">
                <i class="fas" [class.fa-check-circle]="newPassword.length >= 8" [class.fa-times-circle]="newPassword.length < 8"></i>
                Minimum length 8 characters
              </li>
              <li [class.valid]="hasSpecialChar">
                <i class="fas" [class.fa-check-circle]="hasSpecialChar" [class.fa-times-circle]="!hasSpecialChar"></i>
                One special character
              </li>
              <li [class.valid]="hasUpperCase">
                <i class="fas" [class.fa-check-circle]="hasUpperCase" [class.fa-times-circle]="!hasUpperCase"></i>
                One uppercase letter
              </li>
            </ul>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" (click)="goBack()" [disabled]="isLoading">Cancel</button>
            <button type="submit" class="btn btn-primary" [disabled]="!isPasswordValid || isLoading">
              <span *ngIf="!isLoading">Update Password</span>
              <span *ngIf="isLoading">Updating...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .toast-message {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 4px;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    }

    .toast-message.success {
      background-color: #dcfce7;
      color: #166534;
      border-left: 4px solid #166534;
    }

    .toast-message.error {
      background-color: #fee2e2;
      color: #dc2626;
      border-left: 4px solid #dc2626;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

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

    .password-input-group {
      flex: 1;
      display: flex;
      align-items: center;
      position: relative;
    }

    .password-input-group input {
      flex: 1;
      padding: 0.75rem;
      padding-right: 40px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    .toggle-password {
      position: absolute;
      right: 10px;
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
      padding: 5px;
    }

    .toggle-password:hover {
      color: #406e8d;
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
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showToast = false;
  
  // Password visibility toggles
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

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

  showToastMessage(message: string, isSuccess: boolean) {
    if (isSuccess) {
      this.successMessage = message;
      this.errorMessage = '';
    } else {
      this.errorMessage = message;
      this.successMessage = '';
    }
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      if (isSuccess) {
        this.storageService.removeItem('token');
        window.location.href = 'http://localhost:8081/login';
      }
    }, 2000);
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.showToastMessage('New passwords do not match', false);
      return;
    }
    if (!this.isPasswordValid) {
      this.showToastMessage('Please meet all password requirements', false);
      return;
    }

    this.isLoading = true;

    this.authService.changePassword(this.currentPassword, this.newPassword)
      .subscribe({
        next: () => {
          this.showToastMessage('Password changed successfully', true);
        },
        error: (error) => {
          this.isLoading = false;
          this.showToastMessage(error.error || 'Failed to change password', false);
        }
      });
  }
} 