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

  constructor(private fb: FacebookService, private router: Router) { }

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
    this.fb.login()
      .then((response: LoginResponse) => {
        if (response.status === 'connected') {
          this.router.navigate(['/dashboard'])
        };
      })
      .catch((error: any) => console.error(error));
  }

}
