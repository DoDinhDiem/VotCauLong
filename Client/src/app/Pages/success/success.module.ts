import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SuccessComponent } from './success.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: SuccessComponent }])],
  exports: [RouterModule],
})
export class SuccessModule {}
