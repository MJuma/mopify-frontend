import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { MusicNavComponent } from './music-nav.component';

@NgModule({
    declarations: [
        MusicNavComponent,
    ],
    exports: [
        MusicNavComponent
    ],
    imports: [
        ClarityModule,
        CommonModule,
    ]
})
export class MusicNavModule {
}
