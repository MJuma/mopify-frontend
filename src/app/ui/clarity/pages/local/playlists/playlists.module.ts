import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { PlaylistsComponent } from './playlists.component';

@NgModule({
    declarations: [
        PlaylistsComponent,
    ],
    imports: [
        ClarityModule,
        CommonModule,
    ]
})
export class PlaylistsModule {
}
