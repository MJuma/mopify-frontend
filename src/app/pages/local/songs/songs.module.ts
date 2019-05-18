import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

import { SongsComponent } from './songs.component';

@NgModule({
    declarations: [
        SongsComponent,
    ],
    imports: [
        ClarityModule,
        CommonModule,
    ]
})
export class SongsModule {
}
