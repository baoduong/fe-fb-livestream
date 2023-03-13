import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    private socket$: WebSocketSubject<any> | any;

    public connect(): void {
        this.socket$ = webSocket({
            url: 'wss://qdn448ylm0.execute-api.ap-southeast-1.amazonaws.com/dev',
            openObserver: {
                next: event => {
                    console.log('WebSocket connection established:', event);
                }
            }
        });

        this.socket$.subscribe(
            (event: any) => {
                console.log('Received WebSocket message:', event);
                // Process the incoming WebSocket message
                // ...
            },
            (error: any) => {
                console.error('WebSocket error:', error);
                // Handle the WebSocket error event
                // ...
            },
            () => {
                console.log('WebSocket connection closed');
                // Handle the WebSocket connection close event
                // ...
            }
        );
    }

    public sendMessage(message: any): void {
        if (this.socket$ && !this.socket$.closed) {
            const messageData = {
                action: 'fetch_comment',
                message: message
            }
            this.socket$.next(messageData);
            console.log('Sent WebSocket message:', messageData);
        } else {
            console.error('WebSocket connection is not open');
        }
    }

    public close(): void {
        if (this.socket$) {
            this.socket$.complete();
        }
    }
}
