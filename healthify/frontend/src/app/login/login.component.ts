import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  template: `
    <div class="wrapper master-flex-align">
      <div class="coverpage_mask"></div>
      <div class="container-fluid">
        <article class="main-content">
          <div class="contianer-middle flex-align-middle">
            <div class="row content-hold-lg">
              <div class="col-md-12">
                <div class="card-widget p-relative">
                  <div class="card-body1 no-pad">
                    <div class="row d-flex">
                      <div class="col-md-6 child-flex">
                        <div class="login-image-side">
                          <img src="assets/images/login-imageNew1.jpg" alt="Login Visual" />
                        </div>
                      </div>
                      <div class="col-md-6 child-flex">
                        <div class="mid-block-wrapper">
                          <div class="container-mid-area">
                            <div class="form-hold align-mt-sm logo-align-mar60">
                              <div class="logo-inline-flex logo-align-mar20 adjust-aroundspace">
                                <img src="assets/images/synlog-logo.jpg" alt="SYNLOG" title="SYNLOG" style="width:auto;" />
                                <img src="assets/images/c2c-logo.png" alt="C2CAS" title="C2CAS" style="height:50px;" />
                              </div>
                            </div>
                            <div class="content-row mar-mig mb-1 logo-align-mar60">
                              <div class="form-hold">
                                <h3 class="heading-md">Welcome Back</h3>
                              </div>
                            </div>
                            
                            <form (ngSubmit)="onSubmit()" autocomplete="off">
                              <div class="content-row logo-align-mar30">
                                <div class="input-container" id="font-alignmid">
                                  <span><i class="fa fa-envelope icon"></i></span>
                                  <input class="input-field" type="email" placeholder="Your Mail ID" [(ngModel)]="email" name="email" required>
                                </div>
                              </div>
                              
                              <div class="content-row logo-align-mar30">
                                <div class="input-container" id="font-alignmid">
                                  <span><i class="fa fa-lock icon"></i></span>
                                  <input class="input-field" type="password" placeholder="Password" [(ngModel)]="password" name="password" required>
                                </div>
                              </div>
                              
                              <div class="content-row mar-mig btn-inline-justify logo-align-mar25">
                                <label class="remember-me">
                                  <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe" />
                                  Remember me
                                </label>
                                <a [routerLink]="['/forgot-password']" class="forgot-link">Forgot Password?</a>
                              </div>
                              
                              <div class="content-row mar-mig logo-align-mar25">
                                <button type="submit" class="btn btn-primary-green width-full">Login</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
    <footer class="hosp-app-footer">
      <div class="footer-custom">
        <p>Copyright &COPY; 2025. All rights reserved.</p>
        <p>Powered by SYNLOG</p>
      </div>
    </footer>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
    
    .wrapper {
      min-height: 100vh;
      width: 100vw;
      background: url('/assets/images/hospital-bg.jpg') no-repeat center center fixed;
      background-size: cover;
      position: relative;
      font-family: 'Montserrat', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .coverpage_mask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
    }

    .container-fluid {
      width: 100%;
      padding: 2rem;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .main-content {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .contianer-middle {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .content-hold-lg {
      max-width: 900px;
      margin: 0 auto;
      width: 100%;
    }

    .card-widget {
      background: #fff;
      border-radius: 16px;
      overflow: hidden;
      min-height: 600px;
      display: flex;
      flex-direction: column;
    }

    .card-body1 {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .row.d-flex {
      flex: 1;
      display: flex;
      flex-direction: row;
    }

    .col-md-6 {
      width: 50%;
      display: flex;
      flex-direction: column;
    }

    .login-image-side {
      background: #e6eef0;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }

    .login-image-side img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .mid-block-wrapper {
      padding: 2rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .container-mid-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .form-hold {
      width: 100%;
    }

    .logo-inline-flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
      width: 100%;
    }

    .logo-inline-flex img {
      max-height: 50px;
      width: auto;
    }

    .heading-md {
      font-size: 1.5rem;
      color: #406e8d;
      margin-bottom: 1.5rem;
    }

    .input-container {
      position: relative;
      margin-bottom: 1.5rem;
    }

    .input-field {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 1px solid #bfbfbf;
      border-radius: 6px;
      font-size: 1rem;
      font-family: 'Montserrat', sans-serif;
    }

    .icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #406e8d;
    }

    .btn-inline-justify {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .remember-me {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.95rem;
      color: #406e8d;
      font-weight: 500;
      cursor: pointer;
    }

    .remember-me input[type="checkbox"] {
      accent-color: #406e8d;
      width: 16px;
      height: 16px;
      margin: 0;
    }

    .forgot-link {
      color: #005aa1;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }

    .forgot-link:hover {
      color: #406e8d;
      text-decoration: underline;
    }

    .btn-primary-green {
      background: #16a34a;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 0.85rem 0;
      font-size: 1.1rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      cursor: pointer;
      width: 100%;
      transition: background 0.2s;
    }

    .btn-primary-green:hover {
      background: #15803d;
    }

    .width-full {
      width: 100%;
    }

    .hosp-app-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #eeeeee;
      padding: 0.5rem 1.5rem;
      z-index: 10;
    }

    .footer-custom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
      color: #555;
    }

    @media (max-width: 768px) {
      .col-md-6 {
        width: 100%;
      }
      .login-image-side {
        display: none;
      }
      .card-widget {
        border-radius: 0;
      }
    }
  `]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = true;
  private baseUrl = 'http://localhost:8081/auth';

  constructor(private router: Router, private http: HttpClient) {
    // Check if already logged in
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard/overview']);
    }
  }

  onSubmit() {
    if (this.email && this.password) {
      // Extract username from email if it contains @
      const username = this.email.includes('@') ? this.email.split('@')[0] : this.email;
      
      console.log('Attempting login with:', { username });
      
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
      
      const loginData = {
        username: username, // Use the extracted username
        password: this.password
      };

      console.log('Sending login request:', loginData);
      
      this.http.post<any>(`${this.baseUrl}/login`, loginData, { 
        headers, 
        observe: 'response',
        responseType: 'text' as 'json' // The backend returns a plain text token
      }).subscribe({
        next: (response) => {
          console.log('Login response:', response);
          if (response.body) {
            // Store the token in localStorage
            localStorage.setItem('token', response.body);
            
            // Navigate to dashboard/overview
            this.router.navigate(['/dashboard/overview']);
          } else {
            console.error('No token received in response');
            alert('Login failed: No authentication token received');
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          if (error.status === 401) {
            alert(error.error || 'Invalid username or password. Please check your credentials and try again.');
          } else {
            alert(`Login failed: ${error.error || 'An unknown error occurred'}`);
          }
        }
      });
    } else {
      alert('Please enter both email and password');
    }
  }
} 