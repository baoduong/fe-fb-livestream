import { FbServiceService } from './../../services/fb-service.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FacebookService, private router: Router,
    private fbService: FbServiceService) { }

  ngOnInit(): void {
    this.fb.getLoginStatus().then(loginStatus => {
      console.log('Login status', loginStatus);
      if (loginStatus.status === 'connected') {
        console.log('User is already loggin');
        this.router.navigate(['/dashboard']);
      }
    })
  }

  loginWithFacebook() {
    this.fb.login({
      scope: 'public_profile,pages_show_list'
    })
      .then((response: LoginResponse) => {
        if (response.status === 'connected') {
          console.log('Get status accounts')
          this.fbService.getCurrentUser().subscribe(data => {
            console.log('data page', data)
            this.router.navigate(['/dashboard'])
          })

        };
      })
      .catch((error: any) => console.error(error));
  }

}
