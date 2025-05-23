import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-dashboard">
      <div class="dashboard-container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-content">
              <p class="stat-value">1,200</p>
              <h3 class="stat-title">Total Users</h3>
            </div>
            <div class="stat-icon">
              <i class="fas fa-user-md"></i>
            </div>
            <button class="more-info-btn">
              More info <i class="fas fa-chevron-right"></i>
            </button>
          </div>

          <div class="stat-card">
            <div class="stat-content">
              <p class="stat-value">653</p>
              <h3 class="stat-title">Active Patients</h3>
            </div>
            <div class="stat-icon">
              <i class="fas fa-users"></i>
            </div>
            <button class="more-info-btn">
              More info <i class="fas fa-chevron-right"></i>
            </button>
          </div>

          <div class="stat-card">
            <div class="stat-content">
              <p class="stat-value">830</p>
              <h3 class="stat-title">Prescription</h3>
            </div>
            <div class="stat-icon">
              <i class="fas fa-file-text"></i>
            </div>
            <button class="more-info-btn">
              More info <i class="fas fa-chevron-right"></i>
            </button>
          </div>

          <div class="stat-card">
            <div class="stat-content">
              <p class="stat-value">$6,505,600.00</p>
              <h3 class="stat-title">Total Payments</h3>
            </div>
            <div class="stat-icon">
              <i class="fas fa-usd"></i>
            </div>
            <button class="more-info-btn">
              More info <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      padding: 1rem;
    }

    .dashboard-container {
      width: 100%;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }

    .stat-card {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      padding-bottom: 0;
      display: flex;
      flex-direction: column;
      position: relative;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
    }

    .stat-content {
      flex: 1;
      margin-bottom: 1rem;
    }

    .stat-value {
      color: #1f2937;
      font-size: 1.75rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }

    .stat-title {
      color: #6b7280;
      font-size: 0.875rem;
      margin: 0;
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      background-color: #554699;
      color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
    }

    .more-info-btn {
      background-color: #406e8d;
      color: white;
      border: none;
      padding: 0.75rem;
      width: calc(100% + 3rem);
      margin: 0 -1.5rem;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: background-color 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .more-info-btn:hover {
      background-color: #345a75;
    }

    .more-info-btn i {
      font-size: 0.75rem;
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminDashboardComponent {} 