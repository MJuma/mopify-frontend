import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { MopidyService } from '../../shared/services/mopidy/mopidy.service';
import { TlTrack } from '../../shared/types/mopidy';
import * as TracklistActions from '../actions/tracklist.actions';
import { TracklistActionTypes} from '../actions/tracklist.actions';
import { MopidyEventActionTypes } from '../actions/mopidy-event.actions';

@Injectable()
export class TracklistEffects {

    @Effect()
    readonly afterConnect$ = this.actions.pipe(
        ofType('[Mopidy Event] State: Online'),
        tap(() => console.error('aasdf')),
        map(() => new TracklistActions.GetTlTracks()),
    );

    @Effect()
    readonly getTlTracks$ = this.actions.pipe(
        ofType(TracklistActionTypes.GET_TL_TRACKS),
        switchMap(() => this.mopidy.tracklistGetTlTracks()),
        map((tlTracks: TlTrack[]) => new TracklistActions.GetTlTracksSuccess(tlTracks)),
    );

    constructor(private actions: Actions,
                private mopidy: MopidyService) {
    }
}
