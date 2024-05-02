import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ITinTuc } from 'src/app/Models/tin-tuc';
import { AuthService } from 'src/app/Service/auth.service';
import { TinTucService } from 'src/app/Service/tin-tuc.service';
import { baseUrl } from 'src/app/baseUrl';

@Component({
  selector: 'app-tin-tuc',
  templateUrl: './tin-tuc.component.html',
  styleUrls: ['./tin-tuc.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class TinTucComponent {
  baseUrl = baseUrl;

  title = 'Quản lý tin tức';

  tintuc!: ITinTuc;

  tintucs!: ITinTuc[];

  submitted: boolean = false;

  Dialog: boolean = false;

  Save = 'Lưu';

  constructor(
    private tintucService: TinTucService,
    private authen: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.tintucService.getAll().subscribe((data) => {
      this.tintucs = data;
    });
  }

  openNew() {
    this.tintuc = {};
    this.fileOnly = undefined;
    this.submitted = false;
    this.Dialog = true;
    this.Save = 'Lưu';
  }

  shouldDisplayImage: boolean = false;
  edit(tintuc: ITinTuc) {
    this.tintucService.getById(tintuc.id).subscribe((data) => {
      this.tintuc = data;
      this.shouldDisplayImage = true;
      this.fileOnly = { name: data.image } as File;
      this.Dialog = true;

      this.Save = 'Cập nhập';
    });
  }

  deleteOnly(tintuc: ITinTuc) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa ' + tintuc.tieuDe + '?',
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tintucService.delete(tintuc.id!).subscribe((res) => {
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
    this.tintuc = {};
    this.shouldDisplayImage = false;
    this.submitted = false;
  }

  save() {
    if (this.fileOnly) {
      this.tintuc.image = this.fileOnly.name;
    }
    this.tintuc.nhanVienId = this.authen.getIdFromToken();
    this.submitted = true;
    if (this.fileOne) {
      this.onUpload();
      this.fileOne = false;
    }
    console.log(this.tintuc);
    if (this.tintuc.tieuDe) {
      if (this.tintuc.id) {
        this.tintucService.update(this.tintuc).subscribe({
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
        this.tintucService.create(this.tintuc).subscribe({
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

  fileOnly: File | undefined;
  sequenceNumber = 0;
  fileOne: boolean = false;

  onFileOnly(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.fileOne = true;
      const file = files[0];
      const newName = this.generateNewFileName(file.name);
      this.fileOnly = new File([file], newName, { type: file.type });
    } else {
      this.fileOne = false;
    }
  }

  generateNewFileName(oldFileName: string): string {
    const timestamp = new Date().getTime();
    const extension = oldFileName.split('.').pop();
    const newFileName = `tintucsp_${timestamp}_${this.sequenceNumber}.${extension}`;
    this.sequenceNumber++;
    return newFileName;
  }
  onUpload() {
    this.tintucService.uploadFile(this.fileOnly!).subscribe({
      next: (response) => {},
      error: (err) => {},
    });
  }
}
