import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notification {
  id: number;
  message: string;
  isNew?: boolean;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications-dropdown" *ngIf="showDropdown">
      <div class="notifications-header">
        <h3>You have {{ notifications.length }} notifications</h3>
      </div>

      <div class="notifications-list">
        <div 
          *ngFor="let notification of notifications" 
          class="notification-item"
          [class.new]="notification.isNew"
        >
          {{ notification.message }}
        </div>
      </div>

      <div class="notifications-footer">
        <button class="view-all-button" (click)="viewAll()">
          View all
        </button>
      </div>
    </div>
  `,
  styles: [`
    .notifications-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 0.5rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      min-width: 320px;
      z-index: 1000;
    }

    .notifications-header {
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .notifications-header h3 {
      margin: 0;
      color: #374151;
      font-size: 1rem;
      font-weight: 600;
    }

    .notifications-list {
      max-height: 400px;
      overflow-y: auto;
    }

    .notification-item {
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
      color: #4b5563;
      font-size: 0.875rem;
      line-height: 1.5;
      word-wrap: break-word;
    }

    .notification-item.new {
      background-color: #f3f4f6;
    }

    .notification-item:last-child {
      border-bottom: none;
    }

    .notifications-footer {
      padding: 0.75rem;
      border-top: 1px solid #e5e7eb;
      text-align: center;
    }

    .view-all-button {
      background: none;
      border: none;
      color: #4a90e2;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      padding: 0.5rem;
      transition: color 0.2s;
    }

    .view-all-button:hover {
      color: #357abd;
    }
  `]
})
export class NotificationsComponent {
  @Output() closeDropdown = new EventEmitter<void>();

  showDropdown = true;
  notifications: Notification[] = [
    {
      id: 1,
      message: '5 new members joined today',
      isNew: true
    },
    {
      id: 2,
      message: 'Very long description here that may not fit into the page and may cause design problems',
      isNew: true
    },
    {
      id: 3,
      message: '5 new members joined',
      isNew: true
    },
    {
      id: 4,
      message: '25 sales made',
      isNew: true
    },
    {
      id: 5,
      message: 'You changed your username',
      isNew: true
    }
  ];

  viewAll() {
    console.log('View all notifications');
    this.closeDropdown.emit();
  }
} 