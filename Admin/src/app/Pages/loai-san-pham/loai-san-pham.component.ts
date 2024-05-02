import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ILoaiSanPham } from 'src/app/Models/loai-san-pham';
import { LoaiSanPhamService } from 'src/app/Service/loai-san-pham.service';
import { baseUrl } from 'src/app/baseUrl';

@Component({
  selector: 'app-loai-san-pham',
  templateUrl: './loai-san-pham.component.html',
  styleUrls: ['./loai-san-pham.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class LoaiSanPhamComponent {
  baseUrl = baseUrl;

  title = 'Quản lý loại sản phẩm';

  loai!: ILoaiSanPham;

  loais!: ILoaiSanPham[];

  submitted: boolean = false;

  Dialog: boolean = false;

  Save = 'Lưu';

  constructor(
    private loaiService: LoaiSanPhamService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loaiService.getAll().subscribe((data) => {
      this.loais = data;
    });
  }

  toggleTrangThai(loai: ILoaiSanPham) {
    this.loaiService.toggleTrangThai(loai.id).subscribe(() => {
      this.loadData();
    });
  }
  openNew() {
    this.loai = {};
    this.shouldDisplayImage = false;
    this.submitted = false;
    this.Dialog = true;
    this.Save = 'Lưu';
  }

  shouldDisplayImage: boolean = false;
  edit(loai: ILoaiSanPham) {
    this.loaiService.getById(loai.id).subscribe((data) => {
      this.loai = data;
      this.Dialog = true;
      this.Save = 'Cập nhập';
    });
  }

  deleteOnly(loai: ILoaiSanPham) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa ' + loai.tenLoai + '?',
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loaiService.delete(loai.id!).subscribe((res) => {
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
    this.loai = {};
    this.shouldDisplayImage = false;
    this.submitted = false;
  }

  save() {
    this.submitted = true;

    if (this.loai.tenLoai) {
      if (this.loai.id) {
        this.loaiService.update(this.loai).subscribe({
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
        this.loaiService.create(this.loai).subscribe({
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
