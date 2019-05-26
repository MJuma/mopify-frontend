import { Ref, Track } from '../../shared/types/mopidy';

export interface LibraryState {
    localDirectoryUri: string;
    spotifyWebDirectoryUri: string;
    rootDirectories: Ref[];
    childDirectories: Ref[];
    songs: SongsState;
    currentDirectoryUri: string;
    previousDirectoryUris: string[];
    images: ImageUris;
}

export interface ImageUris {
    [uri: string]: string;
}

export interface SongsState {
    artists: Ref[];
    albums: Ref[];
    tracks: Track[];
}
