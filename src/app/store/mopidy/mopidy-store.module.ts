import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MopidyEffects } from './mopidy.effects';
import { initialMopidyState, mopidyReducer } from './mopidy.reducer';

@NgModule({
    imports: [
        EffectsModule.forFeature([
            MopidyEffects,
        ]),
        StoreModule.forFeature('mopidy', mopidyReducer, { initialState: initialMopidyState }),
    ],
})
export class MopidyStoreModule {
}
