import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { faEnvelope, faLock, faScaleBalanced } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faScaleBalanced = faScaleBalanced;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log(response);
        if (response.success) {
          // this.router.navigate(['/dashboard']);
          this.toastr.success(response.message);
          console.log(response.message);
          if(response.user.role === 'CLIENT')
            this.router.navigate(['/client/addCase']);
          else if(response.user.role === 'LAWYER')
            this.router.navigate(['/lawyer/cases-dashboard']);
        } else {
          // this.errorMessage = response.message;
          this.toastr.error(response.message);
          console.log(response.message);
        }
      },
      error: (err) => {
        // this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        this.toastr.error(err.message);
      }
    });
  }
}