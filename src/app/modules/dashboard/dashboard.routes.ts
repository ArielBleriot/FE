import { Routes } from '@angular/router';
import { authGuard } from '../../utils/guards/auth.guard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard.component').then((acc) => acc.DashboardComponent)
  },
];
