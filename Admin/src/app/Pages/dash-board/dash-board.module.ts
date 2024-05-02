import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashBoardComponent } from './dash-board.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: DashBoardComponent }]),
  ],
  exports: [RouterModule],
})
export class DashBoardModule {}
