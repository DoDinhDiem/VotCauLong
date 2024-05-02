import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IKhachHang } from 'src/app/Models/khach-hang';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/Service/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [MessageService],
})
export class AccountComponent {
  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private router: Router
  ) {}

  khachhang: IKhachHang = {};
  signUp() {
    console.log(this.khachhang);
    this.accountService.signUp(this.khachhang).subscribe({
      next: (res) => {
        this.khachhang = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Thông báo',
          detail: res.message,
          life: 3000,
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Thông báo',
          detail: err?.error.message,
          life: 3000,
        });
      },
    });
  }

  singIn() {
    this.accountService.signIn(this.khachhang).subscribe({
      next: (res) => {
        this.khachhang = {};
        this.accountService.storeToken(res.accessToken);
        this.accountService.storeRefreshToken(res.refreshToken);
        this.messageService.add({
          severity: 'success',
          summary: 'Thông báo',
          detail: res.message,
          life: 3000,
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Thông báo',
          detail: err?.error.message,
          life: 3000,
        });
      },
    });
  }
}
