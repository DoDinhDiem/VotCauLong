import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HoaDonBanComponent } from './hoa-don-ban.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: HoaDonBanComponent }]),
  ],
  exports: [RouterModule],
})
export class HoaDonBanModule {}
