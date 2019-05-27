import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClarityUiComponent } from './clarity-ui.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { NowPlayingComponent } from './pages/now-playing/now-playing.component';
import { NowPlayingModule } from './pages/now-playing/now-playing.module';
import { SearchComponent } from './pages/search/search.component';
import { SearchModule } from './pages/search/search.module';

const routes: Routes = [
    {
        path: '',
        component: ClarityUiComponent,
        children: [
            {
                path: 'home',
                loadChildren: './pages/home/home.module#HomeModule',
            },
            {
                path: 'queue',
                component: NowPlayingComponent,
            },
            {
                path: 'local',
                loadChildren: './pages/local/local.module#LocalModule',
            },
            {
                path: 'settings',
                loadChildren: './pages/settings/settings.module#SettingsModule',
            },
            {
                path: 'search',
                component: SearchComponent,
            },
            {
                path: '**',
                component: NotFoundComponent,
            }
        ],
    },
];

@NgModule({
    imports: [
        NotFoundModule,
        NowPlayingModule,
        RouterModule.forChild(routes),
        SearchModule,
    ],
    exports: [
        RouterModule,
    ]
})
export class ClarityUiRoutingModule {
}
