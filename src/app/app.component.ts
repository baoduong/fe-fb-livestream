import { Component, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EpsonService } from './services/epson.service';

declare var FB: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'fbLivestream';
  window: any;
  constructor(@Inject(DOCUMENT) private document: Document,
    private epsonService: EpsonService) {
    this.window = this.document.defaultView;
    this.window.fbAsyncInit = function () {
      FB.init({
        appId: '1674454719571609',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v13.0'
      });
    };
  }

  ngAfterViewInit() {
    console.log('Let fb login')
    
    this.window.fbAsyncInit();
    // FB.AppEvents.logPageView();
    FB.getLoginStatus(function (response: any) {   // See the onlogin handler
      console.log('response', response);
      if (response.status === 'connected') {
        const { authResponse } = response;
        const { accessToken } = authResponse;
        localStorage.setItem('fb_accessToken', accessToken);
      } else {
        FB.login((response: any) => {
          console.log("FB's Response: ", response)
        });
      }
    });
    console.log('Connect printer');
    this.epsonService.connect()
  }


}
