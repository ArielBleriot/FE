import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './student-profile.component.html'
})
export class StudentProfileComponent {
  profile: any = {
  };

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getProfile().subscribe((profile) => {
      this.profile = profile;
    });
  }
}
