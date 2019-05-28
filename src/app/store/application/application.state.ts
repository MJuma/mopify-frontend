import { MaterialState } from '../../ui/material/store/material/material.state';
import { LibraryState } from '../library/library.state';
import { LyricsState } from '../lyrics/lyrics.state';
import { MixerState } from '../mixer/mixer.state';
import { MopidyState } from '../mopidy/mopidy.state';
import { PlayerState } from '../player/player.state';
import { TracklistState } from '../tracklist/tracklist.state';

export interface ApplicationState {
    library?: LibraryState;
    lyrics?: LyricsState;
    material?: MaterialState;
    mixer?: MixerState;
    mopidy?: MopidyState;
    player?: PlayerState;
    tracklist?: TracklistState;
}
