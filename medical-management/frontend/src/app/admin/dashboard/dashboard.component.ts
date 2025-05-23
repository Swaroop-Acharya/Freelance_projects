import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <!-- Statistics Cards -->
      <div class="stats-grid">
        <!-- Total Users Card -->
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-user-md"></i>
          </div>
          <div class="stat-content">
            <h3 class="stat-title">Total Users</h3>
            <p class="stat-value">1,200</p>
            <a href="#" class="more-info">More info</a>
          </div>
        </div>

        <!-- Active Patients Card -->
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-content">
            <h3 class="stat-title">Active Patients</h3>
            <p class="stat-value">653</p>
            <a href="#" class="more-info">More info</a>
          </div>
        </div>

        <!-- Prescription Card -->
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-file-text"></i>
          </div>
          <div class="stat-content">
            <h3 class="stat-title">Prescription</h3>
            <p class="stat-value">830</p>
            <a href="#" class="more-info">More info</a>
          </div>
        </div>

        <!-- Total Payments Card -->
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-usd"></i>
          </div>
          <div class="stat-content">
            <h3 class="stat-title">Total Payments</h3>
            <p class="stat-value">$6,505,600.00</p>
            <a href="#" class="more-info">More info</a>
          </div>
        </div>
      </div>

      <!-- Rest of the dashboard content -->
      <div class="dashboard-content">
        <!-- Add your dashboard content here -->
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 1.5rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: transform 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 0.5rem;
      background-color: #554699;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
    }

    .stat-content {
      flex: 1;
    }

    .stat-title {
      color: #666;
      font-size: 0.875rem;
      margin: 0;
    }

    .stat-value {
      color: #333;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0.25rem 0;
    }

    .more-info {
      color: #554699;
      text-decoration: none;
      font-size: 0.875rem;
      display: inline-block;
      margin-top: 0.5rem;
    }

    .more-info:hover {
      text-decoration: underline;
    }

    .dashboard-content {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminDashboardComponent {
  // Add any component logic here
} 