import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MixerEffects } from './mixer.effects';
import { initialMixerState, mixerReducer } from './mixer.reducer';

@NgModule({
    imports: [
        EffectsModule.forFeature([
            MixerEffects,
        ]),
        StoreModule.forFeature('mixer', mixerReducer, { initialState: initialMixerState }),
    ],
})
export class MixerStoreModule {
}
