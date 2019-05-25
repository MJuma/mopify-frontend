import { Ref, Track } from '../../../../../../shared/types/mopidy';

export interface LocalState {
    directories: Ref[];
    tracks: Track[];
    artists: Ref[];
    albums: Ref[];
}
