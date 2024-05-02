import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThuongHieuComponent } from './thuong-hieu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ThuongHieuComponent }]),
  ],
  exports: [RouterModule],
})
export class ThuongHieuModule {}
