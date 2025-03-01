import { Routes } from '@angular/router';

export const FAQ_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./faq.component').then((acc) => acc.FaqComponent)
  },
];
