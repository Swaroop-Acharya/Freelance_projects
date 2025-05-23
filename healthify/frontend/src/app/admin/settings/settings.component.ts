import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SystemSettings {
  hospitalName: string;
  email: string;
  phone: string;
  language: string;
  timeZone: string;
  address: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-container">
      <h2 class="text-xl font-semibold mb-6">System Settings</h2>
      
      <form class="settings-form" (ngSubmit)="onSubmit()">
        <div class="grid grid-cols-2 gap-6">
          <!-- Hospital Name -->
          <div class="form-group">
            <label class="form-label">Hospital Name</label>
            <input 
              type="text" 
              class="form-input" 
              [(ngModel)]="settings.hospitalName" 
              name="hospitalName"
              required
            >
          </div>

          <!-- Email -->
          <div class="form-group">
            <label class="form-label">Email</label>
            <input 
              type="email" 
              class="form-input" 
              [(ngModel)]="settings.email" 
              name="email"
              required
            >
          </div>

          <!-- Phone -->
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input 
              type="tel" 
              class="form-input" 
              [(ngModel)]="settings.phone" 
              name="phone"
              required
            >
          </div>

          <!-- Language -->
          <div class="form-group">
            <label class="form-label">Language</label>
            <select 
              class="form-input" 
              [(ngModel)]="settings.language" 
              name="language"
              required
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <!-- Time Zone -->
          <div class="form-group">
            <label class="form-label">Time Zone</label>
            <select 
              class="form-input" 
              [(ngModel)]="settings.timeZone" 
              name="timeZone"
              required
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="CST">Central Time</option>
              <option value="PST">Pacific Time</option>
            </select>
          </div>

          <!-- Address -->
          <div class="form-group col-span-2">
            <label class="form-label">Address</label>
            <textarea 
              class="form-input" 
              [(ngModel)]="settings.address" 
              name="address"
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-4 mt-6">
          <button 
            type="button" 
            class="btn btn-secondary"
            (click)="resetForm()"
          >
            Reset
          </button>
          <button 
            type="submit" 
            class="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 1.5rem;
    }

    .settings-form {
      background-color: white;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    .col-span-2 {
      grid-column: span 2;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .form-input {
      padding: 0.5rem 0.75rem;
      border: 1px solid #D1D5DB;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      color: #1F2937;
      transition: border-color 0.15s ease-in-out;
    }

    .form-input:focus {
      outline: none;
      border-color: #406e8d;
      box-shadow: 0 0 0 3px rgba(64, 110, 141, 0.1);
    }

    .form-input::placeholder {
      color: #9CA3AF;
    }

    textarea.form-input {
      resize: vertical;
      min-height: 100px;
    }

    .btn {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease-in-out;
    }

    .btn-primary {
      background-color: #406e8d;
      color: white;
      border: none;
    }

    .btn-primary:hover {
      background-color: #345a77;
    }

    .btn-secondary {
      background-color: white;
      color: #374151;
      border: 1px solid #D1D5DB;
    }

    .btn-secondary:hover {
      background-color: #F9FAFB;
    }

    .flex {
      display: flex;
    }

    .justify-end {
      justify-content: flex-end;
    }

    .gap-4 {
      gap: 1rem;
    }

    .mt-6 {
      margin-top: 1.5rem;
    }

    .text-xl {
      font-size: 1.25rem;
    }

    .font-semibold {
      font-weight: 600;
    }

    .mb-6 {
      margin-bottom: 1.5rem;
    }
  `]
})
export class SettingsComponent {
  settings: SystemSettings = {
    hospitalName: '',
    email: '',
    phone: '',
    language: 'en',
    timeZone: 'UTC',
    address: ''
  };

  resetForm() {
    this.settings = {
      hospitalName: '',
      email: '',
      phone: '',
      language: 'en',
      timeZone: 'UTC',
      address: ''
    };
  }

  onSubmit() {
    console.log('Settings submitted:', this.settings);
    // Implement your save logic here
  }
} 