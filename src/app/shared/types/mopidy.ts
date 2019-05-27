import { EventEmitter } from 'events';

export type Lit = string | number | boolean | undefined | null | void | {};
export const tuple = <T extends Lit[]>(...args: T) => args;

export type Type = 'artist' | 'album' | 'track' | 'playlist' | 'directory';
export enum Types {
    ARTIST = 'artist',
    ALBUM = 'album',
    TRACK = 'track',
    PLAYLIST = 'playlist',
    DIRECTORY = 'directory',
}
export type Field = 'track' | 'artist' | 'albumartist' | 'album' | 'composer' | 'performer' | 'date' | 'genre';

export const SEARCH_FIELDS = tuple(
    'any',
    'track_name',
    'artist',
    'album',
    'albumartist',
    'composer',
    'performer',
    'track_no',
    'genre',
    'date',
    'comment',
    'uri',
);
type SearchFieldTuple = typeof SEARCH_FIELDS;
export type SearchField = SearchFieldTuple[number];
export type PlaybackState = 'stopped' | 'playing' | 'paused';
export enum PlaybackStates {
    STOPPED = 'stopped',
    PLAYING = 'playing',
    PAUSED = 'paused',
}

export interface Ref {
    readonly name: string;
    readonly type: Type;
    readonly uri: string;
}

export interface Track {
    readonly uri: string;
    readonly name: string;
    readonly artists: Artist[];
    readonly album: Album;
    readonly composers: Artist[];
    readonly performers: Artist[];
    readonly genre: string;
    readonly track_no: number | undefined;
    readonly disc_no: number | undefined;
    readonly date: string;
    readonly length: number | undefined;
    readonly bitrate: number;
    readonly comment: string;
    readonly musicbrainz_id: string;
    readonly last_modified: number | undefined;
}

export interface Artist {
    readonly uri: string;
    readonly name: string;
    readonly shortname: string;
    readonly musicbrainz_id: string;
}

export interface Album {
    readonly uri: string;
    readonly name: string;
    readonly artists: Artist[];
    readonly num_tracks: number | undefined;
    readonly num_discs: number | undefined;
    readonly date: string;
    readonly musicbrainz_id: string;
    readonly images: string[];
}

export interface Playlist {
    readonly uri: string;
    readonly name: string;
    readonly tracks: Track[];
    readonly last_modified: number | undefined;
}

export interface Image {
    readonly uri: string;
    readonly height: number;
    readonly width: number;
}

export interface TlTrack {
    readonly tlid: number;
    readonly track: Track;
}

export interface SearchResult {
    readonly uri: string;
    readonly tracks: Track[];
    readonly artists: Artist[];
    readonly albums: Album[];
}

export type SearchQuery = {
    [field in SearchField]?: string[];
};

export interface MopidyTracklistAddParams {
    tracks?: Track[];
    at_position?: number;
    uri?: string;
    uris?: string[];
}

export interface MopidyTracklistMoveParams {
    start: number;
    end: number;
    to_position: number;
}

export interface MopidyTracklistShuffleParams {
    start?: number;
    end?: number;
}

export interface MopidyTracklistIndexParams {
    tl_track?: TlTrack;
    tlid?: number;
}

export interface MopidyTracklistSliceParams {
    start: number;
    end: number;
}

export interface MopidyTracklistFilterParams {
    tlid?: number[];
    uri?: string[];
}

export interface MopidyTracklistGetTrackParams {
    tl_track?: TlTrack;
}

export interface MopidyTracklistOptionsParams {
    value: boolean;
}

export interface MopidyPlaybackPlayParams {
    tl_track?: TlTrack;
    tlid?: number;
}

export interface MopidyPlaybackSeekParams {
    time_position: number;
}

export interface MopidyPlaybackSetStateParams {
    new_state: PlaybackState;
}

export interface MopidyLibraryBrowseRefreshParams {
    uri: string | null;
}

export interface MopidyLibrarySearchParams {
    query: SearchQuery;
    uris?: string[];
    exact?: boolean;
}

export interface MopidyLibraryLookupParams {
    uri?: string;
    uris?: string[];
}

export interface MopidyLibraryGetImagesParams {
    uris: string[];
}

