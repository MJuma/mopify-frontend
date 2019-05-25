import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { RouterEffects } from './router.effects';

@NgModule({
    imports: [
        EffectsModule.forFeature([
            RouterEffects,
        ]),
        StoreModule.forFeature('router', routerReducer),

    ],
})
export class RouterStoreModule {
}
