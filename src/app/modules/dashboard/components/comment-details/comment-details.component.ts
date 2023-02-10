import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { distinctUntilChanged, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentDetailsComponent implements OnInit {
  isExisted$ = new BehaviorSubject<boolean>(true);
  isDealed$ = new BehaviorSubject<boolean>(false);
  @Input() url: string = '';
  @Input() message: string = '';
  @Input() name: string = '';
  @Input() identifier: string = '';
  @Input() invoiceNumber: BehaviorSubject<number> = new BehaviorSubject(-1);
  @Output() eventClickedMakeDeal: EventEmitter<number> = new EventEmitter();

  collection: AngularFirestoreCollection;

  constructor(_firestore: AngularFirestore, private cd: ChangeDetectorRef) {
    this.collection = _firestore.collection('Customers');
  }

  ngOnInit(): void {
    this.collection.doc(this.identifier).valueChanges().pipe(
      distinctUntilChanged()
    ).subscribe(item => {
      if (!item) {
        console.log('Chưa lưu thông tin khách hàng')
        this.isExisted$.next(false);
      } else {
        console.log('Item', item);
        this.isExisted$.next(true)
      }
    });
  }

  saveCustomer() {
    this.collection.doc(this.identifier).set({
      fullName: this.name,
      isBom: false,
      address: this.message,
      isCanDelivery: true,
      phoneNumber1: '',
      phoneNumber2: ''
    })
  }

  makeDeal() {
    console.log('Chốt đơn với số thứ tự', this.invoiceNumber.value);
    this.eventClickedMakeDeal.emit(this.invoiceNumber.value);
    this.isDealed$.next(true);
    this.cd.detectChanges();
  }
}
