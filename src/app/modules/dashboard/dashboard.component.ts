import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ActivityDto } from './activity.dto';
import { ApiService } from '../../services/api.service';
import { ProjectDto } from '../student-projects/project.model';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,AutoCompleteModule,CalendarModule,CheckboxModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  activities: ActivityDto[] = [];
  projects!:ProjectDto[];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getRecommendedProjects();
    this.getActivities();
  }

  getActivities(): void {
    this.apiService.getRecommendedActivities().subscribe((activities) => {
      this.activities = activities;
    });
  }
  getRecommendedProjects(): void {
    this.apiService.getRecommendedProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }
  getInterests(interest: string): string[] {
    return interest.split(',').map(item => item.trim());
  }
  
  filteredCountries = [
    {
      name: 'United States',
    }
  ]
}
