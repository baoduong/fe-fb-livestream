import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  live = new BehaviorSubject<any>(null);
  USERACCESSTOKEN = localStorage.getItem('fb_accessToken');
  PAGEID = '102280315741900';
  userID = '10217314997421947';
  ACCESSTOKEN_PAGE = '';
  constructor(private http: HttpClient) {
    this.live.pipe(filter((video) => video)).subscribe((video) => {
      console.log('video', video);
      const { id } = video;

      var source = new EventSource(
        `https://streaming-graph.facebook.com/${id}/live_comments?access_token=${this.ACCESSTOKEN_PAGE}&comment_rate=one_per_two_seconds&fields=from{name,id},message`
      );
      source.onmessage = (event) => {
        // Do something with event.message for example
        console.log('Event', event);
        const { data } = event;
        const messages = JSON.parse(data);
        console.log('Message:', messages);
      };
    });
  }

  ngOnInit(): void {
    // const USERACCESSTOKEN = 'EAAXy6F7AppkBAAHBUkZC0oQdrHJeOdbcSAWdkXREvdCvCWXNOSd7PeNnSHu0TW3rnaYfwpsocYEBrfR76gnPlOxuocIRHgXzfwh8IcSqW8JdjV1vDs6A9K5hh0wut7F6GCQSQkrw9rYZCdkiRO7IaghM3bypm2RgUsRdNElZBRqNOtLAzkVz25S1rN9bK2jZBVIs3PS9qwZDZD';
    // this.http.get(`https://graph.facebook.com/v13.0/me/live_videos?access_token=${USERACCESSTOKEN}`)
    //   .subscribe((res: any) => {
    //     const { data } = res;
    //     console.log('data', data)
    //     const liveVideo = (data as any as []).filter(video => video['status'] === 'LIVE')
    //     console.log('liveVideo', liveVideo)
    //   })
  }

  getPageAccessToken() {
    this.http
      .get(
        `https://graph.facebook.com/${this.PAGEID}?fields=access_token&access_token=${this.USERACCESSTOKEN}`
      )
      .subscribe((data: any) => {
        console.log('data Page Access Token:', data);
        const { access_token } = data;
        this.ACCESSTOKEN_PAGE = access_token;
      });
  }

  getLiveVideo() {
    this.http
      .get(
        `https://graph.facebook.com/${this.PAGEID}/live_videos?access_token=${this.ACCESSTOKEN_PAGE}`
      )
      .subscribe((res: any) => {
        console.log('res:', res);
        const { data } = res;
        console.log('data', data);
        const liveVideo = (data as any as []).filter(
          (video) => video['status'] === 'LIVE'
        )[0];
        console.log('liveVideo', liveVideo);
        if (liveVideo) {
          this.live.next(liveVideo);
        }
      });
  }

  getPagePostID() {
    this.http
      .get(
        `https://graph.facebook.com/${this.PAGEID}/feed?access_token=${this.ACCESSTOKEN_PAGE}`
      )
      .subscribe((data: any) => {
        console.log('Page post:', data);
      });
  }
  getComments() {
    const url =
      'https://www.facebook.com/102280315741900/videos/331805768913394?comment_id=331806575579980';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, false); // false for synchronous request
    xmlHttp.send(null);
    console.log('xmlHttp.responseText', xmlHttp.responseText);
    // this.http.get(url).subscribe(data => {
    //   console.log('data HTML:', data)
    // });
  }

  getUserInfo(comment_id: string) {
    this.http
      .get(`${environment.crawlerAPI}/live_video/${comment_id}`)
      .subscribe((data: any) => {
        console.log('User info', data);
      });
  }
}
