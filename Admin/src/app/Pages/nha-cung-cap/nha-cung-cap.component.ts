import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { INhaCungCap } from 'src/app/Models/nha-cung-cap';
import { NhaCungCapService } from 'src/app/Service/nha-cung-cap.service';
import { baseUrl } from 'src/app/baseUrl';

@Component({
  selector: 'app-nha-cung-cap',
  templateUrl: './nha-cung-cap.component.html',
  styleUrls: ['./nha-cung-cap.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class NhaCungCapComponent {
  baseUrl = baseUrl;

  title = 'Quản lý Nhà cung cấp';

  nhacungcap!: INhaCungCap;

  nhacungcaps!: INhaCungCap[];

  submitted: boolean = false;

  Dialog: boolean = false;

  Save = 'Lưu';
  constructor(
    private nhacungcapService: NhaCungCapService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.nhacungcapService.getAll().subscribe((data) => {
      this.nhacungcaps = data;
    });
  }
  openNew() {
    this.nhacungcap = {};
    this.submitted = false;
    this.Dialog = true;
    this.Save = 'Lưu';
  }

  edit(nhacungcap: INhaCungCap) {
    this.nhacungcapService.getById(nhacungcap.id).subscribe((data) => {
      this.nhacungcap = data;
      this.Dialog = true;
      this.Save = 'Cập nhập';
    });
  }

  deleteOnly(nhacungcap: INhaCungCap) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa ' + nhacungcap.tenNhaCungCap + '?',
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.nhacungcapService.delete(nhacungcap.id!).subscribe((res) => {
          this.loadData();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: res.message,
            life: 3000,
          });
        });
      },
    });
  }

  hidenDialog() {
    this.Dialog = false;
    this.nhacungcap = {};
    this.submitted = false;
  }

  save() {
    console.log(this.nhacungcap);
    this.submitted = true;

    if (this.nhacungcap.tenNhaCungCap) {
      if (this.nhacungcap.id) {
        this.nhacungcapService.update(this.nhacungcap).subscribe({
          next: (res) => {
            this.loadData();
            this.hidenDialog();
            this.messageService.add({
              severity: 'success',
              summary: 'Thông báo',
              detail: res.message,
              life: 3000,
            });
          },
          error: (err) => {
            this.loadData();
            this.messageService.add({
              severity: 'error',
              summary: 'Thông báo',
              detail: 'Lỗi',
              life: 3000,
            });
          },
        });
      } else {
        this.nhacungcapService.create(this.nhacungcap).subscribe({
          next: (res) => {
            this.loadData();
            this.hidenDialog();
            this.messageService.add({
              severity: 'success',
              summary: 'Thông báo',
              detail: res.message,
              life: 3000,
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Thông báo',
              detail: 'Lỗi',
              life: 3000,
            });
          },
        });
      }
    }
  }
}
