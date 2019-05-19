import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [
        HeaderComponent,
    ],
    exports: [
        HeaderComponent,
    ],
    imports: [
        ClarityModule,
        CommonModule,
    ]
})
export class HeaderModule {
}
