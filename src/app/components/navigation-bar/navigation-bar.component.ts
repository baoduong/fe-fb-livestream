import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FacebookService } from 'ngx-facebook';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent implements OnInit {

  constructor(private fb: FacebookService) { }

  ngOnInit(): void {
  }
  logoutFromFacebook() {
    this.fb.logout()
      .then(() => console.log('Logged out from Facebook'))
      .catch((error: any) => console.error(error));
  }
}
