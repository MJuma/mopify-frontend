import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TracklistEffects } from './tracklist.effects';
import { initialTracklistState, tracklistReducer } from './tracklist.reducer';

@NgModule({
    imports: [
        EffectsModule.forFeature([
            TracklistEffects,
        ]),
        StoreModule.forFeature('tracklist', tracklistReducer, { initialState: initialTracklistState }),

    ],
})
export class TracklistStoreModule {
}
