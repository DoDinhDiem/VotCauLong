import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NhanVienComponent } from './nhan-vien.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: NhanVienComponent }]),
  ],
  exports: [RouterModule],
})
export class NhanVienModule {}
