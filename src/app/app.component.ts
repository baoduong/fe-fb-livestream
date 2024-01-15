import { TitleService } from './services/title.service';
import { Component, Inject, AfterViewInit } from '@angular/core';
import { PrinterService } from './services/printer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Phần mềm bán hàng';
  window: any;
  constructor(
    private printerService: PrinterService,
    public titleService: TitleService
  ) {

  }

  ngAfterViewInit() {
    console.log('Let fb login')

    // this.window.fbAsyncInit();
    // FB.getLoginStatus(function (response: any) {   // See the onlogin handler
    //   console.log('response', response);
    //   if (response.status === 'connected') {
    //     const { authResponse } = response;
    //     const { accessToken } = authResponse;
    //     localStorage.setItem('fb_accessToken', accessToken);
    //   } else {
    //     FB.login((response: any) => {
    //       console.log("FB's Response: ", response)
    //     });
    //   }
    // });
  }


}
