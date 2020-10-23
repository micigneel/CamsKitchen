import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Video } from '../shared/modal/Video';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../globalStore/app.reducer';
import { take, map } from 'rxjs/operators';
import * as playlistAction from '../playlist/playlistStore/playlist.action';
import { Actions, ofType } from '@ngrx/effects';


@Injectable({
  providedIn : 'root'
})
export class PlayListResolver implements Resolve<Video[]>{


  constructor(private store : Store<fromApp.AppState>, private actions$ : Actions){}

  resolve(route : ActivatedRouteSnapshot , state : RouterStateSnapshot){
     let playlist : Video[] = [];

     this.store.select('play')
     .pipe(
       take(1),
       map(
         (playData)=>{
            playlist = playData.playlist
         }
       )
     )
     .subscribe();

     if(playlist.length === 0){
        this.store.dispatch(playlistAction.GetPlaylistAction());

        this.actions$.pipe(
          ofType(playlistAction.SetPlaylistAction),
          map(
            (playData)=>{
                return playData.videos;
            }
          )
        );

     }
     else{
       return playlist;
     }
  }

}
