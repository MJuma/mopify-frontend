import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalRoutingModule } from './local-routing.module';
import { SongsModule } from './songs/songs.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        LocalRoutingModule,
        SongsModule,
    ]
})
export class LocalModule {
}
