import { FbServiceService } from './../../../../services/fb-service.service';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { distinctUntilChanged, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IndexedDBService } from 'src/app/services/indexeddb.service';
const CUSTOMERS_TABLE = 'Customers';
const INVOICES_TABLE = 'Invoices';
@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentDetailsComponent implements OnInit {
  isExisted$ = new BehaviorSubject<boolean>(true);
  isDealed$ = new BehaviorSubject<boolean>(false);
  @Input() userId: string = '';
  url: string = '';
  @Input() message: string = '';
  name: string = '';
  @Input() identifier: string = ''; // Comment_id
  @Input() invoiceNumber: BehaviorSubject<number> = new BehaviorSubject(-1);
  @Output() eventClickedMakeDeal: EventEmitter<number> = new EventEmitter();

  customerCollection: AngularFirestoreCollection;
  invoiceCollection: AngularFirestoreCollection;
  page_access_token: string = localStorage.getItem('PAGE_ACCESS_TOKEN') || '';

  constructor(_firestore: AngularFirestore, private cd: ChangeDetectorRef,
    private indexedDBService: IndexedDBService,
    private fbServices: FbServiceService) {
    this.customerCollection = _firestore.collection('Customers');
    this.invoiceCollection = _firestore.collection('Invoices');
  }

  ngOnInit(): void {
    console.log('Load user info of userid', this.userId);
    this.getUserInfo();
    this.customerCollection.doc(this.userId).valueChanges().pipe(
      distinctUntilChanged()
    ).subscribe(item => {
      if (!item) {
        console.log('Chưa lưu thông tin khách hàng')
        this.isExisted$.next(false);
      } else {
        this.isExisted$.next(true);
      }
    });
    this.indexedDBService.getData(this.identifier, INVOICES_TABLE).then(invoiceCache => {
      console.log('Invoice cache', invoiceCache);
      if (invoiceCache) {
        this.isDealed$.next(true);
        this.isDealed$.unsubscribe();
      } else {
        this.invoiceCollection.doc(this.identifier).get().subscribe(invoice => {
          console.log(invoice)
          this.isDealed$.next(invoice.exists);
        })
      }
    })

  }

  saveCustomer() {
    const customter = {
      fullName: this.name,
      isBom: false,
      address: this.message,
      isCanDelivery: true,
      phoneNumber1: '',
      phoneNumber2: ''
    };
    this.customerCollection.doc(this.userId).set(customter);
  }

  makeDeal() {
    console.log('Chốt đơn với số thứ tự', this.invoiceNumber.value);
    const invoice = {
      message: this.message,
      Customerid: this.userId,
      CreatedDate: new Date()
    }

    this.invoiceCollection.doc(this.identifier).set(invoice);
    this.indexedDBService.addData(Object.assign(invoice, {
      InvoiceId: this.identifier
    }), INVOICES_TABLE);

    this.eventClickedMakeDeal.emit(this.invoiceNumber.value);
    this.isDealed$.next(true);
    this.isDealed$.unsubscribe();
    this.cd.detectChanges();
  }
  getUserInfo() {
    this.indexedDBService.getData(this.userId, CUSTOMERS_TABLE).then((userCached: any) => {
      console.log('userCached', userCached)
      if (userCached) {
        this.name = userCached.name;
        this.url = userCached.picture.data.url;
      } else {
        this.fbServices.getUserInfoByUserId(this.userId, this.page_access_token).subscribe((user: any) => {
          console.log('User info', user);
          this.name = user.name;
          this.url = user.picture.data.url;
          this.indexedDBService.addData(user, CUSTOMERS_TABLE);
        });
      }
    })
  }
}
