import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongLengthPipe } from './song-length.pipe';
import { SentenceCasePipe } from './sentence-case.pipe';
import { RootUriPipe } from './root-uri.pipe';

@NgModule({
    declarations: [
        RootUriPipe,
        SentenceCasePipe,
        SongLengthPipe,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        RootUriPipe,
        SentenceCasePipe,
        SongLengthPipe,
    ],
})
export class CommonPipesModule {
}
