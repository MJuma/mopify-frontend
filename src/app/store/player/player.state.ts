import { PlaybackState, Track } from '../../shared/types/mopidy';

export interface PlayerState {
    currentTrack: Track | undefined;
    timePosition: number;
    playbackState: PlaybackState;
}
