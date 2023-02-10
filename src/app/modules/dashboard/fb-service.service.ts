import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FbServiceService {
  PAGEID = environment.PAGEID;
  PAGE_ACCESSTOKEN = environment.pageAccessToken;
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

  // getUserInfo(comment_id: string) {
  //   return this.http
  //     .get(`${environment.crawlerAPI}/live_video/${comment_id}`);
  // }

  getCommentInfo(OBJECT_ID: string, pageAccessToken = '') {
    // `https://graph.facebook.com/${this.PAGEID}/feed?access_token=${this.PAGE_ACCESSTOKEN}`
    return this.http
      .get(
        `https://graph.facebook.com/${OBJECT_ID}/comments?access_token=${pageAccessToken}`
      )
  }

  getUserInfoByUserId(userId: string, pageAccessToken: string) {
    return this.http.get(`https://graph.facebook.com/${userId}?fields=name,picture&access_token=${pageAccessToken}`)
  }

  getExistedCommentsInLive(liveVideoId: string, pageAccessToken: string) {
    return this.http.get(`https://graph.facebook.com/${liveVideoId}/comments?access_token=${pageAccessToken}`)
  }
}
