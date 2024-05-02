import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TinTucComponent } from '../tin-tuc/tin-tuc.component';
import { QuyenComponent } from './quyen.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: QuyenComponent }])],
  exports: [RouterModule],
})
export class QuyenModule {}
