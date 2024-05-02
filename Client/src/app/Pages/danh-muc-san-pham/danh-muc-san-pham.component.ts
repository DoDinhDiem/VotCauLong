import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/Service/cart.service';
import { DanhMucSanPhamService } from 'src/app/Service/danh-muc-san-pham.service';
import { HeThongService } from 'src/app/Service/he-thong.service';
import { baseUrl } from 'src/app/baseUrl';

@Component({
  selector: 'app-danh-muc-san-pham',
  templateUrl: './danh-muc-san-pham.component.html',
  styleUrls: ['./danh-muc-san-pham.component.css'],
  providers: [MessageService],
})
export class DanhMucSanPhamComponent {
  baseUrl = baseUrl;

  constructor(
    private danhMucSanPhamService: DanhMucSanPhamService,
    private heThongService: HeThongService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private messageService: MessageService // private auth: AccountService
  ) {}
  id!: any;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.GetLoaiSanPham();
      this.GetGiaLonNhatTheoLoai(this.id);
      this.GetHangSanPham(this.id);
    });
  }
  giaRange: any = '';
  GetGiaLonNhatTheoLoai(id: any) {
    this.danhMucSanPhamService.GetGiaLonNhatTheoLoai(id).subscribe((data) => {
      this.giaMax = data;
      this.giaRange = data;
      this.GetSanPhamByLoai(id);
    });
  }
  sanPhams: any;
  tenLSP: any;
  totalItem: any;
  GetSanPhamByLoai(id: any) {
    this.danhMucSanPhamService
      .GetSanPhamByLoai(id, this.hangid, this.sapxepSelects, this.giaMax)
      .subscribe((data) => {
        this.sanPhams = data;
        this.totalItem = this.sanPhams.totalItems;
        this.tenLSP = this.sanPhams.category;
        console.log(data);
      });
  }
  loaiSanPham: any;
  GetLoaiSanPham() {
    this.heThongService.GetLoaiSanPham().subscribe((data) => {
      this.loaiSanPham = data;
    });
  }

  hangSanPham: any;
  GetHangSanPham(id: any) {
    this.danhMucSanPhamService.GetHangSanPham(id).subscribe((data) => {
      this.hangSanPham = data;
      console.log(data);
    });
  }

  hangid: any = '';
  sapxep: any[] = [
    {
      value: 'date',
      name: 'Mới',
    },
    {
      value: 'pricemin',
      name: 'Giá thấp đến cao',
    },
    {
      value: 'pricemax',
      name: 'Giá cao đến thấp',
    },
    {
      value: 'name',
      name: 'Tên',
    },
  ];
  sapxepSelects: any = 'date';
  giaMin: any = 0;
  giaMax: any = '';

  //Tìm kiếm
  onSlide() {
    this.GetSanPhamByLoai(this.id);
  }
  onHangId(id: any) {
    this.hangid = id;
    this.GetSanPhamByLoai(this.id);
  }
  //Khi pageSize thay đổi
  onSapXepChange() {
    this.GetSanPhamByLoai(this.id);
  }
  //Phân trang
  p: number = 1;
  addToCart(product: any) {
    console.log(product);
    this.cartService.addToCart(product);
    this.cartService.loadCart();
    this.messageService.add({
      severity: 'success',
      summary: 'Thông báo',
      detail: 'Thêm vào giỏ hàng thành công',
      life: 3000,
    });
  }
}
