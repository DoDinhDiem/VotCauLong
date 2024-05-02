import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IThuongHieu } from 'src/app/Models/thuong-hieu';
import { ThuongHieuService } from 'src/app/Service/thuong-hieu.service';
import { baseUrl } from 'src/app/baseUrl';

@Component({
  selector: 'app-thuong-hieu',
  templateUrl: './thuong-hieu.component.html',
  styleUrls: ['./thuong-hieu.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ThuongHieuComponent {
  baseUrl = baseUrl;

  title = 'Quản lý thương hiệu';

  thuonghieu!: IThuongHieu;

  thuonghieus!: IThuongHieu[];

  submitted: boolean = false;

  Dialog: boolean = false;

  Save = 'Lưu';

  constructor(
    private thuonghieuService: ThuongHieuService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.thuonghieuService.getAll().subscribe((data) => {
      this.thuonghieus = data;
    });
  }

  toggleTrangThai(thuonghieu: IThuongHieu) {
    this.thuonghieuService.toggleTrangThai(thuonghieu.id).subscribe(() => {
      this.loadData();
    });
  }
  openNew() {
    this.thuonghieu = {};
    this.shouldDisplayImage = false;
    this.submitted = false;
    this.Dialog = true;
    this.Save = 'Lưu';
  }

  shouldDisplayImage: boolean = false;
  edit(thuonghieu: IThuongHieu) {
    this.thuonghieuService.getById(thuonghieu.id).subscribe((data) => {
      this.thuonghieu = data;
      this.Dialog = true;
      this.Save = 'Cập nhập';
    });
  }

  deleteOnly(thuonghieu: IThuongHieu) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa ' + thuonghieu.tenThuongHieu + '?',
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.thuonghieuService.delete(thuonghieu.id!).subscribe((res) => {
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
    this.thuonghieu = {};
    this.shouldDisplayImage = false;
    this.submitted = false;
  }

  save() {
    this.submitted = true;
    console.log(this.thuonghieu);
    if (this.thuonghieu.tenThuongHieu) {
      if (this.thuonghieu.id) {
        this.thuonghieuService.update(this.thuonghieu).subscribe({
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
        this.thuonghieuService.create(this.thuonghieu).subscribe({
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
