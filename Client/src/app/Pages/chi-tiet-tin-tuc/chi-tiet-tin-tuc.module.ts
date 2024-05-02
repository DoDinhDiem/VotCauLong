import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChiTietTinTucComponent } from './chi-tiet-tin-tuc.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ChiTietTinTucComponent }]),
  ],
  exports: [RouterModule],
})
export class ChiTietTinTucModule {}
