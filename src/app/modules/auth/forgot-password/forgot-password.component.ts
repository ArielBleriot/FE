import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ToastModule],
  providers:[MessageService],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  form!: FormGroup;  // Define a reactive form group
  isSubmitting = false;  // Flag to check if the form is being submitted
  loginError = '';  // Store any login errors from API

  constructor(private fb: FormBuilder, private authService: ApiService,private router: Router,private toastService: MessageService) {}

  ngOnInit() {
    // Initialize the form with form controls and validations
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email validation
    });
  }
  onSubmit() {
    this.isSubmitting = true;

    // Check if the form is valid
    if (this.form.invalid) {
      this.isSubmitting = false;
      return;
    }

    // Get form values
    const { email } = this.form.value;

    // Call login API
    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        if(response)
        {
          this.toastService.add({severity: 'success', summary: '', detail: 'Passowrd Reset link sent'});
          this.isSubmitting=false;
        }
        else
        {
          this.toastService.add({severity: 'error', summary: 'Error', detail: 'Email does not exists'});
          this.isSubmitting=false;
        }
        
      },
      error: (err) => {
        // Handle error (e.g., incorrect credentials)
        this.toastService.add({severity: 'error', summary: 'Something went wrong', detail: err.error.message});
        this.isSubmitting = false;
      },
    });
  }
}
