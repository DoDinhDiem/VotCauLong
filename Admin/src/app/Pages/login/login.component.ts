import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { INhanVien } from 'src/app/Models/nhan-vien';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private messageService: MessageService,
    private auth: AuthService
  ) {}
  nhanvien: INhanVien = {};
  onSubmit() {
    this.auth.signIn(this.nhanvien).subscribe({
      next: (res) => {
        this.nhanvien = {};
        this.auth.storeToken(res.accessToken);
        this.auth.storeRefreshToken(res.refreshToken);
        const tokenPayload = this.auth.decodedToken();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Thông báo',
          detail: 'Lỗi đăng nhập! Vui lòng xem lại',
        });
      },
    });
  }
}
