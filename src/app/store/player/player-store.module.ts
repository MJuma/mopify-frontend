import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { PlayerEffects } from './player.effects';

@NgModule({
    imports: [
        EffectsModule.forFeature([
            PlayerEffects,
        ]),
    ],
})
export class PlayerStoreModule {
}
