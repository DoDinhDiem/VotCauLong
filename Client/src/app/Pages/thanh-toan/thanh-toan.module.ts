import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThanhToanComponent } from './thanh-toan.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ThanhToanComponent }]),
  ],
  exports: [RouterModule],
})
export class ThanhToanModule {}
