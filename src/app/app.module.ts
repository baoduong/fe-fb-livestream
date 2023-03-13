import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { SharesModule } from './modules/shares/shares.module';
import { InvoicesManagementModule } from './modules/invoices-management/invoices-management.module';
import { AppService } from './app.config';
import { PolicyComponent } from './components/policy/policy.component';
import { LoginComponent } from './components/login/login.component';
import { FacebookModule, FacebookService } from 'ngx-facebook';
import { TestingPageComponent } from './components/testing-page/testing-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    PolicyComponent,
    LoginComponent,
    TestingPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    FacebookModule.forRoot(),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
    SharesModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase))
  ],
  providers: [
    FacebookService,
    AppService,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppService) => () => config.load(),
      deps: [AppService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
