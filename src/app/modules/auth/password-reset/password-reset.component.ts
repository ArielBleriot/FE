import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ToastModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
  providers:[MessageService]
})
export class PasswordResetComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  resetToken!: string;
  isSubmitting!:boolean;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,private toastService: MessageService
  ) {}

  ngOnInit(): void {
    // Get the token from the URL
    this.resetToken = this.route.snapshot.queryParamMap.get('token') || '';
    // this.route.paramMap.subscribe(params => {
    //   const resetToken = params.get('token');  // Now 'get' method works correctly
    //   console.log(resetToken);
    // });
    // Initialize form
    this.resetPasswordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validator: this.passwordsMatchValidator }
    );
  }

  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  // Custom validator to check if passwords match
  passwordsMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mustMatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  // Handle form submission
  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.resetToken) {
      const request= this.resetPasswordForm.value;
      request.token=this.resetToken;
      this.isSubmitting=true;

      // Call the service to reset the password
      this.apiService.resetPassword(request).subscribe(
        (response) => {
          if(response.successfull)
            {
              this.toastService.add({severity: 'success', summary: '', detail: response.message});
              this.isSubmitting=false;
              this.router.navigate(['/accounts/login']);
            }
            else
            {
              this.toastService.add({severity: 'error', summary: 'Error', detail: response.message});
              this.isSubmitting=false;
            }
        },
        (error) => {
          this.toastService.add({severity: 'error', summary: 'Something went wrong', detail: error.error.message});
          this.isSubmitting = false;
        }
      );
    }
  }
}