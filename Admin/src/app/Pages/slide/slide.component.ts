import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ISlide } from 'src/app/Models/slide';
import { SlideService } from 'src/app/Service/slide.service';
import { baseUrl } from 'src/app/baseUrl';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class SlideComponent {
  baseUrl = baseUrl;

  title = 'Quản Lý Slide';

  slide!: ISlide;

  slides!: ISlide[];

  submitted: boolean = false;

  Dialog: boolean = false;

  Save = 'Lưu';

  constructor(
    private slideService: SlideService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.slideService.getAll().subscribe((data) => {
      this.slides = data;
    });
  }
  openNew() {
    this.slide = {};
    this.submitted = false;
    this.shouldDisplayImage = false;
    this.fileOnly = null;
    this.Dialog = true;
    this.Save = 'Lưu';
  }

  shouldDisplayImage: boolean = false;
  edit(slide: ISlide) {
    this.slideService.getById(slide.id).subscribe((data) => {
      this.slide = data;
      this.shouldDisplayImage = true;
      this.fileOnly = { name: data.icon } as File;
      this.Dialog = true;
      this.Save = 'Cập nhập';
    });
  }

  deleteOnly(slide: ISlide) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa ?',
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.slideService.delete(slide.id!).subscribe((res) => {
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
    this.slide = {};
    this.submitted = false;
  }

  save() {
    if (this.fileOnly) {
      this.slide.image = this.fileOnly.name;
    }
    this.submitted = true;

    if (this.slide.id) {
      this.slideService.update(this.slide).subscribe({
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
      this.slideService.create(this.slide).subscribe({
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

  fileOnly: File;
  sequenceNumber = 0;

  onFileOnly(event) {
    const files: FileList = event.target.files;
    const file = files[0];
    if (file) {
      const newName = this.generateNewFileName(file.name);
      this.fileOnly = new File([file], newName, { type: file.type });
    }
  }

  generateNewFileName(oldFileName: string): string {
    const timestamp = new Date().getTime();
    const extension = oldFileName.split('.').pop();
    const newFileName = `slidesp_${timestamp}_${this.sequenceNumber}.${extension}`;
    this.sequenceNumber++;
    return newFileName;
  }
  onUpload() {
    this.slideService.uploadFile(this.fileOnly).subscribe({
      next: (response) => {},
      error: (err) => {},
    });
  }

  toggleTrangThai(loai: ISlide) {
    this.slideService.toggleTrangThai(loai.id).subscribe(() => {
      this.loadData();
    });
  }
}
