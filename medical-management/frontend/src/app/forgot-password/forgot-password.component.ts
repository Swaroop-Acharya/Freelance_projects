import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
                          <img src="assets/images/forgot-pw.jpg" alt="Forgot Password Visual" />
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
                                <h3 class="heading-md">Forgot Password</h3>
                              </div>
                            </div>
                            
                            <div class="content-row logo-align-mar30" *ngIf="!showSuccess">
                              <div class="input-container" id="font-alignmid">
                                <span><i class="fa fa-envelope icon"></i></span>
                                <input class="input-field" type="email" placeholder="Enter your email id" [(ngModel)]="email" name="email">
                                <span class="validate-error-message" *ngIf="errorMessage">{{errorMessage}}</span>
                              </div>
                            </div>
                            
                            <div class="content-row mar-mig btn-inline-justify logo-align-mar25" *ngIf="!showSuccess">
                              <a [routerLink]="['/login']" class="bottom-text22">Back to Login</a>
                              <button (click)="onSubmit()" class="btn btn-primary-green width-sm">Submit</button>
                            </div>
                            
                            <div class="content-row forgotpw-success-sec" *ngIf="showSuccess">
                              <div class="icon-hold">
                                <span class="head-fa">
                                  <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
                                </span>
                              </div>
                              <h3 class="message-head">Check Your Mail</h3>
                              <p>Please check the email address associated with the username for instructions to reset your password</p>
                              <div class="content-row mar-mig logo-align-mar25">
                                <a [routerLink]="['/login']" class="btn btn-primary-green width-full">Back to Login</a>
                              </div>
                            </div>
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

    .validate-error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
    }

    .btn-inline-justify {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .bottom-text22 {
      color: #005aa1;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }

    .bottom-text22:hover {
      color: #406e8d;
      text-decoration: underline;
    }

    .btn-primary-green {
      background: #16a34a;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 0.85rem 1.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-primary-green:hover {
      background: #15803d;
    }

    .width-sm {
      min-width: 120px;
    }

    .width-full {
      width: 100%;
    }

    .forgotpw-success-sec {
      text-align: center;
      padding: 2rem 0;
    }

    .icon-hold {
      margin-bottom: 1.5rem;
    }

    .head-fa {
      font-size: 3rem;
      color: #16a34a;
    }

    .message-head {
      color: #406e8d;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .forgotpw-success-sec p {
      color: #666;
      margin-bottom: 2rem;
      line-height: 1.5;
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
export class ForgotPasswordComponent {
  email: string = '';
  errorMessage: string = '';
  showSuccess: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.email) {
      this.errorMessage = 'Please enter your email address';
      return;
    }
    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }
    
    // Show success message
    this.showSuccess = true;
    this.errorMessage = '';
    
    // After 3 seconds, redirect to login
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }

  private validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }
}
