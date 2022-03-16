import { environment } from 'src/environments/environment';
import { initializeApp } from '@angular/fire/app';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { FbServiceService } from './fb-service.service';
import { CommentDetailsComponent } from './components/comment-details/comment-details.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    DashboardComponent,
    CommentDetailsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    
  ],
  providers: [
    FbServiceService
  ]
})
export class DashboardModule { }
