import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { IndexedDBService } from './indexeddb.service';

@Injectable({
  providedIn: 'root'
})
export class FbServiceService {
  PAGEID = localStorage.getItem('PAGE_ID');
  USERACCESSTOKEN = localStorage.getItem('fb_accessToken');
  constructor(private http: HttpClient, private indexedDB: IndexedDBService) { }

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

  getCommentInfo(liveVideoId: string, commentId: string, pageAccessToken = '') {
    // const headers = new HttpHeaders({
    //   'Access-Token': pageAccessToken
    // });
    // `https://graph.facebook.com/${this.PAGEID}/feed?access_token=${this.PAGE_ACCESSTOKEN}`
    // return this.http
    // .get(
    //   `https://graph.facebook.com/${commentId}?fields=from&access_token=${pageAccessToken}`
    // )
    return this.http.get(`https://graph.facebook.com/${liveVideoId}/comments?filter=stream&limit=1&after=${commentId}&fields=from,message`)
  }

  getUserInfoByUserId(userId: string, pageAccessToken: string) {
    return this.http.get(`https://graph.facebook.com/${userId}?fields=name,picture,link&access_token=${pageAccessToken}`)
  }

  getExistedCommentsInLive(liveVideoId: string, pageAccessToken: string) {
    return this.http.get(`https://graph.facebook.com/${liveVideoId}/comments?fields=created_time,from,message&access_token=${pageAccessToken}`).pipe(
      map((res: any) => res.data)
    )
  }

  getCurrentUser() {
    return this.http.get(`https://graph.facebook.com/me?fields=accounts&access_token=${this.USERACCESSTOKEN}`)
      .pipe(
        map((res: any) => res.accounts),
        map(accounts => accounts.data),
        tap((pages: any[]) => {
          console.log(pages)
          pages.forEach(page => {
            const { id, name, access_token } = page
            
            this.indexedDB.addData({ id, name, access_token }, 'FBPages');
          });
        })
      )
  }
}
