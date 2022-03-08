import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentDetailsComponent } from './components/comment-details/comment-details.component';
import { CommentDetails } from './components/CommentDetails';
import { FbServiceService } from './fb-service.service';

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

  @ViewChild('chatDetailContainer', { read: ViewContainerRef })
  vcrChatDetailContainer!: ViewContainerRef;

  constructor(private fbServices: FbServiceService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
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
  }

  addMessageComment(message: string) {
    if (this.vcrChatDetailContainer) {
      const cpnMessageDetail = new CommentDetails(message, CommentDetailsComponent);

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cpnMessageDetail.component);
      const componentRef = this.vcrChatDetailContainer.createComponent<any>(componentFactory);
      // this.render.addClass(componentRef.location.nativeElement, cssClass);
      componentRef.instance.message = message;
      componentRef.changeDetectorRef.markForCheck();
    }
  }

  getLiveVideo() {
    this.fbServices.getPageAccessToken()
      .subscribe((data: any) => {
        console.log('data Page Access Token:', data);
        const { access_token } = data;
        this.ACCESSTOKEN_PAGE = access_token;
        this.fbServices.getLiveVideo(access_token).subscribe((res: any) => {
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
        })
      });
  }


  getUserInfo(comment_id: string, message: string) {
    this.fbServices.getUserInfo(comment_id).subscribe(u => {

    });
  }
}
