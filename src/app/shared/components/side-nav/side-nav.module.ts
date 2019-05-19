import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { SideNavComponent } from './side-nav.component';

@NgModule({
    declarations: [
        SideNavComponent,
    ],
    exports: [
        SideNavComponent,
    ],
    imports: [
        ClarityModule,
        CommonModule,
        RouterModule,
    ]
})
export class SideNavModule {
}
