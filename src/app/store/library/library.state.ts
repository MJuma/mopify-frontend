import { Ref } from '../../shared/types/mopidy';

export interface LibraryState {
    localDirectoryUri: string;
    spotifyWebDirectoryUri: string;
    rootDirectories: Ref[];
    childDirectories: Ref[];
    currentDirectoryUri: string;
    previousDirectoryUris: string[];
}
