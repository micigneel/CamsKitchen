import { Video } from 'src/app/shared/modal/Video';
import { Action, createReducer, on } from '@ngrx/store';
import * as playListAction from '../playlistStore/playlist.action';


export interface State {
  playlist : Video[],
  loading : boolean
}


export const initialState : State = {
  playlist : [],
  loading : true
}

export const _reducer = createReducer(
  initialState,
  on(playListAction.SetPlaylistAction, (state, action : { videos : Video[]})=>{
    return {
      ...state,
      playlist : [...action.videos]
    }
  }),

  on(playListAction.LoadedPlayAction , (state)=>{
    return {
      ...state,
      loading : false
    }
  })
);


export function playlistReducer(state , action : Action){
    return _reducer(state, action);
}
