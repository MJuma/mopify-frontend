import { TlTrack, Track } from '../../shared/types/mopidy';

export interface TracklistState {
    tlTracks: TlTrack[];
    index: number | undefined;
    version: number;
    length: number;
    tracks: Track[];
    consumeMode: boolean;
    randomMode: boolean;
    repeatMode: boolean;
    singleMode: boolean;
}

export enum ShuffleState {
    ON,
    OFF,
}

export enum RepeatState {
    OFF,
    SINGLE,
    ALL,
}
