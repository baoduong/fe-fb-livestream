import { IndexedDBService } from './../../../services/indexeddb.service';
import { PrinterService } from '../../../services/printer.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  templateUrl: './self-test.component.html',
  styleUrls: ['./self-test.component.scss']
})
export class SelfTestComponent implements OnInit {
  invoiceNumber = 0;
  customerCollection: AngularFirestoreCollection;
  invoiceCollection: AngularFirestoreCollection;
  identifier = 'c7752cd6-ad89-4952-88fc-d06f8b213ed2';
  constructor(
    _firestore: AngularFirestore,
    private printService: PrinterService, private indexedDBService: IndexedDBService) {
    this.customerCollection = _firestore.collection('Customers');
    this.invoiceCollection = _firestore.collection('Invoices');
  }

  ngOnInit(): void {
  }

  printTest() {
    this.printService.printTest()
  }

  saveCustomer() {

    const customter = {
      fullName: 'Duong Bao',
      isBom: false,
      address: '48 Nha Vuong - Dien Son - Dien Khanh',
      isCanDelivery: true,
      phoneNumber1: '0979078870',
      phoneNumber2: ''
    }
    this.customerCollection.doc(this.identifier).set(customter);
    this.indexedDBService.addData(Object.assign(customter, {
      Customerid: this.identifier
    }), 'Customers')
  }
  makeDeal() {
    const invoice = {
      message: 'don 41',
      Customerid: this.identifier
    }
    const crrDate = (new Date()).getTime().toString();
    this.invoiceCollection.doc(`${crrDate}_${this.invoiceNumber}`).set(invoice)
    this.indexedDBService.addData(Object.assign(invoice, {
      InvoiceId: this.invoiceNumber
    }), 'Invoices');
    this.invoiceNumber++;
  }
}
