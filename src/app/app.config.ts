import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

declare var FB: any;

@Injectable({
    providedIn: 'root'
})
export class AppService {

    appConfig: any;
    window: any;
    constructor(private http: HttpClient,
        @Inject(DOCUMENT) private document: Document,) {
        this.window = this.document.defaultView;
        this.window.fbAsyncInit = function () {
            FB.init({
                appId: '1674454719571609',
                xfbml: true,
                cookie: true,
                version: 'v16.0'
            });
            FB.AppEvents.logPageView();
        };
    }

    // loadAppConfig() {
    //     return this.http.get('/assets/appconfig.json')
    //         .toPromise()
    //         .then(data => {
    //             this.appConfig = data;
    //         });
    // }

    get config() {
        return this.appConfig;
    }

    public load() {
        console.log('Let fb login')
        this.window.fbAsyncInit();
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
                }, { scope: 'email,public_profile' });
            }
        });
    }
}