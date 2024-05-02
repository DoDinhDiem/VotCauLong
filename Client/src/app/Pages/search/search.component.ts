import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/Service/cart.service';
import { HeThongService } from 'src/app/Service/he-thong.service';
import { baseUrl } from 'src/app/baseUrl';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [MessageService],
})
export class SearchComponent {
  baseUrl = baseUrl;
  sanphamList: any;
  key: any = '';
  constructor(
    private heThongService: HeThongService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.key = params.get('searchTerm');
      this.loadData();
    });
  }
  totalItem: any;
  loadData() {
    this.heThongService.GetSearchSanPham(this.key).subscribe((data: any) => {
      this.sanphamList = data.items;
      this.totalItem = data.totalItems;
    });
  }

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
