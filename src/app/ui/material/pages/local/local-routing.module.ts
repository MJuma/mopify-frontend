import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongsComponent } from './songs/songs.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'songs',
        pathMatch: 'full'
    },
    {
        path: 'songs',
        component: SongsComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class LocalRoutingModule {
}
