import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IHoaDon } from 'src/app/Models/hoa-don';
import { IKhachHang } from 'src/app/Models/khach-hang';
import { AccountService } from 'src/app/Service/account.service';
import { CartService } from 'src/app/Service/cart.service';
import { CheckOutService } from 'src/app/Service/check-out.service';
import { baseUrl } from 'src/app/baseUrl';

@Component({
  selector: 'app-thanh-toan',
  templateUrl: './thanh-toan.component.html',
  styleUrls: ['./thanh-toan.component.css'],
  providers: [MessageService],
})
export class ThanhToanComponent {
  baseUrl = baseUrl;
  selectedPaymentMethod!: string;
  cartItems: any[] = [];
  quantity = 0;
  totalPrice: number = 0;
  price: number = 0;
  id!: any;
  constructor(
    private cartService: CartService,
    private checkoutService: CheckOutService,
    private messageService: MessageService,
    private accountService: AccountService
  ) {
    this.id = this.accountService.getIdFromToken();
    this.getByIdKhachHang();
  }

  ngOnInit() {
    this.cartService.loadCart();
    this.cartService.products$.subscribe((products) => {
      this.getQuantity();
      this.calculateTotalPrice();
    });
    this.cartItems = this.cartService.getCartItem();
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
  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  khachhang: IKhachHang = {};
  getByIdKhachHang() {
    this.checkoutService.GetKhacHangById(this.id).subscribe((data) => {
      this.khachhang = data;
    });
  }

  hoadon: IHoaDon = {};
  onSubmit() {
    this.hoadon.tongTien = this.totalPrice;
    this.hoadon.khachHangId = this.khachhang.id;
    this.hoadon.hoTen = this.khachhang.hoTen;
    this.hoadon.soDienThoai = String(this.khachhang.soDienThoai);
    this.hoadon.diaChi = this.khachhang.diaChi;
    this.hoadon.trangThaiDonHang = 'Chờ xác nhận';
    this.hoadon.trangThaiThanhToan = false;
    this.hoadon.phuongThucThanhToan = 'Thanh toán khi nhận hàng';
    console.log(this.hoadon);
    if (this.selectedPaymentMethod == undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Thông báo',
        detail: 'Lỗi! Vui lòng chọn phương thức thanh toán',
        life: 3000,
      });
    } else {
      if (this.selectedPaymentMethod == 'vnpay') {
        console.log(this.hoadon);
        this.checkoutService.GetLinkVnpay(this.hoadon).subscribe({
          next: (res) => {
            window.location.href = res.linkUrl;
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Thông báo',
              detail: 'Lỗi! Vui lòng xem lại',
              life: 3000,
            });
          },
        });
      } else if (this.selectedPaymentMethod == 'cash') {
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
              detail: err.error.message,
              life: 3000,
            });
          },
        });
      }
    }
  }
}
