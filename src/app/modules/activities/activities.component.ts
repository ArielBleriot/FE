import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ApiService } from '../../services/api.service';
import { ActivityDto } from '../dashboard/activity.dto';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LoaderService } from '../loader.service';
@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule,FormsModule,AutoCompleteModule,CalendarModule,CheckboxModule,ToastModule],
 templateUrl: './activities.component.html',
 providers:[MessageService]
})
export class ActivitiesComponent {
  activities: ActivityDto[] = [];
  location: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  basedOnInterest: boolean = false;
  isSubmitting!:boolean;
  constructor(private activityService: ApiService,private toastService: MessageService, private loaderService:LoaderService) {}

  ngOnInit(): void {
    this.getActivities();
  }
  registerForActivity(activityId:any)
  {
    this.loaderService.showLoader();

    // Call the service to reset the password
    this.activityService.registerForActivity({activityId:activityId,studentId:localStorage.getItem('studentId')}).subscribe(
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
  filterProjects() {
    // Filter by location
    
    console.log(this.location,this.startDate,this.basedOnInterest)
    const request={location:this.location,startDate:this.startDate,basedOnInterest:this.basedOnInterest}
    this.activityService.getFilteredActivities(request).subscribe((activities) => {
      this.activities = activities;
    });
    // let filtered = this.projects.filter(project => {
    //   const isLocationMatch = this.location ? project.location.toLowerCase().includes(this.location.toLowerCase()) : true;
    //   const isInterestMatch = this.basedOnInterest ? project.interestBased : true;
      
    //   // Filter by date range if provided
    //   const isDateInRange = (this.startDate && this.endDate) ? 
    //                         (project.date >= this.startDate && project.date <= this.endDate) : true;

    //   return isLocationMatch && isInterestMatch && isDateInRange;
    // });

    // // Update the filtered projects list
    // this.filteredProjects = filtered;
  }
  getActivities(): void {
    this.activityService.getAllActivities().subscribe((activities) => {
      this.activities = activities;
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
