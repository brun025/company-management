import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'companies',
        loadComponent: () => import('./features/company/components/company-list/company-list.component')
          .then(m => m.CompanyListComponent)
      },
      { path: '', redirectTo: 'companies', pathMatch: 'full' }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/components/login/login.component')
      .then(m => m.LoginComponent)
  },
  { path: '**', redirectTo: 'companies' }
];