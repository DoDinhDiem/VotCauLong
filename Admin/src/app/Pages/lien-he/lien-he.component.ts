import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ILienHe } from 'src/app/Models/lien-he';
import { LienHeService } from 'src/app/Service/lien-he.service';
import { baseUrl } from 'src/app/baseUrl';
@Component({
  selector: 'app-lien-he',
  templateUrl: './lien-he.component.html',
  styleUrls: ['./lien-he.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class LienHeComponent {
  baseUrl = baseUrl;

  title = 'Quản lý Liên Hệ';

  lienhe!: ILienHe;

  lienhes!: ILienHe[];

  submitted: boolean = false;

  Dialog: boolean = false;

  Save = 'Lưu';
  constructor(
    private lienheService: LienHeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.lienheService.getAll().subscribe((data) => {
      this.lienhes = data;
    });
  }
  openNew() {
    this.lienhe = {};
    this.submitted = false;
    this.Dialog = true;
    this.Save = 'Lưu';
  }

  edit(lienhe: ILienHe) {
    this.lienheService.getById(lienhe.id).subscribe((data) => {
      this.lienhe = data;
      this.Dialog = true;
      this.Save = 'Cập nhập';
    });
  }

  deleteOnly(lienhe: ILienHe) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa ?',
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.lienheService.delete(lienhe.id!).subscribe((res) => {
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
    this.lienhe = {};
    this.submitted = false;
  }

  save() {
    console.log(this.lienhe);
    this.submitted = true;

    if (this.lienhe.id) {
      this.lienheService.update(this.lienhe).subscribe({
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
      this.lienheService.create(this.lienhe).subscribe({
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
