import { TitleService } from './../../services/title.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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
  invoiceNumber$ = new BehaviorSubject<number>(1);
  live = new BehaviorSubject<any>(null);
  USERACCESSTOKEN = localStorage.getItem('fb_accessToken');
  ACCESSTOKEN_PAGE = '';
  totalPage$ = new BehaviorSubject<number[]>([]);
  @ViewChild('chatDetailContainer', { read: ViewContainerRef })
  vcrChatDetailContainer!: ViewContainerRef;

  constructor(private fbServices: FbServiceService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    titleService: TitleService
  ) {
    titleService.updateTitle("Theo dõi Livestream")
    this.live.pipe(filter((video) => video)).subscribe((video) => {
      const { id } = video;
      this.fbServices.getExistedCommentsInLive(id, this.ACCESSTOKEN_PAGE).subscribe((commensts: any) => {
        console.log('comments', commensts);
        commensts.data.forEach((c:any) => {
          const { message, from, id: commentId } = c;
          const { id: userID } = from;
          this.loadComment(userID, message, commentId);
        })
      });
      var source = new EventSource(
        `https://streaming-graph.facebook.com/${id}/live_comments?access_token=${this.ACCESSTOKEN_PAGE}&comment_rate=one_hundred_per_second&fields=from{name,id},message`
      );
      source.onmessage = (event) => {
        const { data } = event;
        const messages = JSON.parse(data);
        const { message, from, id: commentId } = messages;
        console.log('messages', messages)
        const { id: userID } = from;

        this.loadComment(userID, message, commentId);
      };
    });
  }

  ngOnInit(): void {
    this.getLiveVideo()
  }

  loadComment(userID: string, message: string, commentId: string) {
    this.fbServices.getUserInfoByUserId(userID, this.ACCESSTOKEN_PAGE).subscribe((user: any) => {
      console.log(user)
      const { name, picture } = user;
      const { data } = picture;
      const { url: photoUrl } = data

      this.addMessageComment(message, commentId, name, photoUrl, this.invoiceNumber$)
    });
  }

  addMessageComment(message: string, identifier: string, name: string, url: string, invoiceNumber: BehaviorSubject<number>) {
    if (this.vcrChatDetailContainer) {
      const cpnMessageDetail = new CommentDetails(
        message, identifier, name, url, invoiceNumber,
        CommentDetailsComponent);

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cpnMessageDetail.component);
      const componentRef = this.vcrChatDetailContainer.createComponent<any>(componentFactory);
      // this.render.addClass(componentRef.location.nativeElement, cssClass);
      componentRef.instance.message = message;
      componentRef.instance.identifier = identifier;
      componentRef.instance.url = url;
      componentRef.instance.name = name;
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
}