import { FacebookService } from 'ngx-facebook';
import { Injectable } from '@angular/core';
import { FbServiceService } from './fb-service.service';
import { IndexedDBService } from './indexeddb.service';
declare var FB: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fb: FacebookService,
    private fbServices: FbServiceService,
    private indexedDB: IndexedDBService,
  ) {}

  isLoggedIn() {
    console.log('check fb login');
    return this.fb.getLoginStatus().then((response: any) => {
      console.log('response from fb', response);
      if (response.status === 'connected') {
        const { authResponse } = response;
        const { accessToken } = authResponse;
        localStorage.setItem('fb_accessToken', accessToken);

        const PAGEID = localStorage.getItem('PAGE_ID');
        if (!PAGEID) {
          this.fbServices
            .getCurrentUser();
        }
        return true;
      }
      return false;
    });
    // return FB.getLoginStatus(function (response: any) {
    //     // See the onlogin handler
    //     console.log('response', response);
    //     if (response.status === 'connected') {
    //         // _this.wsService.connectPrint();
    //         _this.indexedDB.openDatabase();
    //         const { authResponse } = response;
    //         const { accessToken } = authResponse;
    //         localStorage.setItem('fb_accessToken', accessToken);
    //         _this.fbServices.getPageAccessToken().subscribe((res: any) => {
    //             console.log('data Page Access Token:', res);
    //             const { access_token } = res;
    //             localStorage.setItem('PAGE_ACCESS_TOKEN', access_token);
    //         });
    //         return true;
    //     } else {
    //         // FB.login((response: any) => {
    //         //     console.log("FB's Response: ", response)
    //         // }, { scope: 'public_profile,read_stream' });
    //         return false;
    //     }
    // });
  }
}
