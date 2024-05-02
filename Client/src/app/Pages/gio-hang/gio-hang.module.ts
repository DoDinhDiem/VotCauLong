import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GioHangComponent } from './gio-hang.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: GioHangComponent }])],
  exports: [RouterModule],
})
export class GioHangModule {}
