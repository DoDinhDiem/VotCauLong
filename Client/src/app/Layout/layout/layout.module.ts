import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { SliderModule } from 'primeng/slider';

import { HeaderComponent } from '../header/header.component';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from 'src/app/Pages/home/home.component';
import { HomeModule } from 'src/app/Pages/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { ChiTietSanPhamComponent } from 'src/app/Pages/chi-tiet-san-pham/chi-tiet-san-pham.component';
import { ChiTietSanPhamModule } from 'src/app/Pages/chi-tiet-san-pham/chi-tiet-san-pham.module';
import { DanhMucSanPhamComponent } from 'src/app/Pages/danh-muc-san-pham/danh-muc-san-pham.component';
import { DanhMucSanPhamModule } from 'src/app/Pages/danh-muc-san-pham/danh-muc-san-pham.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TinTucComponent } from 'src/app/Pages/tin-tuc/tin-tuc.component';
import { TinTucModule } from 'src/app/Pages/tin-tuc/tin-tuc.module';
import { LienHeComponent } from 'src/app/Pages/lien-he/lien-he.component';
import { LienHeModule } from 'src/app/Pages/lien-he/lien-he.module';
import { ChiTietTinTucComponent } from 'src/app/Pages/chi-tiet-tin-tuc/chi-tiet-tin-tuc.component';
import { ChiTietTinTucModule } from 'src/app/Pages/chi-tiet-tin-tuc/chi-tiet-tin-tuc.module';
import { SafePipe } from 'src/app/Pages/lien-he/safe.pipe';
import { AccountComponent } from 'src/app/Pages/account/account.component';
import { AccountModule } from 'src/app/Pages/account/account.module';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GioHangComponent } from 'src/app/Pages/gio-hang/gio-hang.component';
import { ThanhToanComponent } from 'src/app/Pages/thanh-toan/thanh-toan.component';
import { ThanhToanModule } from 'src/app/Pages/thanh-toan/thanh-toan.module';
import { SuccessComponent } from 'src/app/Pages/success/success.component';
import { SuccessModule } from 'src/app/Pages/success/success.module';
import { SearchComponent } from 'src/app/Pages/search/search.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    FooterComponent,
    HomeComponent,
    ChiTietSanPhamComponent,
    DanhMucSanPhamComponent,
    TinTucComponent,
    LienHeComponent,
    ChiTietTinTucComponent,
    SafePipe,
    AccountComponent,
    GioHangComponent,
    ThanhToanComponent,
    SuccessComponent,
    SearchComponent,
  ],
  imports: [
    HomeModule,
    ChiTietSanPhamModule,
    DanhMucSanPhamModule,
    TinTucModule,
    LienHeModule,
    ChiTietTinTucModule,
    AccountModule,
    ThanhToanModule,
    SuccessModule,

    CommonModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    GalleriaModule,
    CarouselModule,
    SliderModule,
    FormsModule,
    NgxPaginationModule,
    ToastModule,
    BrowserAnimationsModule,
  ],
})
export class LayoutModule {}
