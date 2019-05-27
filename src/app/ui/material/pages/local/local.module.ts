import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalRoutingModule } from './local-routing.module';
import { SongsModule } from './songs/songs.module';

@NgModule({
    imports: [
        CommonModule,
        LocalRoutingModule,
        SongsModule,
    ]
})
export class LocalModule {
}
