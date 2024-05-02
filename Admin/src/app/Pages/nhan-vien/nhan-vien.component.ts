import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { INhanVien } from 'src/app/Models/nhan-vien';
import { NhanVienService } from 'src/app/Service/nhan-vien.service';
import { QuyenService } from 'src/app/Service/quyen.service';
import { baseUrl } from 'src/app/baseUrl';

interface gender {
  name: string;
}
@Component({
  selector: 'app-nhan-vien',
  templateUrl: './nhan-vien.component.html',
  styleUrls: ['./nhan-vien.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class NhanVienComponent {
  baseUrl = baseUrl;

  title = 'Quản lý nhân viên';

  nhanvien!: INhanVien;

  nhanviens!: INhanVien[];

  submitted: boolean = false;

  Dialog: boolean = false;

  Save = 'Lưu';

  shouldDisplayImage: boolean = false;

  constructor(
    private nhanvienService: NhanVienService,
    private quyenService: QuyenService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  genders: gender[] = [];
  selectGender: gender | undefined;

  quyen: any[] = [];
  selectedQuyenId: any;

  loadData() {
    this.nhanvienService.getAll().subscribe((data) => {
      this.nhanviens = data;
    });
    this.genders = [{ name: 'Nam' }, { name: 'Nữ' }];
    this.quyenService.getAllTrangThai().subscribe((data) => {
      this.quyen = data.map((item) => ({
        id: item.id,
        name: item.tenRole,
      }));
    });
  }

  openNew() {
    this.nhanvien = {};
    this.submitted = false;
    this.shouldDisplayImage = false;
    this.Dialog = true;
    this.Save = 'Lưu';
  }

  edit(nhanvien: INhanVien) {
    this.nhanvienService.getById(nhanvien.id).subscribe((data) => {
      this.nhanvien = data;
      this.shouldDisplayImage = true;
      this.fileOnly = { name: data.image } as File;
      this.selectGender = this.genders.find(
        (option) => option.name == data.gioiTinh
      );
      this.selectedQuyenId = this.quyen.find(
        (option) => option.id === data.roleId
      );
      this.nhanvien.ngaySinh = new Date(data.ngaySinh);
      this.Dialog = true;
      this.Save = 'Cập nhập';
    });
  }
  toggleTrangThai(nhanvien: INhanVien) {
    this.nhanvienService.toggleTrangThai(nhanvien.id).subscribe(() => {
      this.loadData();
    });
  }
  deleteOnly(nhanvien: INhanVien) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa ' + nhanvien.hoTen + '?',
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.nhanvienService.delete(nhanvien.id!).subscribe((res) => {
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
    this.shouldDisplayImage = false;
    this.nhanvien = {};
    this.submitted = false;
  }

  save() {
    if (this.fileOnly) {
      this.nhanvien.avatar = this.fileOnly.name;
    }
    this.nhanvien.roleId = this.selectedQuyenId.id;
    this.nhanvien.gioitinh = this.selectGender?.name;
    this.submitted = true;
    if (this.fileOne) {
      this.onUpload();
      this.fileOne = false;
    }
    console.log(this.nhanvien);

    if (this.nhanvien.hoTen) {
      if (this.nhanvien.id) {
        this.nhanvienService.update(this.nhanvien).subscribe({
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
        this.nhanvienService.create(this.nhanvien).subscribe({
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

  fileOnly!: File;
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
    const newFileName = `nhanvien_${timestamp}_${this.sequenceNumber}.${extension}`;
    this.sequenceNumber++;
    return newFileName;
  }
  onUpload() {
    this.nhanvienService.uploadFile(this.fileOnly).subscribe({
      next: (response) => {},
      error: (err) => {},
    });
  }
}
