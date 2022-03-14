import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Firestore, collectionData, collection, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentDetailsComponent implements OnInit {
  @Input() message: string = '';
  @Input() name: string = '';
  @Input() identifier: string = '';
  // item$: Observable<any[]>;

  constructor(firestore: Firestore) {
    const _collection = collection(firestore, 'Customers');
    
    collectionData(_collection, {
      idField: this.identifier
    })
      .subscribe(item => console.log(item));

  }

  ngOnInit(): void {
  }

}
