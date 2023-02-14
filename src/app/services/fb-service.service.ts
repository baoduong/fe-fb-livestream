import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

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
        `https://graph.facebook.com/${this.PAGEID}?fields=access_token,comments&access_token=${this.USERACCESSTOKEN}`
      )
  }

  getLiveVideo(accessTokenPage: string) {
    return this.http
      .get(
        `https://graph.facebook.com/${this.PAGEID}/live_videos?access_token=${accessTokenPage}`
      )
  }

  getCommentInfo(liveVideoId: string, commentId: string, pageAccessToken = '') {
    // const headers = new HttpHeaders({
    //   'Access-Token': pageAccessToken
    // });
    // `https://graph.facebook.com/${this.PAGEID}/feed?access_token=${this.PAGE_ACCESSTOKEN}`
    return this.http
      .get(
        `https://graph.facebook.com/${commentId}?fields=from&access_token=${pageAccessToken}`
      )
    // return this.http.get(`https://graph.facebook.com/${liveVideoId}/comments?filter=stream&limit=1&after=${commentId}&fields=from,message`, { headers })
  }

  getUserInfoByUserId(userId: string, pageAccessToken: string) {
    return this.http.get(`https://graph.facebook.com/${userId}?fields=name,picture,link&access_token=${pageAccessToken}`)
  }

  getExistedCommentsInLive(liveVideoId: string, pageAccessToken: string) {
    return this.http.get(`https://graph.facebook.com/${liveVideoId}/comments?fields=created_time,from,message&access_token=${pageAccessToken}`).pipe(
      map((res: any) => res.data)
    )
  }
}
