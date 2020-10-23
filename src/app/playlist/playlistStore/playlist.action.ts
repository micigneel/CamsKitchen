import { createAction, props } from '@ngrx/store';
import { Video } from 'src/app/shared/modal/Video';

export const GET_PLAYLIST = "[PlayList] GET_PLAYLIST";
export const SET_PLAYLIST = "[PlayList] SET_PLAYLIST";
export const LOADED_PLAYLIST = "[PlayList] LOADED_PLAYLIST"

export const GetPlaylistAction = createAction(
  GET_PLAYLIST
);

export const SetPlaylistAction = createAction(
  SET_PLAYLIST,
  props<{ videos : Video[]}>()
);

export const LoadedPlayAction = createAction(
  LOADED_PLAYLIST
);
