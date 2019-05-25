import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { StoreModule } from '@ngrx/store';
import { ClarityUiRoutingModule } from './clarity-ui-routing.module';
import { ClarityUiComponent } from './clarity-ui.component';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { HeaderModule } from './shared/header/header.module';
import { MusicNavModule } from './shared/music-nav/music-nav.module';
import { PlayerModule } from './shared/player/player.module';
import { SideNavModule } from './shared/side-nav/side-nav.module';
import { clarityUiFeatureName } from './store';
import { clarityUiReducer, initialClarityUiState } from './store/reducers/clarity-ui.reducer';

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
        StoreModule.forFeature(clarityUiFeatureName, clarityUiReducer, { initialState: initialClarityUiState }),
    ]
})
export class ClarityUiModule {
}
