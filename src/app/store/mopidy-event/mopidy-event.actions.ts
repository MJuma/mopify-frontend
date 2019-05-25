import { Action } from '@ngrx/store';
import { PlaybackState, Playlist, TlTrack } from '../../shared/types/mopidy';

export enum MopidyEventActionTypes {
    STATE_ONLINE = '[Mopidy Event] State: Online',
    STATE_OFFLINE = '[Mopidy Event] State: Offline',
    MUTE_CHANGED = '[Mopidy Event] Event: Mute Changed',
    OPTIONS_CHANGED = '[Mopidy Event] Event: Options Changed',
    PLAYBACK_STATE_CHANGED = '[Mopidy Event] Event: Playback State Changed',
    PLAYLIST_CHANGED = '[Mopidy Event] Event: Playlist Changed',
    PLAYLIST_DELETED = '[Mopidy Event] Event: Playlist Deleted',
    PLAYLIST_LOADED = '[Mopidy Event] Event: Playlist Loaded',
    SEEKED = '[Mopidy Event] Event: Seeked',
    STREAM_TITLE_CHANGED = '[Mopidy Event] Event: Stream Title Changed',
    TRACK_PLAYBACK_ENDED = '[Mopidy Event] Event: Track Playback Ended',
    TRACK_PLAYBACK_PAUSED = '[Mopidy Event] Event: [Mopidy Event] Event: Track Playback Paused',
    TRACK_PLAYBACK_RESUMED = '[Mopidy Event] Event: Track Playback Resumed',
    TRACK_PLAYBACK_STARTED = '[Mopidy Event] Event: Track Playback Started',
    TRACKLIST_CHANGED = '[Mopidy Event] Event: Tracklist Changed',
    VOLUME_CHANGED = '[Mopidy Event] Event: Volume Changed',
}

export const STATE_ONLINE = '[Mopidy Event] State: Online';

export class StateOnline implements Action {
    readonly type = MopidyEventActionTypes.STATE_ONLINE;
}

export class StateOffline implements Action {
    readonly type = MopidyEventActionTypes.STATE_OFFLINE;
}

export class MuteChanged implements Action {
    readonly type = MopidyEventActionTypes.MUTE_CHANGED;

    constructor(public payload: {mute: boolean}) {}
}

export class OptionsChanged implements Action {
    readonly type = MopidyEventActionTypes.OPTIONS_CHANGED;

    constructor(public payload: {}) {}
}

export class PlaybackStateChanged implements Action {
    readonly type = MopidyEventActionTypes.PLAYBACK_STATE_CHANGED;

    constructor(public payload: {old_state: PlaybackState, new_state: PlaybackState}) {}
}

export class PlaylistChanged implements Action {
    readonly type = MopidyEventActionTypes.PLAYLIST_CHANGED;

    constructor(public payload: {playlist: Playlist}) {}
}

export class PlaylistDeleted implements Action {
    readonly type = MopidyEventActionTypes.PLAYLIST_DELETED;

    constructor(public payload: {uri: string}) {}
}

export class PlaylistLoaded implements Action {
    readonly type = MopidyEventActionTypes.PLAYLIST_LOADED;
}

export class Seeked implements Action {
    readonly type = MopidyEventActionTypes.SEEKED;

    constructor(public playload: {time_position: number}) {}
}

export class StreamTitleChanged implements Action {
    readonly type = MopidyEventActionTypes.STREAM_TITLE_CHANGED;

    constructor(public payload: {title: string}) {}
}

export class TrackPlaybackEnded implements Action {
    readonly type = MopidyEventActionTypes.TRACK_PLAYBACK_ENDED;

    constructor(public payload: {tl_track: TlTrack, time_position: number}) {}
}

export class TrackPlaybackPaused implements Action {
    readonly type = MopidyEventActionTypes.TRACK_PLAYBACK_PAUSED;

    constructor(public payload: {tl_track: TlTrack, time_position: number}) {}
}

export class TrackPlaybackResumed implements Action {
    readonly type = MopidyEventActionTypes.TRACK_PLAYBACK_RESUMED;

    constructor(public payload: {tl_track: TlTrack, time_position: number}) {}
}

export class TrackPlaybackStarted implements Action {
    readonly type = MopidyEventActionTypes.TRACK_PLAYBACK_STARTED;

    constructor(public payload: {tl_track: TlTrack}) {}
}

export class TracklistChanged implements Action {
    readonly type = MopidyEventActionTypes.TRACKLIST_CHANGED;
}

export class VolumeChanged implements Action {
    readonly type = MopidyEventActionTypes.VOLUME_CHANGED;

    constructor(public payload: {volume: number}) {}
}

export type MopidyEventActionsUnion =
    StateOnline
    | StateOffline
    | MuteChanged
    | OptionsChanged
    | PlaybackStateChanged
    | PlaylistChanged
    | PlaylistDeleted
    | PlaylistLoaded
    | Seeked
    | StreamTitleChanged
    | TrackPlaybackEnded
    | TrackPlaybackPaused
    | TrackPlaybackResumed
    | TrackPlaybackStarted
    | TracklistChanged
    | VolumeChanged;
