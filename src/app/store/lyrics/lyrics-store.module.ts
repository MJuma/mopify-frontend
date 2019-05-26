import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LyricsEffects } from './lyrics.effects';
import { initialLyricsState, lyricsReducer } from './lyrics.reducer';

@NgModule({
    imports: [
        EffectsModule.forFeature([
            LyricsEffects,
        ]),
        StoreModule.forFeature('lyrics', lyricsReducer, { initialState: initialLyricsState }),
    ],
})
export class LyricsStoreModule {
}
