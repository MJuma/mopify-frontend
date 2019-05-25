import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { EffectsModule } from '@ngrx/effects';
import { CommonPipesModule } from '../../../../shared/pipes/common-pipes.module';
import { PlayerEffects } from '../../../../store/player/player.effects';
import { PlayerComponent } from './player.component';
import { SolidHoverDirective } from './directives/solid-hover.directive';

@NgModule({
    declarations: [
        PlayerComponent,
        SolidHoverDirective,
    ],
    imports: [
        ClarityModule,
        CommonModule,
        CommonPipesModule,
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
