import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialRoutingModule } from './material-routing.module';
import { MaterialComponent } from './material.component';
import { HeaderModule } from './shared/header/header.module';
import { MusicNavModule } from './shared/music-nav/music-nav.module';
import { PlayerModule } from './shared/player/player.module';
import { SideNavModule } from './shared/side-nav/side-nav.module';
import { MaterialEffects } from './store/material/material.effects';
import { initialMaterialState, materialReducer } from './store/material/material.reducer';

@NgModule({
    declarations: [
        MaterialComponent,
    ],
    imports: [
        CommonModule,
        EffectsModule.forFeature([
            MaterialEffects,
        ]),
        HeaderModule,
        MaterialRoutingModule,
        MusicNavModule,
        PlayerModule,
        SideNavModule,
        StoreModule.forFeature('material', materialReducer, { initialState: initialMaterialState }),
    ],
})
export class MaterialModule {
}
