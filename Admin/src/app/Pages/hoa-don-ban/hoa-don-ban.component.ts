import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IHoaDonBan } from 'src/app/Models/hoa-don-ban';
import { HoaDonBanService } from 'src/app/Service/hoa-don-ban.service';

interface action {
  value: boolean;
  name: string;
}
interface statusProduct {
  name: string;
}
@Component({
  selector: 'app-hoa-don-ban',
  templateUrl: './hoa-don-ban.component.html',
  styleUrls: ['./hoa-don-ban.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class HoaDonBanComponent {
  title = 'Quản lý hóa đơn bán';
  hoadonban: IHoaDonBan = {};
  hoadonbans!: IHoaDonBan[];
  submitted: boolean = false;
  Dialog: boolean = false;
  selecteds!: IHoaDonBan[] | null;
  shouldDisplayImage: boolean = false;

  status!: statusProduct[];
  selectStatus!: statusProduct;

  actions!: action[];
  selectAction!: action;

  visible: boolean = false;

  //Key search
  selectedItem: string;

  orderDetail: any[] = [];
  chiTietHoaDons: any[] = [];
  chiTietHoaDon: any;

  constructor(private hoadonbanService: HoaDonBanService) {}

  ngOnInit(): void {
    this.loadData();

    this.status = [
      { name: 'Đơn hàng mới' },
      { name: 'Đang xử lý' },
      { name: 'Đã xác nhận' },
      { name: 'Đang vận chuyển' },
      { name: 'Giao hàng thành công' },
      { name: 'Đã hủy' },
      { name: 'Đã hoàn trả' },
    ];

    this.actions = [
      { value: false, name: 'Chưa thanh toán' },
      { value: true, name: 'Đã thanh toán' },
    ];
  }

  //Hiển thị dữ liệu
  loadData() {
    this.hoadonbanService.getAll().subscribe((data) => {
      this.hoadonbans = data;
    });
  }

  //Mở dialog khi sửa
  edit(hoadonban: IHoaDonBan) {
    this.hoadonbanService.getById(hoadonban.id).subscribe((data) => {
      this.hoadonban = data;
      this.selectStatus = this.status.find(
        (option) => option.name === data.trangThaiDonHang
      );
      this.selectAction = this.actions.find(
        (option) => option.value == data.trangThaiThanhToan
      );
      this.orderDetail = data.chiTiethoadonban;
      this.Dialog = true;
    });
  }
  hidenDialog() {
    this.Dialog = false;
    this.hoadonban = {};
    this.submitted = false;
  }

  save() {
    this.hoadonban.trangThaiThanhToan = this.selectAction.value;
    this.hoadonban.trangThaiDonHang = this.selectStatus.name;
    if (this.hoadonban.id) {
      this.hoadonbanService.update(this.hoadonban).subscribe((data) => {
        this.hidenDialog();
        this.loadData();
      });
    }
  }

  showDialog() {
    this.visible = true;
  }

  InHoaDon(hoadonban: IHoaDonBan) {
    this.hoadonbanService.getById(hoadonban.id).subscribe((data) => {
      this.hoadonban = data;
      this.chiTietHoaDons = data.chiTietHoaDon;
      this.showDialog();
    });
  }

  printFunction() {
    window.print();
  }
}
