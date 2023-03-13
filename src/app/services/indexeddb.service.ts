import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class IndexedDBService {
    private db: any | IDBDatabase;
    version = 1;
    constructor() {
        this.openDatabase();
    }

    openDatabase() {
        const request = window.indexedDB.open('FBInvoicesManagement', this.version);

        request.onsuccess = (event) => {
            this.db = request.result;
        };

        request.onupgradeneeded = (event: any) => {
            const db = event.target.result;
            db.createObjectStore('Customers', { keyPath: 'id' });
            db.createObjectStore('Invoices', { keyPath: 'InvoiceId' });
            db.createObjectStore('FBPages', { keyPath: 'id' });
        };
    }

    addData(data: any, tableName: string) {
        const transaction = this.db.transaction([tableName], 'readwrite');
        const objectStore = transaction.objectStore(tableName);
        objectStore.add(data);
    }

    getData(id: string, tableName: string) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([tableName], 'readonly');
            const objectStore = transaction.objectStore(tableName);
            const request = objectStore.get(id);
            request.onsuccess = (event: any) => {
                resolve(event.target.result);
            };
            request.onerror = (event: any) => {
                reject(event);
            };
        });
    }
}
