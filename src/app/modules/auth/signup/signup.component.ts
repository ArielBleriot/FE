import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';  // Corrected import
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-signup',
  standalone: true,
  providers:[MessageService],
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink,RouterModule,ToastModule,MultiSelectModule,AutoCompleteModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
 
  signupForm!: FormGroup;
  isSubmitting = false;
 fieldsOfStudy = [
    { name: "Computer Science" },
    { name: "Business" },
    { name: "Engineering" },
    { name: "Design" },
    { name: "Health Sciences" },
    { name: "Education" },
    { name: "Mathematics" },
    { name: "Social Sciences" },
    { name: "Arts" },
    { name: "Law" },
    { name: "Environmental Science" },
    { name: "Psychology" },
    { name: "Economics" },
    { name: "Political Science" },
    { name: "Architecture" },
    { name: "Music" },
    { name: "Philosophy" },
    { name: "Chemistry" },
    { name: "Physics" },
    { name: "Linguistics" },
    { name: "History" },
    { name: "Sociology" },
    { name: "Agriculture" },
    { name: "Hospitality Management" },
    { name: "Sports Science" },
    { name: "Public Administration" },
    { name: "Journalism" },
    { name: "Media Studies" },
    { name: "Data Science" },
    { name: "Artificial Intelligence" },
    { name: "Cybersecurity" },
    { name: "Game Development" },
    { name: "Film Studies" },
    { name: "Marketing" },
    { name: "Finance" },
    { name: "Human Resources" },
    { name: "Supply Chain Management" },
    { name: "Public Relations" },
    { name: "Tourism Management" },
    { name: "Veterinary Science" },
    { name: "Theology" },
    { name: "Social Work" },
    { name: "Nursing" },
    { name: "Biotechnology" },
    { name: "Robotics" }
  ];
  
 personalInterests = [
    { name: "Technology" },
    { name: "Music" },
    { name: "Photography" },
    { name: "Traveling" },
    { name: "Fitness" },
    { name: "Gaming" },
    { name: "Cooking" },
    { name: "Reading" },
    { name: "Writing" },
    { name: "Art" },
    { name: "Fashion" },
    { name: "Sports" },
    { name: "Volunteering" },
    { name: "Entrepreneurship" },
    { name: "DIY Projects" },
    { name: "Social Media" },
    { name: "Investing" },
    { name: "Gardening" },
    { name: "Movies" },
    { name: "Psychology" },
    { name: "Pet Care" },
    { name: "Interior Design" },
    { name: "Crafting" },
    { name: "Coding/Programming" },
    { name: "Education" },
    { name: "Languages" },
    { name: "Architecture" },
    { name: "Science" },
    { name: "Nature" },
    { name: "Spirituality" },
    { name: "Health and Wellness" },
    { name: "Environmental Sustainability" },
    { name: "Astronomy" },
    { name: "Politics" },
    { name: "History" },
    { name: "Yoga" },
    { name: "Meditation" },
    { name: "Collecting (e.g., stamps, coins)" },
    { name: "Hiking" },
    { name: "Bird Watching" },
    { name: "Cycling" },
    { name: "Public Speaking" },
    { name: "Photography" },
    { name: "Social Activism" },
    { name: "Entrepreneurship" },
    { name: "Blogging/Vlogging" },
    { name: "Music Production" },
    { name: "Stand-up Comedy" },
    { name: "Theater/Acting" },
    { name: "Creative Writing" },
    { name: "Sketching/Drawing" },
    { name: "Beekeeping" },
    { name: "Martial Arts" },
    { name: "Swimming" },
    { name: "Stand-up Paddleboarding" },
    { name: "Surfing" }
  ];
  universities: any[] = [{universityName:'RTU Riga'}, {universityName:'RTU Liepaja'}, {universityName:'RTU Daugavpils'}, {universityName:'Erasmus Student'}];
  universitySuggestions:any[]=[];

  genderOptions = ['Male', 'Female', 'Other'];  // gender options
  
  constructor(private fb: FormBuilder, private apiService: ApiService,   private toastService: MessageService,
    private router: Router) {}

  ngOnInit(): void {
    this.fieldsOfStudy.sort((a, b) => a.name.localeCompare(b.name));
    this.personalInterests.sort((a, b) => a.name.localeCompare(b.name));
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      universityName: ['', Validators.required],
      fullName:['',Validators.required],
      fieldOfStudy: ['', Validators.required],
      personalInterests:['',Validators.required],
      gender: ['', Validators.required],  // Added gender control
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      rememberMe: [false]
    }, { validators: this.passwordMatchValidator });
    
  }
  searchUniversities(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    const suggestions = this.universities!.filter(uni => 
      uni.universityName.toLowerCase().includes(query.toLowerCase())
    );
    debugger;
    this.universitySuggestions=suggestions;
  }
  
  // Validator to check if password and confirmPassword match
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Method to toggle password visibility
  togglePasswordVisibility() {
    const passwordField = document.getElementById('psw-input') as HTMLInputElement;
    const confirmPasswordField = document.getElementById('confirmPsw-input') as HTMLInputElement;
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      confirmPasswordField.type = 'text';
    } else {
      passwordField.type = 'password';
      confirmPasswordField.type = 'password';
    }
  }
  onSubmit() {
    debugger;
    this.isSubmitting = true;

    // Check if the form is valid
    if (this.signupForm.invalid) {
      this.isSubmitting = false;
      return;
    }

    if (this.signupForm!.valid) {
      
 
      debugger;
      const formData = this.signupForm!.value;
  
      console.log(formData);
      this.apiService.signup(formData).subscribe(response => {
        // handle success
        this.toastService.add({severity: 'success', summary: 'Signup Successful', detail: 'You can now login.'});

        // Redirect to login page after 2 seconds (adjust timing if needed)
        setTimeout(() => {
          this.router.navigate(['/accounts/login']);
        }, 2000);
      }, error => {
        this.isSubmitting = false;
        // handle error
        console.error('Signup failed', error);
        this.toastService.add({severity: 'error', summary: 'Signup failed', detail: error.error.error});

      });
    }
  }
}