import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface UserProfile {
  fullName: string;
  employeeCode: string;
  email: string;
  roleName: string;
  phoneNumber?: string;
  location?: string;
  oldPassword?: string | null;
  newPassword?: string | null;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile = {
    fullName: '',
    employeeCode: '',
    email: '',
    roleName: '',
    phoneNumber: 'XXXXXXXXX', // Dummy data for fields not in API
    location: 'Malaysia' // Dummy data for fields not in API
  };

  private baseUrl = 'http://localhost:8081';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.fetchUserProfile();
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  goBack() {
    window.history.back();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private fetchUserProfile() {
    const headers = this.getHeaders();
    
    this.http.get<UserProfile>(`${this.baseUrl}/nurse/profile`, { headers }).subscribe({
      next: (profile) => {
        // Format email if it doesn't contain @gmail.com
        const formattedEmail = profile.email.includes('@') 
          ? profile.email 
          : `${profile.email}@gmail.com`;

        this.userProfile = {
          ...this.userProfile, // Keep dummy data for missing fields
          fullName: profile.fullName,
          employeeCode: profile.employeeCode,
          email: formattedEmail,
          roleName: profile.roleName
        };
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
      }
    });
  }
} 