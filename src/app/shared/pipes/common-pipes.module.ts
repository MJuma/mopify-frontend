import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongLengthPipe } from './song-length.pipe';

@NgModule({
    declarations: [
        SongLengthPipe,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SongLengthPipe,
    ],
})
export class CommonPipesModule {
}
