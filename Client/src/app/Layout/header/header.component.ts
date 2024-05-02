import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Service/cart.service';
import { HeThongService } from 'src/app/Service/he-thong.service';
import { baseUrl } from 'src/app/baseUrl';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  baseUrl = baseUrl;
  searchTerm = '';

  isActive: boolean = false;

  cartItems: any[] = [];
  quantity = 0;
  totalPrice: number = 0;

  constructor(
    private heThongService: HeThongService,
    private cartService: CartService,
    activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params: any) => {
      if (params.serchTerm) {
        this.searchTerm = params.searchTerm;
      }
    });
    // this.isLoggedIn = this.accountService.isLoggedIn();
  }

  ngOnInit() {
    this.GetLoaiSanPham();
    this.cartService.loadCart();
    this.cartService.products$.subscribe((products) => {
      this.getQuantity();
      this.calculateTotalPrice();
      this.updateCart(products);
    });
    this.cartItems = this.cartService.getCartItem();
  }

  loaiSanPham: any[] = [];
  GetLoaiSanPham() {
    this.heThongService.GetLoaiSanPham().subscribe((data) => {
      this.loaiSanPham = data;
    });
  }

  search(term: string): void {
    if (term) this.router.navigateByUrl('/search/' + term);
  }

  getQuantity() {
    this.quantity = this.cartService.getQuantity();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  removeFromCart(product: any) {
    this.cartService.removeProduct(product);
    this.cartItems = this.cartService.getCartItem();
    this.getQuantity();
    this.calculateTotalPrice();
  }

  updateCart(cartItems: any[]) {
    this.cartItems = cartItems;
    this.getQuantity();
    this.calculateTotalPrice();
  }
}
