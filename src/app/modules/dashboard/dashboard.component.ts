import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ActivityDto } from './activity.dto';
import { ApiService } from '../../services/api.service';
import { ProjectDto } from '../student-projects/project.model';
import { MessageService } from 'primeng/api';
import { LoaderService } from '../loader.service';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,AutoCompleteModule,CalendarModule,CheckboxModule,ToastModule],
  templateUrl: './dashboard.component.html',
  providers:[MessageService]
})
export class DashboardComponent {
  activities: ActivityDto[] = [];
  projects!:ProjectDto[];
  constructor(private apiService: ApiService,private toastService: MessageService, private loaderService:LoaderService) {}

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
  registerForActivity(activityId:any)
  {
    this.loaderService.showLoader();

    // Call the service to reset the password
    this.apiService.registerForActivity({activityId:activityId,studentId:localStorage.getItem('studentId')}).subscribe(
      (response) => {
        if(response.successfull)
          {
            this.toastService.add({severity: 'success', summary: '', detail: response.message});
            this.loaderService.hideLoader();
          }
          else
          {
            this.toastService.add({severity: 'error', summary: 'Error', detail: response.message});
            this.loaderService.hideLoader();
          }
      },
      (error) => {
        this.toastService.add({severity: 'error', summary: 'Something went wrong', detail: error.error.message});
        this.loaderService.hideLoader();
      }
    );
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
