import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-settings">
      <h1>System Settings</h1>

      <div class="settings-grid">
        <!-- General Settings -->
        <div class="settings-card">
          <h2>General Settings</h2>
          <div class="setting-item">
            <label>Clinic Name</label>
            <input type="text" value="C2CAS Medical Center">
          </div>
          <div class="setting-item">
            <label>Email Address</label>
            <input type="email" value="contact@c2cas.com">
          </div>
          <div class="setting-item">
            <label>Phone Number</label>
            <input type="tel" value="+1 (555) 123-4567">
          </div>
          <div class="setting-item">
            <label>Address</label>
            <textarea rows="3">123 Medical Plaza, Healthcare City, HC 12345</textarea>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="settings-card">
          <h2>Notification Settings</h2>
          <div class="setting-item">
            <label class="toggle-label">
              <span>Email Notifications</span>
              <div class="toggle-switch">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </div>
            </label>
          </div>
          <div class="setting-item">
            <label class="toggle-label">
              <span>SMS Notifications</span>
              <div class="toggle-switch">
                <input type="checkbox">
                <span class="toggle-slider"></span>
              </div>
            </label>
          </div>
          <div class="setting-item">
            <label class="toggle-label">
              <span>Appointment Reminders</span>
              <div class="toggle-switch">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </div>
            </label>
          </div>
        </div>

        <!-- Security Settings -->
        <div class="settings-card">
          <h2>Security Settings</h2>
          <div class="setting-item">
            <label class="toggle-label">
              <span>Two-Factor Authentication</span>
              <div class="toggle-switch">
                <input type="checkbox">
                <span class="toggle-slider"></span>
              </div>
            </label>
          </div>
          <div class="setting-item">
            <label class="toggle-label">
              <span>Session Timeout (minutes)</span>
              <input type="number" value="30" min="5" max="120">
            </label>
          </div>
          <div class="setting-item">
            <label class="toggle-label">
              <span>Password Expiry (days)</span>
              <input type="number" value="90" min="30" max="365">
            </label>
          </div>
        </div>

        <!-- Backup Settings -->
        <div class="settings-card">
          <h2>Backup Settings</h2>
          <div class="setting-item">
            <label>Backup Frequency</label>
            <select>
              <option>Daily</option>
              <option selected>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div class="setting-item">
            <label>Backup Time</label>
            <input type="time" value="02:00">
          </div>
          <div class="setting-item">
            <label class="toggle-label">
              <span>Auto Backup</span>
              <div class="toggle-switch">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div class="settings-actions">
        <button class="save-btn">Save Changes</button>
        <button class="reset-btn">Reset to Default</button>
      </div>
    </div>
  `,
  styles: [`
    .admin-settings {
      padding: 1rem;
    }

    h1 {
      color: #1f2937;
      margin-bottom: 2rem;
    }

    .settings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .settings-card {
      background-color: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #1f2937;
      font-size: 1.25rem;
      margin: 0 0 1.5rem 0;
    }

    .setting-item {
      margin-bottom: 1.25rem;
    }

    .setting-item:last-child {
      margin-bottom: 0;
    }

    label {
      display: block;
      color: #4b5563;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    input[type="text"],
    input[type="email"],
    input[type="tel"],
    input[type="number"],
    input[type="time"],
    select,
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      color: #1f2937;
    }

    input:focus,
    select:focus,
    textarea:focus {
      outline: none;
      border-color: #406e8d;
    }

    .toggle-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0;
    }

    .toggle-switch {
      position: relative;
      width: 48px;
      height: 24px;
    }

    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #e5e7eb;
      transition: .4s;
      border-radius: 24px;
    }

    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }

    input:checked + .toggle-slider {
      background-color: #16a34a;
    }

    input:checked + .toggle-slider:before {
      transform: translateX(24px);
    }

    .settings-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }

    .save-btn {
      background-color: #16a34a;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 2rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .save-btn:hover {
      background-color: #15803d;
    }

    .reset-btn {
      background-color: #f3f4f6;
      color: #4b5563;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 2rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .reset-btn:hover {
      background-color: #e5e7eb;
    }
  `]
})
export class AdminSettingsComponent {} 