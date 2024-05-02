import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Layouts/layout/layout.component';
import { LoginComponent } from './Pages/login/login.component';
import { AuthGuard } from './Guards/Auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Pages/dash-board/dash-board.module').then(
            (m) => m.DashBoardModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'loaisp',
        loadChildren: () =>
          import('./Pages/loai-san-pham/loai-san-pham.module').then(
            (m) => m.LoaiSanPhamModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'thuonghieu',
        loadChildren: () =>
          import('./Pages/thuong-hieu/thuong-hieu.module').then(
            (m) => m.ThuongHieuModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'sanpham',
        loadChildren: () =>
          import('./Pages/san-pham/san-pham.module').then(
            (m) => m.SanPhamModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'tintuc',
        loadChildren: () =>
          import('./Pages/tin-tuc/tin-tuc.module').then((m) => m.TinTucModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'nhacc',
        loadChildren: () =>
          import('./Pages/nha-cung-cap/nha-cung-cap.module').then(
            (m) => m.NhaCungCapModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'hoadonnhap',
        loadChildren: () =>
          import('./Pages/hoa-don-nhap/hoa-don-nhap.module').then(
            (m) => m.HoaDonNhapModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'hoadonban',
        loadChildren: () =>
          import('./Pages/hoa-don-ban/hoa-don-ban.module').then(
            (m) => m.HoaDonBanModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'nhanvien',
        loadChildren: () =>
          import('./Pages/nhan-vien/nhan-vien.module').then(
            (m) => m.NhanVienModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'khachhang',
        loadChildren: () =>
          import('./Pages/khach-hang/khach-hang.module').then(
            (m) => m.KhachHangModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'slide',
        loadChildren: () =>
          import('./Pages/slide/slide.module').then((m) => m.SlideModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'lienhe',
        loadChildren: () =>
          import('./Pages/lien-he/lien-he.module').then((m) => m.LienHeModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'quyen',
        loadChildren: () =>
          import('./Pages/quyen/quyen.module').then((m) => m.QuyenModule),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
