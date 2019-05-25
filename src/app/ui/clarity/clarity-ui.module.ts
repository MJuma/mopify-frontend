import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ClarityUiRoutingModule } from './clarity-ui-routing.module';
import { ClarityUiComponent } from './clarity-ui.component';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { HeaderModule } from './shared/header/header.module';
import { MusicNavModule } from './shared/music-nav/music-nav.module';
import { PlayerModule } from './shared/player/player.module';
import { SideNavModule } from './shared/side-nav/side-nav.module';

@NgModule({
    declarations: [
        ClarityUiComponent,
    ],
    imports: [
        ClarityModule,
        ClarityUiRoutingModule,
        CommonModule,
        HeaderModule,
        MusicNavModule,
        NotFoundModule,
        PlayerModule,
        SideNavModule,
    ]
})
export class ClarityUiModule {
}
