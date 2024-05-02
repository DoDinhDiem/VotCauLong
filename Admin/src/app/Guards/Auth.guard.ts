import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../Service/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(
        private auth: AuthService,
        private router: Router,
        private toast: NgToastService
    ) {}
    canActivate(): boolean {
        if (this.auth.isLoggedIn()) {
            return true;
        } else {
            this.toast.error({
                detail: 'ERROR',
                summary: 'Vui lòng đăng nhập trước!',
            });
            this.router.navigate(['login']);
            return false;
        }
    }
}
