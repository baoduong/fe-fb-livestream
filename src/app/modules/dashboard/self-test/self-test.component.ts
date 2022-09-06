import { PrinterService } from '../../../services/printer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './self-test.component.html',
  styleUrls: ['./self-test.component.scss']
})
export class SelfTestComponent implements OnInit {

  constructor(private printService: PrinterService) { }

  ngOnInit(): void {
  }

  printTest() {
    this.printService.printTest()
  }
}
