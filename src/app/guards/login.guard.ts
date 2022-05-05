import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
    if (this.authService.isLoggedIn()) {
        console.log('we authenticated')
        this.router.navigate(['/home']);
    } else {
        console.log('not authenticated')
    }
    return !this.authService.isLoggedIn();
  }
}
