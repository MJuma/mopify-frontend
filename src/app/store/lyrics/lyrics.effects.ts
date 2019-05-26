import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Lyrics, MusixMatchLyricsService, MusixMatchResponse, TrackList } from '../../shared/services/musix-match-lyrics.service';
import { Track } from '../../shared/types/mopidy';
import { LyricsActionTypes } from './lyrics.actions';
import * as LyricsActions from './lyrics.actions';

@Injectable()
export class LyricsEffects {

    @Effect()
    readonly getLyrics$ = this.actions$.pipe(
        ofType(LyricsActionTypes.GET_LYRICS),
        map(({ payload }: LyricsActions.GetLyrics) => payload),
        switchMap((track: Track) => this.musixMatch.search(track.name, track.artists[0].name).pipe(
            map((musixMatchResponse: MusixMatchResponse<TrackList>) => musixMatchResponse.message.body),
            switchMap((body: TrackList) => this.musixMatch.getLyrics(body.track_list[0].track.track_id)),
            map((response: MusixMatchResponse<Lyrics>) => response.message.body.lyrics.lyrics_body),
            map((lyrics: string) => new LyricsActions.GetLyricsSuccess({trackUri: track.uri, lyrics})),
        )),
    );

    constructor(private actions$: Actions,
                private musixMatch: MusixMatchLyricsService) {
    }
}
