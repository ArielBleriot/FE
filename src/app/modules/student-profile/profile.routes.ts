import { Routes } from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./student-profile.component').then((acc) => acc.StudentProfileComponent)
  },
];
