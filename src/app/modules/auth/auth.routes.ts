import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((acc) => acc.LoginComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then((acc) => acc.ForgotPasswordComponent),
  },
 
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component').then((acc) => acc.SignupComponent),
  },
];
