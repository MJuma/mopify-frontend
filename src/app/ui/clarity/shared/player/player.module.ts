import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { EffectsModule } from '@ngrx/effects';
import { PlayerEffects } from '../../../../store/player/player.effects';
import { PlayerComponent } from './player.component';

@NgModule({
    declarations: [
        PlayerComponent,
    ],
    imports: [
        ClarityModule,
        CommonModule,
        EffectsModule.forFeature([
            PlayerEffects,
        ]),
    ],
    exports: [
        PlayerComponent
    ]
})
export class PlayerModule {
}
