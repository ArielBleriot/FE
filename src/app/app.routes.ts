import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { authGuard } from './modules/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'accounts',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((acc) => acc.AUTH_ROUTES),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./modules/auth/password-reset/password-reset.component').then((acc) => acc.PasswordResetComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/default-layout/default-layout.component').then(
        (l) => l.DefaultLayoutComponent
      ),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.routes').then(
            (d) => d.DASHBOARD_ROUTES
          ),
        data: { title: 'Dashboard' },
      },
      {
        path: 'how-to-use',
        loadChildren: () =>
          import('./modules/how-to-use/how-to-use.routes').then(
            (d) => d.HOW_TO_USE_ROUTES
          ),
        data: { title: 'How to Use' },
      },
      {
        path: 'student-projects',
        loadChildren: () =>
          import('./modules/student-projects/student-projects.routes').then(
            (d) => d.STUDENT_PROJECTS_ROUTES
          ),
        data: { title: 'Student Projects' },
      },
      {
        path: 'activities',
        loadChildren: () =>
          import('./modules/activities/activities.routes').then(
            (d) => d.ACTIVITIES_ROUTES
          ),
        data: { title: 'Activities' },
      },
      {
        path: 'find-students',
        loadChildren: () =>
          import('./modules/find-students/find-students.routes').then(
            (d) => d.FIND_STUDENTS_ROUTES
          ),
        data: { title: 'Find Students' },
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('./modules/messages/messages.routes').then(
            (d) => d.MESSAGES_ROUTES
          ),
        data: { title: 'Messages' },
      },
      {
        path: 'faq',
        loadChildren: () =>
          import('./modules/faq/faq.routes').then(
            (d) => d.FAQ_ROUTES
          ),
        data: { title: 'FAQ' },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/student-profile/profile.routes').then(
            (d) => d.PROFILE_ROUTES
          ),
        data: { title: 'Profile' },
      },
    ],
    canActivate:[authGuard]
  },
];
