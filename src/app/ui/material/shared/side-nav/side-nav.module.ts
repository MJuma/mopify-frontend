import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';

@NgModule({
    declarations: [
        SideNavComponent,
        NavItemComponent,
    ],
    exports: [
        SideNavComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        RouterModule,
    ],
})
export class SideNavModule {
}
