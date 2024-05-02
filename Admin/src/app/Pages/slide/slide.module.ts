import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SlideComponent } from './slide.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: SlideComponent }])],
  exports: [RouterModule],
})
export class SlideModule {}
