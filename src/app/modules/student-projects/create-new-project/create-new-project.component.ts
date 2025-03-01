import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-create-new-project',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MultiSelectModule],
  templateUrl: './create-new-project.component.html',
})
export class CreateNewProjectComponent implements OnInit {

  projectForm!: FormGroup;  // Form group for the project form
  skills: any[] = [];  // Skills and Interests options
  interests:any[]=[];
  isSubmitting = false;  // Flag to track form submission

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder, private http: HttpClient,
    private apiService:ApiService
  ) {}
  ngOnInit(): void {
    // Initialize the form group
    this.projectForm = this.fb.group({
      title: ['', Validators.required],  // Project title
      status: ['', Validators.required],  // Status selection
      description: ['', Validators.required],  // Project description
      skills: [[], Validators.required],  // Skills (multi-select)
      interests: [[], Validators.required],  // Interests (multi-select)
    });

    // Example options for multi-select (replace with real data from an API if needed)
    this.skills = ['HTML', 'CSS', 'JavaScript', 'Angular'];
    this.interests=['Engineering','Programming','Education','Medical']

  }

  // Submit form
  submitForm(): void {
   

    const formData = this.projectForm.value;
    formData.studentId=1;

    // Example API call - Replace with your actual API endpoint
    this.apiService.createProject(formData).subscribe(response => {
     if(response.id)
     {
      this.ref.close(true);
     }
      console.log('Project created successfully:', response);
    }, error => {
      console.error('Error creating project:', error);
    });
  }

  // Close the modal (example)
  // closeModal(isSubmitted: boolean): void {
  //   if (isSubmitted) {
  //     // Reset form or handle success logic
  //     this.projectForm.reset();
  //   }
  //   // Logic to close the modal goes here
  // }

  closeModal(isConfirm: boolean) {
    this.ref.close(isConfirm);
  }

}
