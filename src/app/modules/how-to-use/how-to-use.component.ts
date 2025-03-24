import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-how-to-use',
  templateUrl: './how-to-use.component.html',
  styleUrls: ['./how-to-use.component.scss'],
  standalone: true,
  imports: [CommonModule, CardModule, AccordionModule, ButtonModule, RouterModule]
})
export class HowToUseComponent {
  sections = [
    {
      title: 'Finding and Connecting with Students',
      content: 'Search for students based on their field of study, interests, or projects. Once you find someone interesting, you can connect with them via email to discuss collaboration opportunities.',
      route: '/find-students'
    },
    {
      title: 'Managing Your Projects',
      content: 'Share your ongoing projects with the community. Create detailed project descriptions, specify technologies used, and find potential collaborators. Your projects help others understand your interests and expertise.',
      route: '/student-projects'
    },
    {
      title: 'Discovering Activities',
      content: 'Browse and search through various academic and extracurricular activities. You\'ll receive personalized recommendations based on your field of study and interests.',
      route: '/activities'
    },
    {
      title: 'Profile Management',
      content: 'Keep your profile updated with your current interests, field of study, and skills. This helps us provide better recommendations and helps other students find you for collaboration.',
      route: '/profile'
    }
  ];
}
