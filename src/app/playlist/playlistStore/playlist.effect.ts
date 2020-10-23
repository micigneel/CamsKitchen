import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as playlistAction from '../playlistStore/playlist.action';
import { switchMap, map } from 'rxjs/operators';
import { Video } from 'src/app/shared/modal/Video';

@Injectable()
export class PlaylistEffect {

  playlistURL : string = 'https://camskitchen-f1a0c.firebaseio.com/videos.json';

  constructor(private action$ : Actions, private http : HttpClient){}

  //Get Playlist
  getPlaylist$ = createEffect(
    ()=>{
      return this.action$.pipe(
        ofType(playlistAction.GetPlaylistAction),
        switchMap(
          ()=>{
            return this.http.get<Video[]>(this.playlistURL)
            .pipe(
              map(
                (playlistData)=>{
                    return playlistAction.SetPlaylistAction({
                       videos : playlistData
                    });
                }
              )
            )
          }
        )
      )
    }
  );

  //Data Loaded
  loadedPlayList$ = createEffect(
    ()=>{
      return this.action$.pipe(
        ofType(playlistAction.SetPlaylistAction),
        map(
          ()=>{
              return playlistAction.LoadedPlayAction();
          }
        )
      )
    }
  );

}
