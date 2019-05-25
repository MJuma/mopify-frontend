import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClarityUiComponent } from './clarity-ui.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
                path: 'local',
                loadChildren: './pages/local/local.module#LocalModule',
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
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class ClarityUiRoutingModule {
}
