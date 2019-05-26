export interface LyricsState {
    lyrics: LyricsCache;
}

export interface LyricsCache {
    [trackUri: string]: string;
}
