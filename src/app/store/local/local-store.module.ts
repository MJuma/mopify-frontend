import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LocalEffects } from './local.effects';
import { initialLocalState, localReducer } from './local.reducer';

@NgModule({
    imports: [
        EffectsModule.forFeature([
            LocalEffects,
        ]),
        StoreModule.forFeature('local', localReducer, { initialState: initialLocalState }),
    ],
})
export class LocalStoreModule {
}
