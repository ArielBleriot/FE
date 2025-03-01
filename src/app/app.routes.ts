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
        data: { title: 'FAQ' },
      },
    ],
    canActivate:[authGuard]
  },
];
