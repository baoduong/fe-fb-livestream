import { FbServiceService } from './services/fb-service.service';
import { environment } from './../environments/environment';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { IndexedDBService } from './services/indexeddb.service';

declare var FB: any;

@Injectable({
    providedIn: 'root'
})
export class AppService {

    appConfig: any;
    window: any;
    constructor(private http: HttpClient,
        private fbServices: FbServiceService,
        private indexedDB: IndexedDBService,
        @Inject(DOCUMENT) private document: Document,) {
        this.window = this.document.defaultView;
        this.window.fbAsyncInit = function () {
            FB.init({
                appId: environment.APP_ID,
                xfbml: true,
                cookie: true,
                version: 'v16.0'
            });
            FB.AppEvents.logPageView();
        };
    }
    get config() {
        return this.appConfig;
    }

    public load() {
        console.log('Let fb login')
        this.window.fbAsyncInit();
        const _this = this;
        FB.getLoginStatus(function (response: any) {
            // See the onlogin handler
            console.log('response', response);
            if (response.status === 'connected') {
                _this.indexedDB.openDatabase();
                const { authResponse } = response;
                const { accessToken } = authResponse;
                localStorage.setItem('fb_accessToken', accessToken);
                _this.fbServices.getPageAccessToken().subscribe((res: any) => {
                    console.log('data Page Access Token:', res);
                    const { access_token } = res;
                    localStorage.setItem('PAGE_ACCESS_TOKEN', access_token);
                })
            } else {
                FB.login((response: any) => {
                    console.log("FB's Response: ", response)
                }, { scope: 'email,public_profile' });
            }
        });
    }
}