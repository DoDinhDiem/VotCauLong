import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NhaCungCapComponent } from './nha-cung-cap.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: NhaCungCapComponent }]),
  ],
  exports: [RouterModule],
})
export class NhaCungCapModule {}
