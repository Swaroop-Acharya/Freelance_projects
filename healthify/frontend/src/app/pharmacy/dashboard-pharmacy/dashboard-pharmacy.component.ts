import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-pharmacy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <!-- Statistics Grid -->
      <div class="grid-container">
        <!-- Pending Requests -->
        <div class="stat-box bg-white rounded-lg shadow-md overflow-hidden group transition-colors duration-200 cursor-pointer hover:bg-[#406e8d]"
             (mouseenter)="pendingRequestsHover = true" (mouseleave)="pendingRequestsHover = false">
          <div class="p-6 flex items-center justify-between">
            <div>
              <div class="text-6xl font-bold transition-colors duration-200 group-hover:text-white text-gray-800">23</div>
              <div class="text-lg transition-colors duration-200 group-hover:text-white text-gray-600">Pending Requests</div>
            </div>
            <img [src]="pendingRequestsHover ? 'assets/images/appointments-white.png' : 'assets/images/appointments-blue.png'"
                 class="w-12 h-12 ml-4 transition-all duration-200" alt="Pending Requests">
          </div>
          <a href="#" class="small-box-footer block bg-[#4a88b5] text-white p-2 text-sm text-center hover:bg-[#3b719a] transition-colors duration-200">
            More info <i class="fa fa-arrow-circle-right ml-2"></i>
          </a>
        </div>

        <!-- Low Stock Items -->
        <div class="stat-box bg-white rounded-lg shadow-md overflow-hidden group transition-colors duration-200 cursor-pointer hover:bg-[#406e8d]"
             (mouseenter)="lowStockHover = true" (mouseleave)="lowStockHover = false">
          <div class="p-6 flex items-center justify-between">
            <div>
              <div class="text-6xl font-bold transition-colors duration-200 group-hover:text-white text-gray-800">8</div>
              <div class="text-lg transition-colors duration-200 group-hover:text-white text-gray-600">Low Stock Items</div>
            </div>
            <img [src]="lowStockHover ? 'assets/images/patient_line_white.png' : 'assets/images/patient_line.png'"
                 class="w-12 h-12 ml-4 transition-all duration-200" alt="Low Stock Items">
          </div>
          <a href="#" class="small-box-footer block bg-[#4a88b5] text-white p-2 text-sm text-center hover:bg-[#3b719a] transition-colors duration-200">
            More info <i class="fa fa-arrow-circle-right ml-2"></i>
          </a>
        </div>

        <!-- Expiring Soon -->
        <div class="stat-box bg-white rounded-lg shadow-md overflow-hidden group transition-colors duration-200 cursor-pointer hover:bg-[#406e8d]"
             (mouseenter)="expiringSoonHover = true" (mouseleave)="expiringSoonHover = false">
          <div class="p-6 flex items-center justify-between">
            <div>
              <div class="text-6xl font-bold transition-colors duration-200 group-hover:text-white text-gray-800">12</div>
              <div class="text-lg transition-colors duration-200 group-hover:text-white text-gray-600">Expiring Soon</div>
            </div>
            <img [src]="expiringSoonHover ? 'assets/images/prescription_white.png' : 'assets/images/prescription_blue.png'"
                 class="w-12 h-12 ml-4 transition-all duration-200" alt="Expiring Soon">
          </div>
          <a href="#" class="small-box-footer block bg-[#4a88b5] text-white p-2 text-sm text-center hover:bg-[#3b719a] transition-colors duration-200">
            More info <i class="fa fa-arrow-circle-right ml-2"></i>
          </a>
        </div>

        <!-- Payments -->
        <div class="stat-box bg-white rounded-lg shadow-md overflow-hidden group transition-colors duration-200 cursor-pointer hover:bg-[#406e8d]"
             (mouseenter)="paymentsHover = true" (mouseleave)="paymentsHover = false">
          <div class="p-6 flex items-center justify-between">
            <div>
              <div class="text-6xl font-bold transition-colors duration-200 group-hover:text-white text-gray-800">$2,450</div>
              <div class="text-lg transition-colors duration-200 group-hover:text-white text-gray-600">Payments</div>
            </div>
            <img [src]="paymentsHover ? 'assets/images/prescription_white.png' : 'assets/images/prescription_blue.png'"
                 class="w-12 h-12 ml-4 transition-all duration-200" alt="Payments">
          </div>
          <a href="#" class="small-box-footer block bg-[#4a88b5] text-white p-2 text-sm text-center hover:bg-[#3b719a] transition-colors duration-200">
            More info <i class="fa fa-arrow-circle-right ml-2"></i>
          </a>
        </div>
      </div>

      <!-- Recent Activity and Low Stock -->
      <div class="dashboard-grid">
        <!-- Expiring Soon -->
        <div class="dashboard-card">
          <div class="card-header">
            <h2>Expiring Soon</h2>
          </div>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-pills"></i>
              </div>
              <div class="activity-details">
                <p class="activity-text">Amoxicillin 500mg</p>
                <p class="activity-time">2 days ago</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-pills"></i>
              </div>
              <div class="activity-details">
                <p class="activity-text">Lisinopril 10mg</p>
                <p class="activity-time">2 days ago</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-pills"></i>
              </div>
              <div class="activity-details">
                <p class="activity-text">Metformin 1000mg</p>
                <p class="activity-time">1 day ago</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-pills"></i>
              </div>
              <div class="activity-details">
                <p class="activity-text">Atorvastatin 20mg</p>
                <p class="activity-time">Today</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-pills"></i>
              </div>
              <div class="activity-details">
                <p class="activity-text">Omeprazole 20mg</p>
                <p class="activity-time">Tomorrow</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-pills"></i>
              </div>
              <div class="activity-details">
                <p class="activity-text">Simvastatin 40mg</p>
                <p class="activity-time">2 days from now</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Low Stock Medicines -->
        <div class="dashboard-card">
          <div class="card-header">
            <h2>Low Stock Medicines</h2>
          </div>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-exclamation-circle"></i>
              </div>
              <div class="activity-details">
                <p class="activity-text">Paracetamol 500mg</p>
                <p class="activity-time critical">5 units left</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-exclamation-circle"></i>
              </div>
              <div class="activity-details">
                <p class="activity-text">Amoxicillin 250mg</p>
                <p class="activity-time warning">15 units left</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-exclamation-circle"></i>
              </div>
              <div class="activity-details">
                <p class="activity-text">Ibuprofen 400mg</p>
                <p class="activity-time warning">12 units left</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-exclamation-circle"></i>
              </div>
              <div class="activity-details">
                <p class="activity-text">Aspirin 100mg</p>
                <p class="activity-time critical">3 units left</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-exclamation-circle"></i>
              </div>
              <div class="activity-details">
                <p class="activity-text">Cetirizine 10mg</p>
                <p class="activity-time warning">8 units left</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-exclamation-circle"></i>
              </div>
              <div class="activity-details">
                <p class="activity-text">Omeprazole 20mg</p>
                <p class="activity-time critical">4 units left</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Chart Section -->
      <div class="chart-section">
        <div class="dashboard-card">
          <div class="card-header">
            <h2>Payment Details - March 2025</h2>
          </div>
          <div class="chart-container">
            <div class="chart">
              <div class="y-axis">
                <div class="y-label">10k</div>
                <div class="y-label">8k</div>
                <div class="y-label">6k</div>
                <div class="y-label">4k</div>
                <div class="y-label">2k</div>
                <div class="y-label">0</div>
              </div>
              <div class="chart-bars">
                <div class="chart-bar" *ngFor="let day of chartData">
                  <div class="bar-container">
                    <div class="bar" 
                         [style.height.%]="(day.total / 10) * 100"
                         [style.background]="getBarColor(day.total)">
                      <span class="bar-value">{{formatValue(day.total)}}</span>
                    </div>
                  </div>
                  <span class="bar-label">{{day.date}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 1rem;
    }

    .grid-container {
      display: flex;
      flex-direction: row;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-box {
      flex: 1;
      transition: all 0.3s ease;
    }

    .stat-box:hover {
      background-color: #406e8d !important;
    }

    .stat-box:hover .text-gray-800,
    .stat-box:hover .text-gray-600 {
      color: white !important;
    }

    .bg-white {
      background-color: white;
    }

    .rounded-lg {
      border-radius: 0.5rem;
    }

    .shadow-md {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .overflow-hidden {
      overflow: hidden;
    }

    .group {
      position: relative;
    }

    .transition-colors {
      transition-property: background-color, border-color, color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 200ms;
    }

    .duration-200 {
      transition-duration: 200ms;
    }

    .cursor-pointer {
      cursor: pointer;
    }

    .p-6 {
      padding: 1.5rem;
    }

    .flex {
      display: flex;
    }

    .items-center {
      align-items: center;
    }

    .justify-between {
      justify-content: space-between;
    }

    .text-6xl {
      font-size: 3.75rem;
      line-height: 1;
    }

    .font-bold {
      font-weight: 700;
    }

    .text-gray-800 {
      color: #1f2937;
      transition: color 0.3s ease;
    }

    .text-lg {
      font-size: 1.125rem;
      line-height: 1.75rem;
    }

    .text-gray-600 {
      color: #4b5563;
      transition: color 0.3s ease;
    }

    .w-12 {
      width: 3rem;
    }

    .h-12 {
      height: 3rem;
    }

    .ml-4 {
      margin-left: 1rem;
    }

    .transition-all {
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 200ms;
    }

    .small-box-footer {
      background-color: #4a88b5;
      color: white;
      padding: 0.5rem;
      font-size: 0.875rem;
      text-align: center;
      transition: background-color 0.2s;
    }

    .small-box-footer:hover {
      background-color: #3b719a;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
    }

    .dashboard-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .card-header h2 {
      font-size: 1.25rem;
      color: #333;
      margin: 0;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-height: 400px;
      overflow-y: auto;
      padding-right: 0.5rem;
    }

    .activity-list::-webkit-scrollbar {
      width: 6px;
    }

    .activity-list::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    .activity-list::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 3px;
    }

    .activity-list::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .activity-item:hover {
      background-color: #f8f9fa;
    }

    .activity-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #e3f2fd;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1976d2;
    }

    .activity-details {
      flex: 1;
    }

    .activity-text {
      margin: 0 0 0.25rem 0;
      color: #333;
      font-weight: 500;
    }

    .activity-time {
      margin: 0;
      font-size: 0.875rem;
      color: #666;
    }

    .activity-time.critical {
      color: #e74c3c;
    }

    .activity-time.warning {
      color: #f39c12;
    }

    .chart-section {
      margin-top: 2rem;
    }

    .chart-container {
      padding: 1rem;
      background: white;
      border-radius: 8px;
    }

    .chart {
      width: 100%;
      height: 400px;
      display: flex;
      flex-direction: row;
      gap: 20px;
      position: relative;
    }

    .y-axis {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px 0;
      border-right: 1px solid #eee;
      min-width: 60px;
      height: 300px;
      position: absolute;
      left: 0;
      top: 0;
    }

    .y-label {
      font-size: 12px;
      color: #666;
      text-align: right;
      padding-right: 10px;
    }

    .chart-bars {
      flex: 1;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 4px;
      padding: 20px 0;
      border-bottom: 1px solid #eee;
      height: 300px;
      margin-left: 70px;
    }

    .chart-bar {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      height: 100%;
    }

    .bar-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    .bar {
      width: 100%;
      min-height: 2px;
      border-radius: 4px 4px 0 0;
      transition: all 0.3s ease;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bar-value {
      position: absolute;
      font-size: 10px;
      color: white;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
      transform: rotate(-90deg);
      white-space: nowrap;
      z-index: 1;
    }

    .bar-label {
      font-size: 12px;
      color: #666;
      margin-top: 8px;
    }
  `]
})
export class DashboardPharmacyComponent implements OnInit {
  chartData = [
    { date: '1 Mar', total: 7.3 },
    { date: '2 Mar', total: 8.4 },
    { date: '3 Mar', total: 6.3 },
    { date: '4 Mar', total: 7.8 },
    { date: '5 Mar', total: 8.8 },
    { date: '6 Mar', total: 7.6 },
    { date: '7 Mar', total: 8.2 },
    { date: '8 Mar', total: 6.6 },
    { date: '9 Mar', total: 7.6 },
    { date: '10 Mar', total: 8.8 },
    { date: '11 Mar', total: 7.8 },
    { date: '12 Mar', total: 8.8 },
    { date: '13 Mar', total: 9.4 },
    { date: '14 Mar', total: 8.4 },
    { date: '15 Mar', total: 7.6 },
    { date: '16 Mar', total: 8.2 },
    { date: '17 Mar', total: 8.8 },
    { date: '18 Mar', total: 7.8 },
    { date: '19 Mar', total: 8.4 },
    { date: '20 Mar', total: 9.4 },
    { date: '21 Mar', total: 8.2 },
    { date: '22 Mar', total: 7.6 },
    { date: '23 Mar', total: 8.8 },
    { date: '24 Mar', total: 8.4 },
    { date: '25 Mar', total: 7.8 },
    { date: '26 Mar', total: 8.8 },
    { date: '27 Mar', total: 9.4 },
    { date: '28 Mar', total: 8.4 },
    { date: '29 Mar', total: 7.6 },
    { date: '30 Mar', total: 8.8 },
    { date: '31 Mar', total: 7.6 }
  ];

  formatValue(value: number): string {
    return `$${value}k`;
  }

  getBarColor(value: number): string {
    // Calculate color based on value (0-10k)
    const percentage = (value / 10) * 100;
    if (percentage < 20) {
      return '#8B0000'; // Dark Red
    } else if (percentage < 40) {
      return '#800080'; // Purple
    } else if (percentage < 60) {
      return '#4B0082'; // Indigo
    } else if (percentage < 70) {
      return '#483D8B'; // Dark Slate Blue
    } else if (percentage < 80) {
      return '#2F4F4F'; // Dark Slate Gray
    } else if (percentage < 90) {
      return '#006400'; // Dark Green
    } else {
      return '#000080'; // Navy
    }
  }

  pendingRequestsHover = false;
  lowStockHover = false;
  expiringSoonHover = false;
  paymentsHover = false;

  constructor() {}

  ngOnInit(): void {}
} 