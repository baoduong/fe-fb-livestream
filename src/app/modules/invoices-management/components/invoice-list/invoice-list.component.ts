import { FbServiceService } from './../../../dashboard/fb-service.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TitleService } from 'src/app/services/title.service';

@Component({
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {


  invoceList = new InvoiceDataSource();

  constructor(titleService: TitleService, private fbService: FbServiceService,) {

    titleService.updateTitle("Danh sách hoá đơn đã tạo")
  }

  ngOnInit(): void {
    // this.invoceList.connect()
  }
  testFB() {
    this.fbService.getUserInfoByUserId("10217314997421947",'').subscribe(v => {
      console.log('UserInfo', v)
    })

  }
}

export class InvoiceDataSource extends DataSource<any>{
  private _length = 100000;
  private _pageSize = 100;
  private _cachedData = Array.from<string>({ length: this._length });
  private readonly _subscription = new Subscription();
  private readonly _dataStream = new BehaviorSubject<(string | undefined)[]>([]);
  private _fetchedPages = new Set<number>();

  connect(collectionViewer: CollectionViewer): Observable<(string | undefined)[]> {
    this._subscription.add(
      collectionViewer.viewChange.subscribe(range => {
        const startPage = this._getPageForIndex(range.start);
        const endPage = this._getPageForIndex(range.end - 1);
        for (let i = startPage; i <= endPage; i++) {
          this._fetchPage(i);
        }
      }),
    );
    return this._dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this._subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number) {
    if (this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);

    // Use `setTimeout` to simulate fetching data from server.
    setTimeout(() => {
      this._cachedData.splice(
        page * this._pageSize,
        this._pageSize,
        ...Array.from({ length: this._pageSize }).map((_, i) => `Item #${page * this._pageSize + i}`),
      );
      this._dataStream.next(this._cachedData);
    }, Math.random() * 1000 + 200);
  }


}