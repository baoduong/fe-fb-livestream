import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesManagementRoutingModule } from './invoices-management-routing.module';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { MatCardModule } from '@angular/material/card';
import { SharesModule } from '../shares/shares.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    InvoiceListComponent
  ],
  imports: [
    CommonModule,
    InvoicesManagementRoutingModule,
    SharesModule.forRoot(),
    ScrollingModule
  ]
})
export class InvoicesManagementModule { }
