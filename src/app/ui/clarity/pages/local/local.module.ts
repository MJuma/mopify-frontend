import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseModule } from './browse/browse.module';
import { LocalRoutingModule } from './local-routing.module';
import { SongsModule } from './songs/songs.module';

@NgModule({
    declarations: [],
    imports: [
        BrowseModule,
        CommonModule,
        LocalRoutingModule,
        SongsModule,
    ]
})
export class LocalModule {
}
