import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LibraryEffects } from './library.effects';
import { initialLibraryState, libraryReducer } from './library.reducer';

@NgModule({
    imports: [
        EffectsModule.forFeature([
            LibraryEffects,
        ]),
        StoreModule.forFeature('library', libraryReducer, { initialState: initialLibraryState }),
    ],
})
export class LibraryStoreModule {
}
