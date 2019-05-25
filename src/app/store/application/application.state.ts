import { LocalState } from '../local/local.state';
import { MopidyState } from '../mopidy/mopidy.state';
import { TracklistState } from '../tracklist/tracklist.state';

export interface ApplicationState {
    local?: LocalState;
    mopidy?: MopidyState;
    tracklist?: TracklistState;
}
