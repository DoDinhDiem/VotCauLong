import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LienHeComponent } from './lien-he.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: LienHeComponent }])],
  exports: [RouterModule],
})
export class LienHeModule {}
