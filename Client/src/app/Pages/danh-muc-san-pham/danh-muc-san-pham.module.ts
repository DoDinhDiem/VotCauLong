import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DanhMucSanPhamComponent } from './danh-muc-san-pham.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: DanhMucSanPhamComponent }]),
  ],
  exports: [RouterModule],
})
export class DanhMucSanPhamModule {}
