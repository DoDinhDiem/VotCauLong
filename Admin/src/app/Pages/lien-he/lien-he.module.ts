import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LienHeComponent } from './lien-he.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: LienHeComponent }]),
    ],
    exports: [RouterModule],
})
export class LienHeModule {}
