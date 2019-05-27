import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialRoutingModule } from './material-routing.module';
import { MaterialComponent } from './material.component';
import { HeaderModule } from './shared/header/header.module';
import { MusicNavModule } from './shared/music-nav/music-nav.module';
import { PlayerModule } from './shared/player/player.module';
import { SideNavModule } from './shared/side-nav/side-nav.module';

@NgModule({
    declarations: [
        MaterialComponent,
    ],
    imports: [
        CommonModule,
        HeaderModule,
        MusicNavModule,
        PlayerModule,
        SideNavModule,
        MaterialRoutingModule,
    ],
})
export class MaterialModule {
}
