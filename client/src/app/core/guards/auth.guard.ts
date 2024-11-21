import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            console.log('Authenticated')/////////////
            return true;
        } else {
            console.log('NO Authenticated')//////////
            this.router.navigate(['/auth/login']);
            console.log('NO Authenticated')/////////////
            return false;
        }
    }
}