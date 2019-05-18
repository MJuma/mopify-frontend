import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
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
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule {
}
