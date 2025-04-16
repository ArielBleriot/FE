import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-profile.component.html',
  providers: [MessageService]
})
export class StudentProfileComponent {
  profile: any = {};
  isEditing = false;
  originalProfile: any;

  constructor(
    private apiService: ApiService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.apiService.getProfile().subscribe((profile) => {
      this.profile = profile;
      this.originalProfile = { ...profile };
    });
  }

  toggleEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.profile = { ...this.originalProfile };
    this.isEditing = false;
  }

  updateProfile(): void {
    this.apiService.updateProfile(this.profile).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Profile updated successfully'
        });
        this.isEditing = false;
        this.originalProfile = { ...this.profile };
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update profile'
        });
      }
    });
  }
}
