import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { MopidyEventEffects } from './mopidy-event.effects';

@NgModule({
    imports: [
        EffectsModule.forFeature([
            MopidyEventEffects,
        ]),
    ],
})
export class MopidyEventStoreModule {
}
