import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IHoaDon } from 'src/app/Models/hoa-don';
import { IKhachHang } from 'src/app/Models/khach-hang';
import { AccountService } from 'src/app/Service/account.service';
import { CartService } from 'src/app/Service/cart.service';
import { CheckOutService } from 'src/app/Service/check-out.service';

interface IOrderInfo {
  name?: string;
  phone?: any;
  address?: string;
  notes?: string;
}
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
  providers: [MessageService],
})
export class SuccessComponent {
  vnp_Amount: any;
  vnp_BankCode: any;
  vnp_CardType: any;
  vnp_OrderInfo: any;
  vnp_TransactionStatus: any;

  cartItems: any[] = [];
  quantity = 0;
  totalPrice: number = 0;
  price: number = 0;

  notification: boolean = true;

  constructor(
    private cartService: CartService,
    private checkoutService: CheckOutService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.vnp_Amount = params['vnp_Amount'];
      this.vnp_BankCode = params['vnp_BankCode'];
      this.vnp_CardType = params['vnp_CardType'];
      this.vnp_OrderInfo = params['vnp_OrderInfo'];
      this.vnp_TransactionStatus = params['vnp_TransactionStatus'];
    });
    this.cartService.loadCart();
    this.cartService.products$.subscribe((products) => {
      this.getQuantity();
      this.calculateTotalPrice();
    });
    this.cartItems = this.cartService.getCartItem();
    this.id = this.accountService.getIdFromToken();
    this.getByIdKhachHang();
    this.orderInfor();
  }

  ngOnInit() {}

  parsedOrderInfo: Partial<IOrderInfo> = {};

  orderInfor() {
    const regex = /(\w+)=(.*?)(?=\s+\w+=|$)/g;
    let match;
    while ((match = regex.exec(this.vnp_OrderInfo)) !== null) {
      const [, key, value] = match;
      this.parsedOrderInfo[key as keyof IOrderInfo] = value;
    }
  }

  getQuantity() {
    this.quantity = this.cartService.getQuantity();
  }
  calculateTotalPrice() {
    this.totalPrice = this.cartService.getTotalPrice();
  }
  calculateSubtotal(cart: any): number {
    const discountedPrice = cart.thanhTien;
    return discountedPrice * cart.soLuong;
  }

  khachhang!: IKhachHang;
  id: any;
  getByIdKhachHang() {
    this.checkoutService.GetKhacHangById(this.id).subscribe((data) => {
      this.khachhang = data;
      this.id = this.khachhang.id;
      this.saveInvoice();
    });
  }

  hoadon: IHoaDon = {};
  noiDung: string = 'Thanh toán thất bại';
  saveInvoice() {
    //Hóa Đơn
    if (this.vnp_TransactionStatus == 0) {
      this.hoadon.khachHangId = this.khachhang.id;
      this.hoadon.hoTen = this.parsedOrderInfo.name;
      this.hoadon.soDienThoai = this.parsedOrderInfo.phone;
      this.hoadon.diaChi = this.parsedOrderInfo.address;
      this.hoadon.ghiChu = this.parsedOrderInfo.notes;
      this.hoadon.tongTien = this.vnp_Amount;
      this.hoadon.trangThaiDonHang = 'Chờ xác nhận';
      this.hoadon.trangThaiThanhToan = true;
      this.hoadon.phuongThucThanhToan = 'Thanh toán qua ví VNPAY';

      this.hoadon.chitiethoadonbans = [];
      for (let i = 0; i < this.cartItems.length; i++) {
        const order = this.cartItems[i];
        const chitiet = {
          sanPhamId: order.id,
          soLuong: order.soLuong,
          giaBan: order.thanhTien,
          thanhTien: Number(this.calculateSubtotal(order)),
        };
        this.hoadon.chitiethoadonbans.push(chitiet);
      }
      this.checkoutService.createHoaDonBan(this.hoadon).subscribe({
        next: (res) => {
          this.cartService.clearProducts();
          this.cartService.loadCart();
          this.cartItems = [];
          this.totalPrice = 0;
          this.router.navigate(['/success']);

          this.notification = true;
          this.noiDung = 'Thanh toán thành công';
        },
        error: (err) => {
          this.notification = false;
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Thông báo',
        detail: 'Lỗi! Vui lòng chọn phương thức thanh toán',
        life: 3000,
      });
      this.notification = false;
      this.noiDung = 'Thanh toán thất bại';
    }
  }
}
