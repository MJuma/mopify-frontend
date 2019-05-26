import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { PlaybackState, TlTrack } from '../../shared/types/mopidy';
import * as TracklistActions from '../tracklist/tracklist.actions';
import * as PlayerActions from '../player/player.actions';
import * as MopidyEventActions from './mopidy-event.actions';
import * as MixerActions from '../mixer/mixer.actions';

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

    @Effect({ dispatch: false })
    readonly stateOffline$ = this.actions.pipe(
        ofType('[Mopidy Event] State: Offline'),
    );

    @Effect()
    readonly muteChanged$ = this.actions.pipe(
        ofType('[Mopidy Event] Event: Mute Changed'),
        map(({ payload }: MopidyEventActions.MuteChanged) => payload.mute),
        mergeMap((mute: boolean) => [
            new MixerActions.SetMuteSuccess(mute),
        ]),
    );

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

    @Effect({ dispatch: false })
    readonly playlistChanged$ = this.actions.pipe(
        ofType('[Mopidy Event] Event: Playback State Changed'),
        map(({ payload }: MopidyEventActions.PlaylistChanged) => payload),
    );

    @Effect({ dispatch: false })
    readonly playlistDeleted$ = this.actions.pipe(
        ofType('[Mopidy Event] Event: Playlist Deleted'),
        map(({ payload }: MopidyEventActions.PlaylistDeleted) => payload),
    );

    @Effect({ dispatch: false })
    readonly playlistLoaded$ = this.actions.pipe(
        ofType('[Mopidy Event] Event: Playlist Loaded'),
    );

    @Effect()
    readonly seeked$ = this.actions.pipe(
        ofType('[Mopidy Event] Event: Seeked'),
        map(({ payload }: MopidyEventActions.Seeked) => payload.time_position),
        mergeMap((timePosition: number) => [
            new PlayerActions.GetTimePositionSuccess(timePosition),
        ]),
    );

    @Effect()
    readonly streamTitleChanged$ = this.actions.pipe(
        ofType('[Mopidy Event] Event: Stream Title Changed'),
        map(({ payload }: MopidyEventActions.StreamTitleChanged) => payload.title),
        mergeMap((streamTitle: string) => [
            new PlayerActions.GetStreamTitleSuccess(streamTitle),
        ]),
    );

    @Effect({ dispatch: false })
    readonly trackPlaybackEnded$ = this.actions.pipe(
        ofType('[Mopidy Event] Event: Track Playback Ended'),
        map(({ payload }: MopidyEventActions.TrackPlaybackEnded) => payload),
    );

    @Effect({ dispatch: false })
    readonly trackPlaybackPaused$ = this.actions.pipe(
        ofType('[Mopidy Event] Event: [Mopidy Event] Event: Track Playback Paused'),
        map(({ payload }: MopidyEventActions.TrackPlaybackPaused) => payload),
    );

    @Effect({ dispatch: false })
    readonly trackPlaybackResume$ = this.actions.pipe(
        ofType('[Mopidy Event] Event: Track Playback Resumed'),
        map(({ payload }: MopidyEventActions.TrackPlaybackResumed) => payload),
    );

    @Effect()
    readonly trackPlaybackStarted$ = this.actions.pipe(
        ofType('[Mopidy Event] Event: Track Playback Started'),
        map(({ payload }: MopidyEventActions.TrackPlaybackStarted) => payload.tl_track),
        mergeMap((tlTrack: TlTrack) => [
            new PlayerActions.GetCurrentTrackSuccess(tlTrack.track),
        ]),
    );

    @Effect()
    readonly tracklistChanged$ = this.actions.pipe(
        ofType('[Mopidy Event] Event: Tracklist Changed'),
        mergeMap(() => [
            new TracklistActions.GetTlTracks(),
            new TracklistActions.Index({}),
        ]),
    );

    @Effect()
    readonly volumeChanged$ = this.actions.pipe(
        ofType('[Mopidy Event] Event: Volume Changed'),
        map(({ payload }: MopidyEventActions.VolumeChanged) => payload.volume),
        mergeMap((volume: number) => [
            new MixerActions.GetVolumeSuccess(volume),
        ]),
    );

    constructor(private actions: Actions) {
    }
}
