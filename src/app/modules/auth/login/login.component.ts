import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,RouterLink,ReactiveFormsModule,ToastModule],
  providers:[MessageService],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;  // Define a reactive form group
  isSubmitting = false;  // Flag to check if the form is being submitted
  loginError = '';  // Store any login errors from API

  constructor(private fb: FormBuilder, private authService: ApiService,private router: Router,private toastService: MessageService) {}

  ngOnInit() {
    // Initialize the form with form controls and validations
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email validation
      password: ['', [Validators.required, Validators.minLength(6)]],  // Password validation
      rememberMe: [false],  // Default checkbox value
    });
  }

  // Getter to easily access form controls in the template
  get f() {
    return this.loginForm.controls;
  }

  // Submit the form
  onSubmit() {
    this.isSubmitting = true;

    // Check if the form is valid
    if (this.loginForm.invalid) {
      this.isSubmitting = false;
      return;
    }

    // Get form values
    const { email, password, rememberMe } = this.loginForm.value;

    // Call login API
    this.authService.login(email, password).subscribe({
      next: (response) => {
        // Handle successful login (store token, redirect, etc.)
        console.log(response);  // Assume response contains the JWT token
        localStorage.setItem('AuthToken', response.token);  // Store token in local storage
        localStorage.setItem('fullName',response.fullName);
        localStorage.setItem('studentId',response.studentId);
        localStorage.setItem('email',response.email);
        localStorage.setItem('universityName',response.universityName);
        
        this.router.navigate(['/']);
        
      },
      error: (err) => {
        debugger;
        // Handle error (e.g., incorrect credentials)
        this.toastService.add({severity: 'error', summary: 'Login failed', detail: err.error.message});
        this.loginError = 'Invalid credentials. Please try again.';
        this.isSubmitting = false;
      },
    });
  }
}
