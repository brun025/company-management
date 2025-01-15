import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid && !this.submitting) {
      this.submitting = true;
      
      this.authService.login(this.loginForm.value)
        .subscribe({
          next: () => {
            this.toastr.success(this.translate.instant('LOGIN.MESSAGES.LOGIN_SUCCESS'));
            this.router.navigate(['/companies']);
          },
          error: (error) => {
            console.error('Login error:', error);
            this.toastr.error(this.translate.instant('LOGIN.MESSAGES.LOGIN_ERROR'));
            this.submitting = false;
          }
        });
    }
  }
}