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

declare var FB: any;

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent
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

    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    SharesModule.forRoot()
  ],
  providers: [
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
export class AppModule {
  constructor() {
    FB.getLoginStatus(function (response: any) {
      // See the onlogin handler
      console.log('response', response);
      if (response.status === 'connected') {
        const { authResponse } = response;
        const { accessToken } = authResponse;
        localStorage.setItem('fb_accessToken', accessToken);
      } else {
        FB.login((response: any) => {
          console.log("FB's Response: ", response)
        }, { scope: 'email,user_posts' });
      }
    });
  }
}
