import { WebSocketService } from './../../services/ws.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './testing-page.component.html',
  styleUrls: ['./testing-page.component.scss']
})
export class TestingPageComponent implements OnInit {

  constructor(
    private ws: WebSocketService
  ) { }

  ngOnInit(): void {
    this.ws.connect();
  }

  sendMessage() {
    const a = new Date();
    this.ws.sendMessage(`Message time: ${a.getTime()}`)
  }

}
