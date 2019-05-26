import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ref, Types } from '../../../../../shared/types/mopidy';
import { ApplicationState } from '../../../../../store/application/application.state';
import * as LibraryActions from '../../../../../store/library/library.actions';
import * as TracklistAction from '../../../../../store/tracklist/tracklist.actions';
import * as fromLibraryReducer from '../../../../../store/library/library.reducer';

@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseComponent implements OnInit {
    public types: typeof Types = Types;

    public currentDirectories$: Observable<Ref[]>;
    public previousDirectoryUris$: Observable<string[]>;

    constructor(private store: Store<ApplicationState>) {
    }

    ngOnInit() {
        this.currentDirectories$ = this.store.select(fromLibraryReducer.selectChildDirectories);
        this.previousDirectoryUris$ = this.store.select(fromLibraryReducer.selectPreviousDirectoryUris);

        this.store.dispatch(new LibraryActions.BrowseLocal());
    }

    public browseDirectory(uri: string): void {
        this.store.dispatch(new LibraryActions.Browse({uri}));
    }

    public browseBack(uri: string): void {
        this.store.dispatch(new LibraryActions.BrowseBack(uri));
    }

    public playTrack(uri: string): void {
        this.store.dispatch(new TracklistAction.QueueNow([uri]));
    }

    public queueAll(trackRefs: Ref[]): void {
        this.store.dispatch(new TracklistAction.QueueNow(trackRefs.map((trackRef: Ref) => trackRef.uri)));
    }
}