export interface MopidyLibraryGetImagesResponse {
    [uri: string]: Image[];
}

export interface MopidyLibraryGetDistinctParams {
    field: Field;
    query: SearchQuery;
}

export interface MopidyMixerSetMuteParams {
    mute: boolean;
}

export interface MopidyMixerSetVolumeParams {
    volume: number;
}

export interface Tracklist {
    // Manipulating
    add(params: MopidyTracklistAddParams): Promise<TlTrack[]>;
    remove(params: MopidyTracklistFilterParams): Promise<TlTrack[]>;
    clear(): void;
    move(params: MopidyTracklistMoveParams): void;
    shuffle(params: MopidyTracklistShuffleParams): void;

    // Current state
    getTlTracks(): Promise<TlTrack[]>;
    index(params: MopidyTracklistIndexParams): Promise<number>;
    getVersion(): Promise<number>;
    getLength(): Promise<number>;
    getTracks(): Promise<Track[]>;
    slice(params: MopidyTracklistSliceParams): Promise<TlTrack[]>;
    filter(params: MopidyTracklistFilterParams): Promise<TlTrack[]>;

    // Future state
    getEotTlid(): Promise<number | undefined>;
    getNextTlid(): Promise<number | undefined>;
    getPreviousTlid(): Promise<number | undefined>;
    eotTrack(params: MopidyTracklistGetTrackParams): Promise<TlTrack | undefined>;
    nextTrack(params: MopidyTracklistGetTrackParams): Promise<TlTrack | undefined>;
    previousTrack(params: MopidyTracklistGetTrackParams): Promise<TlTrack | undefined>;

    // Options
    getConsume(): Promise<boolean>;
    setConsume(params: MopidyTracklistOptionsParams): void;
    getRandom(): Promise<boolean>;
    setRandom(params: MopidyTracklistOptionsParams): void;
    getRepeat(): Promise<boolean>;
    setRepeat(params: MopidyTracklistOptionsParams): void;
    getSingle(): Promise<boolean>;
    setSingle(params: MopidyTracklistOptionsParams): void;
}

export interface Playback {
    // Playback control
    play(params: MopidyPlaybackPlayParams): void;
    next(): void;
    previous(): void;
    stop(): void;
    pause(): void;
    resume(): void;
    seek(params: MopidyPlaybackSeekParams): Promise<boolean>;

    // Current track
    getCurrentTlTrack(): Promise<TlTrack | undefined>;
    getCurrentTrack(): Promise<Track | undefined>;
    getStreamTitle(): Promise<string | undefined>;
    getTimePosition(): Promise<number | undefined>;

    // Playback states
    getState(): Promise<PlaybackState>;
    setState(params: MopidyPlaybackSetStateParams): void;
}

export interface Library {
    browse(params: MopidyLibraryBrowseRefreshParams): Promise<Ref[]>;
    search(params: MopidyLibrarySearchParams): Promise<SearchResult[]>;
    lookup(params: MopidyLibraryLookupParams): Promise<Track[]>;
    refresh(params: MopidyLibraryBrowseRefreshParams): void;
    getImages(params: MopidyLibraryGetImagesParams): Promise<MopidyLibraryGetImagesResponse>;
    getDistinct(params: MopidyLibraryGetDistinctParams): Promise<SearchResult[]>;
}

export interface Playlists { // TODO FIXME
    getUriSchemes(): void;

    // Fetching
    asList(): void;
    getItems(): void;
    lookup(): void;
    refresh(): void;

    // Manipulating
    create(): void;
    save(): void;
    delete(): void;
}

export interface Mixer {
    getMute(): Promise<boolean | undefined>;
    setMute(params: MopidyMixerSetMuteParams): Promise<boolean>;
    getVolume(): Promise<number | undefined>;
    setVolume(params: MopidyMixerSetVolumeParams): Promise<boolean>;
}

export interface History {
    getHistory(): Promise<[number, Ref][]>;
    getLength(): Promise<number>;
}

export interface IMopidy extends EventEmitter {
    tracklist: Tracklist;
    playback: Playback;
    library: Library;
    mixer: Mixer;
    history: History;

    connect(): void;
    close(): void;
    getUriSchemes(param: {}): Promise<string[]>;
    getVersion(param: {}): Promise<string>;
}
