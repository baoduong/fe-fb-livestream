import { TitleService } from './../../services/title.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentDetailsComponent } from './components/comment-details/comment-details.component';
import { CommentDetails } from './components/CommentDetails';
import { FbServiceService } from '../../services/fb-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  invoiceNumber$ = new BehaviorSubject<number>(1);
  live = new BehaviorSubject<any>(null);
  USERACCESSTOKEN = localStorage.getItem('fb_accessToken');
  page_access_token: string = '';
  totalPage$ = new BehaviorSubject<number[]>([]);
  @ViewChild('chatDetailContainer', { read: ViewContainerRef })
  vcrChatDetailContainer!: ViewContainerRef;

  constructor(private fbServices: FbServiceService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    titleService: TitleService
  ) {
    titleService.updateTitle("Theo dõi Livestream");
    this.fbServices.getPageAccessToken().subscribe((token: any) => {
      console.log('Page access Token: ', token)
      const { access_token } = token;
      this.page_access_token = access_token;
    }).add(() => {
      this.getLiveVideo();
      this.live.pipe(filter((video) => video)).subscribe((video) => {
        const { id: liveVideoId } = video;
        this.fbServices.getExistedCommentsInLive(liveVideoId, this.page_access_token).subscribe((commensts: any) => {
          console.log('comments', commensts);
          commensts.forEach(async (c: any) => {
            const { message, from, id: commentId } = c;
            // const { id: userID } = from;
            // console.log('userId', userID);
            console.log('get comment info')
            await this.fbServices.getCommentInfo(liveVideoId, commentId, this.page_access_token).subscribe(commentInfo => {
              console.log('commentInfo', commentInfo)
            })
            // await this.loadComment(userID, message, commentId);
          })
        });
        var source = new EventSource(
          `https://streaming-graph.facebook.com/${liveVideoId}/live_comments?access_token=${this.page_access_token}&comment_rate=one_hundred_per_second&fields=from{name,id,link},message`
        );
        source.onmessage = (event) => {
          const { data } = event;
          const messages = JSON.parse(data);
          const { message, id: commentId } = messages;

          this.fbServices.getExistedCommentsInLive(liveVideoId, this.page_access_token).pipe(
            map(comments => comments[comments.length - 1])
          ).subscribe(lastComment => {
            const { from } = lastComment;
            const { id } = from;
            this.loadComment(id, message, commentId);
          })
        };
      });
    })

  }

  ngOnInit(): void {
    
  }

  async loadComment(userID: string, message: string, commentId: string) {

    this.addMessageComment(userID, message, commentId, this.invoiceNumber$)
  }

  addMessageComment(userId: string, message: string, identifier: string, invoiceNumber: BehaviorSubject<number>) {
    if (this.vcrChatDetailContainer) {
      const cpnMessageDetail = new CommentDetails(userId,
        message, identifier, invoiceNumber,
        CommentDetailsComponent);

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cpnMessageDetail.component);
      const componentRef = this.vcrChatDetailContainer.createComponent<any>(componentFactory, 0);
      componentRef.instance.userId = userId;
      componentRef.instance.message = message;
      componentRef.instance.identifier = identifier;
      componentRef.instance.invoiceNumber = invoiceNumber;
      componentRef.changeDetectorRef.detectChanges();

      componentRef.instance.eventClickedMakeDeal.subscribe((invoiceNumber: any) => {
        console.log('Invoice number', invoiceNumber);
        this.updateInvoiceNumber(invoiceNumber);
      })
    }
  }

  updateInvoiceNumber(invoiceNumber: number) {
    this.invoiceNumber$.next(invoiceNumber + 1);
    console.log('Số thứ tự đơn hàng tiếp theo', this.invoiceNumber$.value);
    this.cd.detectChanges();
  }

  getLiveVideo() {
    this.fbServices.getLiveVideo(this.page_access_token).subscribe((res: any) => {
      console.log('Live videos:', res);
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
  }

}