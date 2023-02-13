import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
    socket: WebSocket | any;
    constructor() { }

    connectPrint() {
        this.socket = new WebSocket('ws://192.168.1.222:9100');

        this.socket.onopen = (event: any) => {
            console.log('WebSocket connected:', event);
        };

        this.socket.onmessage = (event: any) => {
            console.log('WebSocket message received:', event);
        };

        this.socket.onerror = (event: any) => {
            console.error('WebSocket error:', event);
        };

        this.socket.onclose = (event: any) => {
            console.log('WebSocket closed:', event);
        };
    }

    sendMessage(message: string) {
        this.socket.send(message);
    }

    printTest() {
        const cmd = '\x1B\x40' +
            '\x1B\x33\x01' +
            '\x1D\x21\x11' +
            'Hello World!' +
            '\x0A\x0A\x0A\x0A\x0A\x0D\x0A';
        this.socket.send(cmd);
    }
}