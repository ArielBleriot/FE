import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../services/api.service';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { EmailDialogComponent } from './email-dialog/email-dialog.component';

interface Student {
  id: number;
  fullName: string;
  universityName: string;
  personalInterests: string[];
  fieldOfStudy: string;
  email?: string;
}

interface StudentSearchDto {
  universityName?: string;
  interests?: string[];
  fieldOfStudy?: string;
}

interface University {
  universityName: string;
}

@Component({
  selector: 'app-find-students',
  templateUrl: './find-students.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    MultiSelectModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    AutoCompleteModule,
    EmailDialogComponent
  ],
  providers: [MessageService],
  styles: [`
    .student-search-cover {
      background: linear-gradient(45deg, #2196F3, #3F51B5);
      position: relative;
      overflow: hidden;
    }

    .student-search-cover::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('/assets/images/pattern-bg.png') repeat;
      opacity: 0.1;
    }

    :host ::ng-deep {
      .p-multiselect {
        width: 100%;
        .p-multiselect-label {
          padding: 1rem;
        }
      }

      .card {
        transition: transform 0.2s ease-in-out;
        
        &:hover {
          transform: translateY(-5px);
        }
      }

      .badge {
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 500;
        
        &.bg-primary {
          background-color: #E3F2FD !important;
          color: #1976D2;
        }
        
        &.bg-info {
          background-color: #E0F7FA !important;
          color: #0097A7;
        }
      }

      .p-dropdown, .p-multiselect, .p-autocomplete {
        width: 100% !important;
        min-width: 250px !important;

        .p-dropdown-panel, .p-multiselect-panel, .p-autocomplete-panel {
          min-width: 250px !important;
        }

        input {
          width: 100% !important;
          height: 40px !important;
        }
      }

      .p-button {
        min-width: 120px;
        height: 40px;
      }

      .filter-buttons {
        margin: 2rem 0;
        padding: 0 1rem;
      }

      .btn-position-md-middle {
        position: absolute;
        right: 1.5rem;
        top: 50%;
        transform: translateY(-50%);
      }

      @media (max-width: 768px) {
        .btn-position-md-middle {
          position: static;
          margin-top: 1rem;
          transform: none;
          display: flex;
          justify-content: center;
        }
      }

      .card-img {
        height: 200px;
        width: 100%;
        object-fit: cover;
      }
    }
  `]
})
export class FindStudentsComponent implements OnInit {
  students: Student[] = [];
  selectedInterests: string[] = [];
  selectedFields: string|undefined;
  selectedUniversity: University|string|undefined;
  universitySuggestions: University[] = [];
  showEmailDialog: boolean = false;
  selectedStudent: Student | null = null;
  currentUserEmail: string = '';

  // Filter options
  interestOptions: string[] = [
    'Technology',
    'Music',
    'Photography',
    'Traveling',
    'Fitness',
    'Gaming',
    'Cooking',
    'Reading',
    'Writing',
    'Art',
    'Fashion',
    'Sports',
    'Volunteering',
    'Entrepreneurship',
    'DIY Projects',
    'Social Media',
    'Investing',
    'Gardening',
    'Movies',
    'Psychology',
    'Pet Care',
    'Interior Design',
    'Crafting',
    'Coding/Programming',
    'Education',
    'Languages',
    'Architecture',
    'Science',
    'Nature',
    'Spirituality',
    'Health and Wellness',
    'Environmental Sustainability',
    'Astronomy',
    'Politics',
    'History',
    'Yoga',
    'Meditation',
    'Collecting',
    'Hiking',
    'Bird Watching',
    'Cycling',
    'Public Speaking',
    'Social Activism',
    'Blogging/Vlogging',
    'Music Production',
    'Stand-up Comedy',
    'Theater/Acting',
    'Creative Writing',
    'Sketching/Drawing',
    'Beekeeping',
    'Martial Arts',
    'Swimming',
    'Stand-up Paddleboarding',
    'Surfing'
  ];

  fieldOptions: string[] = [
    'Computer Science',
    'Business',
    'Engineering',
    'Design',
    'Health Sciences',
    'Education',
    'Mathematics',
    'Social Sciences',
    'Arts',
    'Law',
    'Environmental Science',
    'Psychology',
    'Economics',
    'Political Science',
    'Architecture',
    'Music',
    'Philosophy',
    'Chemistry',
    'Physics',
    'Linguistics',
    'History',
    'Sociology',
    'Agriculture',
    'Hospitality Management',
    'Sports Science',
    'Public Administration',
    'Journalism',
    'Media Studies',
    'Data Science',
    'Artificial Intelligence',
    'Cybersecurity',
    'Game Development',
    'Film Studies',
    'Marketing',
    'Finance',
    'Human Resources',
    'Supply Chain Management',
    'Public Relations',
    'Tourism Management',
    'Veterinary Science',
    'Theology',
    'Social Work',
    'Nursing',
    'Biotechnology',
    'Robotics'
  ];

  universities: University[] = [
    { universityName: 'RTU Riga' },
    { universityName: 'RTU Liepaja' },
    { universityName: 'RTU Daugavpils' },
    { universityName: 'Erasmus Student' }
  ];

  constructor(
    private messageService: MessageService,
    private apiService: ApiService
  ) {
    const userEmail = localStorage.getItem('Email');
    if (userEmail) {
      this.currentUserEmail = userEmail;
    }
  }

  ngOnInit() {
    this.filterStudents();
  }

  searchUniversities(event: any) {
    const query = event.query.toLowerCase();
    this.universitySuggestions = this.universities.filter(uni => 
      uni.universityName.toLowerCase().includes(query)
    );
  }

  filterStudents() {
    const filters: StudentSearchDto = {
      interests: this.selectedInterests,
      fieldOfStudy: this.selectedFields,
      universityName: typeof this.selectedUniversity === 'object' ? 
        (this.selectedUniversity as University).universityName : 
        this.selectedUniversity as string | undefined
    };

    console.log('Sending filters:', filters);

    this.apiService.getFilteredStudents(filters).subscribe({
      next: (response) => {
        this.students = response;
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Success',
        //   detail: 'Student list has been updated based on your filters'
        // });
      },
      error: (error) => {
        console.error('Filter error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch students. Please try again.'
        });
      }
    });
  }

  clearFilters() {
    this.selectedInterests = [];
    this.selectedFields = undefined;
    this.selectedUniversity = undefined;
    this.filterStudents();
  }

  connectWithStudent(student: Student) {
    if (!student.email) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Student email is not available.'
      });
      return;
    }
    localStorage.setItem('universityName',student.universityName);
    this.selectedStudent = student;
    this.showEmailDialog = true;
  }
}
