import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentDetailsComponent implements OnInit {
  @Input() message: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
