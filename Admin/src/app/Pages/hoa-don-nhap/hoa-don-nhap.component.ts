import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IHoaDonNhap } from 'src/app/Models/hoa-don-nhap';
import { AuthService } from 'src/app/Service/auth.service';
import { HoaDonNhapService } from 'src/app/Service/hoa-don-nhap.service';
import { NhaCungCapService } from 'src/app/Service/nha-cung-cap.service';
import { SanPhamService } from 'src/app/Service/san-pham.service';

interface action {
  value: boolean;
  name: string;
}
@Component({
  selector: 'app-hoa-don-nhap',
  templateUrl: './hoa-don-nhap.component.html',
  styleUrls: ['./hoa-don-nhap.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class HoaDonNhapComponent {
  title = 'Quản lý hóa đơn nhập';
  hoadonnhap: IHoaDonNhap = {};
  hoadonnhaps!: IHoaDonNhap[];
  submitted: boolean = false;
  Dialog: boolean = false;
  selecteds!: IHoaDonNhap[] | null;
  Save = 'Lưu';
  shouldDisplayImage: boolean = false;
  //select của trạng thái hoạt động

  actions!: action[];
  selectAction!: action;

  //select và hiển ở table của loại
  sanpham: any[] = [];
  selectedSanPhamId: any;

  //select và hiển ở table của
  nhacungcap: any[] = [];
  selectedNhaCungCapId: any;

  //Key search

  orderDetail: any[] = [];

  visible: boolean = false;
  DialogEdit: boolean = false;

  chiTietHoaDons: any[] = [];

  constructor(
    private hoadonnhapService: HoaDonNhapService,
    private sanphamService: SanPhamService,
    private nhacungcapService: NhaCungCapService,
    private messageService: MessageService,
    private authen: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();

    this.actions = [
      { value: true, name: 'Đã thanh toán' },
      { value: false, name: 'Chưa thanh toán' },
    ];
  }

  //Hiển thị dữ liệu
  loadData() {
    this.sanphamService.getAll().subscribe((data) => {
      this.sanpham = data.map((item) => ({
        id: item.id,
        name: item.tenSanPham,
      }));
    });
    this.nhacungcapService.getAll().subscribe((data) => {
      this.nhacungcap = data.map((item) => ({
        id: item.id,
        name: item.tenNhaCungCap,
      }));
    });

    this.hoadonnhapService.getAll().subscribe((data) => {
      this.hoadonnhaps = data;
    });
  }

  //Mở dialog
  openNew() {
    this.hoadonnhap = {};
    this.orderDetail = [];
    this.submitted = false;
    this.Dialog = true;
    this.Save = 'Lưu';
  }

  //Mở dialog khi sửa
  edit(hoadonnhap: IHoaDonNhap) {
    this.hoadonnhapService.getById(hoadonnhap.id).subscribe((data) => {
      this.hoadonnhap = data;
      this.selectAction = this.actions.find(
        (option) => option.value == data.trangThaiThanhToan
      );
      this.selectedNhaCungCapId = this.nhacungcap.find(
        (option) => option.id == data.nhaCungCapId
      );
      this.DialogEdit = true;
      this.Save = 'Cập nhập';
    });
  }

  //Đóng dialog sản phẩm
  hidenDialog() {
    this.Dialog = false;
    this.DialogEdit = false;
    this.hoadonnhap = {};
    this.orderDetail = [];
    this.submitted = false;
  }

  //Thêm sửa sản phẩm
  save() {
    this.hoadonnhap.nhaCungCapId = this.selectedNhaCungCapId?.id;
    this.hoadonnhap.trangThaiThanhToan = this.selectAction?.value;
    this.hoadonnhap.nhanVienId = Number(this.authen.getIdFromToken());

    this.hoadonnhap.chitiethoadonnhaps = [];
    for (let i = 0; i < this.orderDetail.length; i++) {
      const order = this.orderDetail[i];
      const soLuong: number = Number(order.soLuong);
      const giaNhap: number = Number(order.giaNhap);
      const chitiet = {
        sanPhamId: order.selectedSanPhamId.id,
        soLuong: Number(order.soLuong),
        giaNhap: Number(order.giaNhap),
        thanhTien: soLuong * giaNhap,
      };
      this.hoadonnhap.chitiethoadonnhaps.push(chitiet);
    }
    this.submitted = true;
    console.log(this.hoadonnhap);
    this.hoadonnhapService.create(this.hoadonnhap).subscribe({
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

  update() {
    this.hoadonnhap.nhaCungCapId = this.selectedNhaCungCapId.id;
    this.hoadonnhap.trangThaiThanhToan = this.selectAction.value;
    this.hoadonnhapService.update(this.hoadonnhap).subscribe((data) => {
      this.DialogEdit = false;
      this.loadData();
      this.messageService.add({
        severity: 'success',
        summary: 'Thông báo',
        detail: data.message,
        life: 3000,
      });
    });
  }

  //Thông số sản phẩm
  addProductOrder() {
    this.orderDetail.push({
      selectedSanPhamId: '',
      soLuongNhap: '',
      giaNhap: '',
    });
  }
  removeProductOrder(index: number) {
    this.orderDetail.splice(index, 1);
  }

  showDialog() {
    this.visible = true;
  }

  InHoaDon(hoadonnhap: IHoaDonNhap) {
    this.hoadonnhapService.getById(hoadonnhap.id).subscribe((data) => {
      this.hoadonnhap = data;
      this.chiTietHoaDons = data.chiTietHoaDon;
      this.showDialog();
    });
  }

  printFunction() {
    window.print();
  }
}
