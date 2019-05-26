import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
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
    {
        path: 'browse',
        component: BrowseComponent,
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
