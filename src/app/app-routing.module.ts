import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'Dashboard',
  loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
},
  { path: 'customer-management', loadChildren: () => import('./modules/customer-management/customer-management.module').then(m => m.CustomerManagementModule) },
  { path: 'invoices', loadChildren: () => import('./modules/invoices-management/invoices-management.module').then(m => m.InvoicesManagementModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
