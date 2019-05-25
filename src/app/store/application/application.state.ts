import { MopidyState } from '../mopidy/mopidy.state';
import { TracklistState } from '../tracklist/tracklist.state';

export interface ApplicationState {
    mopidy?: MopidyState;
    tracklist?: TracklistState;
}
