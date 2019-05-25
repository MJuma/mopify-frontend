import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { PlaybackState } from '../../shared/types/mopidy';
import * as TracklistActions from '../tracklist/tracklist.actions';
import * as PlayerActions from '../player/player.actions';
import * as MopidyEventActions from './mopidy-event.actions';

@Injectable()
export class MopidyEventEffects {

    @Effect()
    readonly stateOnline$ = this.actions.pipe(
        ofType('[Mopidy Event] State: Online'),
        mergeMap(() => [
            new TracklistActions.GetTlTracks(),
            new TracklistActions.Index({}),
            new TracklistActions.GetConsume(),
            new TracklistActions.GetRandom(),
            new TracklistActions.GetRepeat(),
            new TracklistActions.GetSingle(),
            new PlayerActions.GetCurrentTrack(),
            new PlayerActions.GetTimePosition(),
            new PlayerActions.GetPlaybackState(),
        ]),
    );

    // @Effect()
    // readonly stateOffline$ = this.actions.pipe();

    // @Effect()
    // readonly muteChanged$ = this.actions.pipe();

    @Effect()
    readonly optionsChanged$ = this.actions.pipe(
        ofType('[Mopidy Event] Event: Options Changed'),
        mergeMap(() => [
            new TracklistActions.GetConsume(),
            new TracklistActions.GetRandom(),
            new TracklistActions.GetRepeat(),
            new TracklistActions.GetSingle(),
        ]),
    );

    @Effect()
    readonly playbackStateChanged$ = this.actions.pipe(
        ofType('[Mopidy Event] Event: Playback State Changed'),
        map(({ payload }: MopidyEventActions.PlaybackStateChanged) => payload.new_state),
        mergeMap((playbackState: PlaybackState) => [
            new TracklistActions.Index({}),
            new PlayerActions.GetPlaybackStateSuccess(playbackState),
        ]),
    );

    // @Effect()
    // readonly playlistChanged$ = this.actions.pipe();

    // @Effect()
    // readonly playlistDeleted$ = this.actions.pipe();

    // @Effect()
    // readonly playlistLoaded$ = this.actions.pipe();

    // @Effect()
    // readonly seeked$ = this.actions.pipe();

    // @Effect()
    // readonly streamTitleChanged$ = this.actions.pipe();

    // @Effect()
    // readonly trackPlaybackEnded$ = this.actions.pipe();

    // @Effect()
    // readonly trackPlaybackPaused$ = this.actions.pipe();

    // @Effect()
    // readonly trackPlaybackResume$ = this.actions.pipe();

    // @Effect()
    // readonly trackPlaybackStarted$ = this.actions.pipe();

    @Effect()
    readonly tracklistChanged$ = this.actions.pipe(
        ofType('[Mopidy Event] Event: Tracklist Changed'),
        mergeMap(() => [
            new TracklistActions.GetTlTracks(),
            new TracklistActions.Index({}),
        ]),
    );

    // @Effect()
    // readonly volumeChanged$ = this.actions.pipe();

    constructor(private actions: Actions) {
    }
}
