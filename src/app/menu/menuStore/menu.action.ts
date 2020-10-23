import { createAction, props } from '@ngrx/store';
import { MenuItem } from 'src/app/shared/modal/MenuItem';

export const GET_MENU_LIST ="[Menu] GET_MENU_LIST";
export const SET_MENU_LIST ="[Menu] SET_MENU_LIST";

export const GetMenuAction = createAction(
  GET_MENU_LIST
);

export const SetMenuAcion = createAction(
  SET_MENU_LIST,
  props<{ menuItems : MenuItem[]}>()
);


