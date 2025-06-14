import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications-dropdown">
      <div class="notifications-header">
        <h3>Notifications</h3>
        <button class="mark-all-read" (click)="markAllAsRead()">
          Mark all as read
        </button>
      </div>
      
      <div class="notifications-list">
        <div class="notification-item" *ngFor="let notification of notifications" [class.unread]="!notification.read">
          <div class="notification-icon">
            <i class="fas" [class.fa-user]="notification.type === 'user'"
                        [class.fa-calendar]="notification.type === 'appointment'"
                        [class.fa-pills]="notification.type === 'medicine'"></i>
          </div>
          <div class="notification-content">
            <p class="notification-text">{{notification.message}}</p>
            <span class="notification-time">{{notification.time}}</span>
          </div>
        </div>
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
      min-width: 300px;
      z-index: 1000;
    }

    .notifications-header {
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .notifications-header h3 {
      margin: 0;
      font-size: 1rem;
      color: #1e293b;
    }

    .mark-all-read {
      background: none;
      border: none;
      color: #3b82f6;
      font-size: 0.875rem;
      cursor: pointer;
    }

    .mark-all-read:hover {
      color: #2563eb;
    }

    .notifications-list {
      max-height: 400px;
      overflow-y: auto;
    }

    .notification-item {
      padding: 1rem;
      display: flex;
      gap: 1rem;
      border-bottom: 1px solid #e2e8f0;
      transition: background-color 0.2s;
    }

    .notification-item:hover {
      background-color: #f8fafc;
    }

    .notification-item.unread {
      background-color: #eff6ff;
    }

    .notification-icon {
      width: 40px;
      height: 40px;
      background-color: #dbeafe;
      color: #3b82f6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .notification-content {
      flex: 1;
    }

    .notification-text {
      margin: 0 0 0.25rem 0;
      color: #1e293b;
      font-size: 0.875rem;
    }

    .notification-time {
      color: #64748b;
      font-size: 0.75rem;
    }
  `]
})
export class NotificationsComponent {
  @Output() closeDropdown = new EventEmitter<void>();

  notifications = [
    {
      type: 'user',
      message: 'New patient registration',
      time: '5 minutes ago',
      read: false
    },
    {
      type: 'appointment',
      message: 'Appointment scheduled for tomorrow',
      time: '1 hour ago',
      read: false
    },
    {
      type: 'medicine',
      message: 'New medicine request from pharmacy',
      time: '2 hours ago',
      read: true
    }
  ];

  markAllAsRead() {
    this.notifications.forEach(notification => notification.read = true);
  }
} 