import { Routes } from '@angular/router';

export const STUDENT_PROJECTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./student-projects.component').then((acc) => acc.StudentProjectsComponent)
  },
];
