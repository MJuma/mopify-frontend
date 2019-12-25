import { Ref, SearchResult, Track } from '../../shared/types/mopidy';

export interface LibraryState {
    localDirectoryUri: string;
    spotifyWebDirectoryUri: string;
    localAlbumArtistsDirectoryUri: string;
    rootDirectories: Ref[];
    childDirectories: Ref[];
    songs: SongsState;
    currentDirectoryUri: string;
    previousDirectoryUris: string[];
    images: ImageUris;
    searchResults: SearchResult | undefined;
}

export interface ImageUris {
    [uri: string]: string;
}

export interface SongsState {
    artists: Ref[];
    albums: Ref[];
    tracks: Track[];
}
