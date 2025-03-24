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
    this.skills = [
      'HTML', 'CSS', 'JavaScript', 'Angular', 'React', 'Vue.js', 'Node.js', 'Express.js', 
      'TypeScript', 'SASS', 'SCSS', 'Bootstrap', 'Tailwind CSS', 'jQuery', 'PHP', 'Laravel', 
      'Python', 'Django', 'Flask', 'Ruby on Rails', 'Java', 'Spring Boot', 'C#', '.NET Core', 
      'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'RESTful APIs', 'OAuth', 
      'JWT', 'Docker', 'Kubernetes', 'Git', 'GitHub', 'GitLab', 'Bitbucket', 'CI/CD', 'Jenkins', 
      'AWS', 'Azure', 'Google Cloud', 'Firebase', 'Cloud Functions', 'Serverless', 'Nginx', 
      'Apache', 'Linux', 'Shell Scripting', 'ElasticSearch', 'RabbitMQ', 'Kafka', 'Postman', 
      'Swagger', 'Jest', 'Mocha', 'Chai', 'Karma', 'Protractor', 'Cypress', 'Unit Testing', 
      'Test-Driven Development (TDD)', 'Behavior-Driven Development (BDD)', 'GraphQL', 
      'WebSockets', 'Progressive Web Apps (PWA)', 'Single Page Applications (SPA)', 'JAMstack', 
      'SEO', 'Google Analytics', 'Content Management Systems (CMS)', 'WordPress', 'Shopify', 
      'Magento', 'Agile', 'Scrum', 'Kanban', 'Project Management', 'UX/UI Design', 'Wireframing', 
      'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'Responsive Design', 'Mobile-first Design', 
      'Web Performance Optimization', 'Cloud Computing', 'Machine Learning', 'AI/Artificial Intelligence', 
      'Data Science', 'Data Analysis', 'TensorFlow', 'Keras', 'PyTorch', 'R', 'Tableau', 'Power BI', 
      'Blockchain', 'Smart Contracts', 'Cryptocurrency', 'DevOps', 'System Design', 'Microservices', 
      'Event-Driven Architecture', 'Load Balancing', 'API Gateway', 'WebRTC', 'Socket.IO', 'OAuth 2.0',
      
      // General Skills
      'Problem Solving', 'Critical Thinking', 'Communication', 'Leadership', 'Time Management', 
      'Collaboration', 'Teamwork', 'Adaptability', 'Creative Thinking', 'Decision Making', 'Project Planning', 
      'Conflict Resolution', 'Public Speaking', 'Presentation Skills', 'Customer Service', 'Negotiation', 
      'Emotional Intelligence', 'Active Listening', 'Networking', 'Decision Making', 'Business Strategy', 
      'Marketing', 'Sales', 'Financial Analysis', 'Budgeting', 'Market Research', 'Risk Management', 
      'Entrepreneurship', 'Strategic Thinking', 'Data-Driven Decision Making', 'Stakeholder Management', 
      'Team Leadership', 'Mentorship', 'Performance Management', 'Resource Allocation', 'Conflict Management', 
      'Organizational Skills', 'Task Prioritization', 'Product Management', 'Business Development', 
      'Change Management', 'Innovation Management', 'Customer Relationship Management (CRM)', 
      'Human Resources Management', 'Collaboration Tools (e.g., Slack, Microsoft Teams)', 'Agile Methodology', 
      'Presentation Tools (e.g., PowerPoint, Keynote)', 'Event Management', 'Conflict Resolution', 'Public Relations'
    ];
    
    this.interests = [
      "Technology",
      "Music",
      "Photography",
      "Traveling",
      "Fitness",
      "Gaming",
      "Cooking",
      "Reading",
      "Writing",
      "Art",
      "Fashion",
      "Sports",
      "Volunteering",
      "Entrepreneurship",
      "DIY Projects",
      "Social Media",
      "Investing",
      "Gardening",
      "Movies",
      "Psychology",
      "Pet Care",
      "Interior Design",
      "Crafting",
      "Coding/Programming",
      "Education",
      "Languages",
      "Architecture",
      "Science",
      "Nature",
      "Spirituality",
      "Health and Wellness",
      "Environmental Sustainability",
      "Astronomy",
      "Politics",
      "History",
      "Yoga",
      "Meditation",
      "Collecting (e.g., stamps, coins)",
      "Hiking",
      "Bird Watching",
      "Cycling",
      "Public Speaking",
      "Social Activism",
      "Blogging/Vlogging",
      "Music Production",
      "Stand-up Comedy",
      "Theater/Acting",
      "Creative Writing",
      "Sketching/Drawing",
      "Beekeeping",
      "Martial Arts",
      "Swimming",
      "Stand-up Paddleboarding",
      "Surfing"
  ];
  

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
