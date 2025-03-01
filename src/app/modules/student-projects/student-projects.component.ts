import { Component, OnInit } from '@angular/core';
import { CreateNewProjectComponent } from './create-new-project/create-new-project.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { CommonModule, DatePipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ApiService } from '../../services/api.service';
import { ProjectDto } from './project.model';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-student-projects',
  standalone: true,
  imports: [CommonModule,FormsModule,ToastModule,AccordionModule],
  templateUrl: './student-projects.component.html',
  providers: [DialogService,MessageService,DatePipe],
})
export class StudentProjectsComponent implements OnInit {

  projects!:ProjectDto[];
  description!:string;
  profile: any = {
  };


  constructor(private datePipe: DatePipe,private dialogService: DialogService, private toastService:MessageService, private apiService:ApiService){}
  ngOnInit(): void {
    this.getProjects();
    this.getProfile();
  }
  getProfile() {
    this.apiService.getProfile().subscribe((profile) => {
      this.profile = profile;
    });
  }
  
  addComment(projectId:number,studentId:number)
  {

    console.log(studentId,projectId);
    const request={projectId:projectId, studentId: this.profile.id,description:this.description, studentName:this.profile.fullName,};
    this.apiService.addComment(request).subscribe((projects) => {
      const project = this.projects.find(p => p.id === projectId);

      if (project) {
        // Create a new comment object (you can structure it based on the API response or a specific format)
        const newComment = {
          projectId:projectId,
          studentId: this.profile.id,
          description: this.description,
          studentName:this.profile.fullName,
          postingDate:this.datePipe.transform(new Date(), 'MMM dd, yyyy')
          // Include other details you want in the comment if needed
        };
  
        // Add the new comment to the respective project's comments array
        project.comments.push(newComment);
  
        // Optionally, you can update the `projects` array or reassign it with the updated project list
        this.projects = [...this.projects]; // Triggers change detection if needed
      }
  
    });
  }
  createNewProject() {
    const dialogRef = this.dialogService.open(CreateNewProjectComponent, {
      header: 'Create New Project',
      closable: true,
      styleClass: '',
    });
    
  
    // Subscribe to the close event and check if it was true
    dialogRef.onClose.subscribe((result) => {
      if (result === true) {
        // Show toast if result is true
        this.toastService.add({ severity: 'success', summary: 'Project Created', detail: 'The new project was created successfully!' });
        this.getProjects();
      }
      else
      this.toastService.add({ severity: 'error', summary: '', detail: 'Something went wrong' });

    });
  }
  getProjects(): void {
    this.apiService.getAllProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }
}
