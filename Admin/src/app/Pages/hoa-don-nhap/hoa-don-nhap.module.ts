import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HoaDonNhapComponent } from './hoa-don-nhap.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: HoaDonNhapComponent }]),
  ],
  exports: [RouterModule],
})
export class HoaDonNhapModule {}
