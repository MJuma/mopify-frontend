import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { PlaylistsComponent } from './playlists/playlists.component';
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
    {
        path: 'playlists',
        component: PlaylistsComponent,
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
