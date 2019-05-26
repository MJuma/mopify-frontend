import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MusixMatchLyricsService {
    private hostname = '/lyrics/'; // 'https://api.musixmatch.com/ws/1.1/';
    private searchEndpoint = 'track.search';
    private lyricsEndpoint = 'track.lyrics.get';

    constructor(private http: HttpClient) {
    }

    public search(title: string, artist: string): Observable<MusixMatchResponse<TrackList>> {
        const params: HttpParams = new HttpParams()
            .set('q_track', title)
            .set('q_artist', artist)
            .set('s_track_rating', 'desc')
            .set('apikey', environment.lyrics.musixmatch.apiKey);
        return this.http.get<MusixMatchResponse<TrackList>>(`${this.hostname}${this.searchEndpoint}`, {params});
    }

    public getLyrics(trackId: number): Observable<MusixMatchResponse<Lyrics>> {
        const params: HttpParams = new HttpParams()
            .set('track_id', String(trackId))
            .set('apikey', environment.lyrics.musixmatch.apiKey);
        return this.http.get<MusixMatchResponse<Lyrics>>(`${this.hostname}${this.lyricsEndpoint}`, {params});
    }
}

export interface MusixMatchResponse<T> {
    message: {
        header: {
            status_code: number;
            execute_time: number;
            available: number;
        };
        body: T;
    };
}

export interface TrackList {
    track_list: {
        track: {
            album_id: number;
            album_name: string;
            artist_id: number;
            artist_name: string;
            commontrack_id: number;
            explicit: number;
            has_lyrics: number;
            has_richsync: 0;
            has_subtitles: 1;
            instrumental: 0;
            num_favourite: number;
            primary_genres: [];
            restricted: number;
            track_edit_url: string;
            track_id: number;
            track_name: string;
            track_name_translation_list: [];
            track_rating: number;
            track_share_url: string;
            updated_time: Date;
        }
    }[];
}

export interface Lyrics {
    lyrics: {
        lyrics_id: number;
        restricted: number;
        instrumental: number;
        lyrics_body: string;
        lyrics_language: string;
        script_tracking_url: string;
        pixel_tracking_url: string;
        lyrics_copyright: string;
        backlink_url: string;
        updated_time: Date;
    };
}
