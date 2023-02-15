import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        const isLoggedIn = await this.authService.isLoggedIn();
        if (isLoggedIn) {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false
    }

}
