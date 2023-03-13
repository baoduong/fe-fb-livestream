import { TestingPageComponent } from './components/testing-page/testing-page.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyComponent } from './components/policy/policy.component';
import { AuthGuard } from './guard/app.guard';

const routes: Routes = [
  {
    path: 'testing',
    component: TestingPageComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'customer-management',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/customer-management/customer-management.module').then(m => m.CustomerManagementModule)
  },
  {
    path: 'invoices',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/invoices-management/invoices-management.module').then(m => m.InvoicesManagementModule)
  },
  {
    path: 'policy',
    component: PolicyComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
