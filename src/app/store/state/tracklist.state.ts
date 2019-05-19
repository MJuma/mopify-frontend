import { TlTrack, Track } from '../../shared/types/mopidy';

export interface TracklistState {
    version: number;
    length: number;
    tracks: Track[];
    tlTracks: TlTrack[];
}
