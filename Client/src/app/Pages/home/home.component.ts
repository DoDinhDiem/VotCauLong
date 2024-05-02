import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/Service/cart.service';
import { HeThongService } from 'src/app/Service/he-thong.service';
import { HomeService } from 'src/app/Service/home.service';
import { baseUrl } from 'src/app/baseUrl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService],
})
export class HomeComponent {
  baseUrl = baseUrl;

  constructor(
    private heThongService: HeThongService,
    private homeService: HomeService,
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.GetLoaiSanPham();
    this.GetSlide();
    this.GetSanPhamMoi();
    this.GetSanPhamBanChay();
    this.GetSanPhamGiamGia();
    this.GetTinTuc();

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  loaiSanPham: any[] = [];
  GetLoaiSanPham() {
    this.heThongService.GetLoaiSanPham().subscribe((data) => {
      this.loaiSanPham = data;
    });
  }

  images: any[] | undefined;
  GetSlide() {
    this.homeService.GetSlide().subscribe((data) => {
      this.images = data;
    });
  }

  sanPhamMoi: any[] = [];
  GetSanPhamMoi() {
    this.homeService.GetSanPhamMoi().subscribe((data) => {
      this.sanPhamMoi = data;
    });
  }

  sanPhamBanChay: any[] = [];
  GetSanPhamBanChay() {
    this.homeService.GetSanPhamBanChay().subscribe((data) => {
      this.sanPhamBanChay = data;
    });
  }

  sanPhamGiamGia: any[] = [];
  GetSanPhamGiamGia() {
    this.homeService.GetSanPhamGiamGia().subscribe((data) => {
      this.sanPhamGiamGia = data;
    });
  }

  newpaper: any;
  GetTinTuc() {
    this.homeService.GetTinTuc().subscribe((data) => {
      this.newpaper = data;
    });
  }

  SlideOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  responsiveOptions: any[] | undefined;
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
