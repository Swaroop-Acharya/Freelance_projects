import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  settings = {
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium'
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: true,
      showPhone: false
    },
    language: 'en'
  };

  themes = ['light', 'dark', 'system'];
  fontSizes = ['small', 'medium', 'large'];
  languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' }
  ];
  visibilityOptions = ['public', 'private', 'contacts'];

  saveSettings() {
    // Here you would typically make an API call to save the settings
    console.log('Settings saved:', this.settings);
  }
} 