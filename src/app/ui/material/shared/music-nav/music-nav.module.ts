import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { MusicNavComponent } from './music-nav.component';

@NgModule({
    declarations: [
        MusicNavComponent,
    ],
    exports: [
        MusicNavComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
    ]
})
export class MusicNavModule {
}
