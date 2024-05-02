import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChiTietSanPhamComponent } from './chi-tiet-san-pham.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ChiTietSanPhamComponent }]),
  ],
  exports: [RouterModule],
})
export class ChiTietSanPhamModule {}
