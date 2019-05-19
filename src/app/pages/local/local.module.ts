import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LocalRoutingModule } from './local-routing.module';
import { SongsModule } from './songs/songs.module';
import { localRootFeatureName } from './store';
import { LocalEffects } from './store/effects/local.effects';
import { initialLocalRootState, localRootReducer } from './store/reducers/local-root.reducer';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        EffectsModule.forFeature([LocalEffects]),
        LocalRoutingModule,
        SongsModule,
        StoreModule.forFeature(localRootFeatureName, localRootReducer, { initialState: initialLocalRootState }),
    ]
})
export class LocalModule {
}
