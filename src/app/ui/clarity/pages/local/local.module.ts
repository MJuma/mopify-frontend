import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseModule } from './browse/browse.module';
import { LocalRoutingModule } from './local-routing.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { SongsModule } from './songs/songs.module';

@NgModule({
    declarations: [],
    imports: [
        BrowseModule,
        CommonModule,
        LocalRoutingModule,
        PlaylistsModule,
        SongsModule,
    ]
})
export class LocalModule {
}
