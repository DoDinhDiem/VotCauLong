import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SanPhamComponent } from './san-pham.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: SanPhamComponent }])],
  exports: [RouterModule],
})
export class SanPhamModule {}
