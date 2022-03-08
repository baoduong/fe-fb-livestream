import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FbServiceService {
  PAGEID = environment.PAGEID;
  USERACCESSTOKEN = localStorage.getItem('fb_accessToken');
  constructor(private http: HttpClient) { }

  getPageAccessToken() {
    return this.http
      .get(
        `https://graph.facebook.com/${this.PAGEID}?fields=access_token&access_token=${this.USERACCESSTOKEN}`
      )
  }

  getLiveVideo(accessTokenPage: string) {
    return this.http
      .get(
        `https://graph.facebook.com/${this.PAGEID}/live_videos?access_token=${accessTokenPage}`
      )
  }

  getUserInfo(comment_id: string) {
    return this.http
      .get(`${environment.crawlerAPI}/live_video/${comment_id}`);
  }
}
