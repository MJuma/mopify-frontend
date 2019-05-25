import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PlayerEffects } from './player.effects';
import { initialPlayerState, playerReducer } from './player.reducer';

@NgModule({
    imports: [
        EffectsModule.forFeature([
            PlayerEffects,
        ]),
        StoreModule.forFeature('player', playerReducer, { initialState: initialPlayerState }),
    ],
})
export class PlayerStoreModule {
}
