import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Layout/layout/layout.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'chitiet/:id',
        loadChildren: () =>
          import('./Pages/chi-tiet-san-pham/chi-tiet-san-pham.module').then(
            (m) => m.ChiTietSanPhamModule
          ),
      },
      {
        path: 'danhmuc/:id',
        loadChildren: () =>
          import('./Pages/danh-muc-san-pham/danh-muc-san-pham.module').then(
            (m) => m.DanhMucSanPhamModule
          ),
      },
      {
        path: 'tintuc',
        loadChildren: () =>
          import('./Pages/tin-tuc/tin-tuc.module').then((m) => m.TinTucModule),
      },
      {
        path: 'blogDetail/:id',
        loadChildren: () =>
          import('./Pages/chi-tiet-tin-tuc/chi-tiet-tin-tuc.module').then(
            (m) => m.ChiTietTinTucModule
          ),
      },
      {
        path: 'lienhe',
        loadChildren: () =>
          import('./Pages/lien-he/lien-he.module').then((m) => m.LienHeModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./Pages/account/account.module').then((m) => m.AccountModule),
      },
      {
        path: 'search/:searchTerm',
        loadChildren: () =>
          import('./Pages/search/search.module').then((m) => m.SearchModule),
      },
      {
        path: 'giohang',
        loadChildren: () =>
          import('./Pages/gio-hang/gio-hang.module').then(
            (m) => m.GioHangModule
          ),
        canActivate: [AuthGuard],
      },

      {
        path: 'checkout',
        loadChildren: () =>
          import('./Pages/thanh-toan/thanh-toan.module').then(
            (m) => m.ThanhToanModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'success',
        loadChildren: () =>
          import('./Pages/success/success.module').then((m) => m.SuccessModule),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
