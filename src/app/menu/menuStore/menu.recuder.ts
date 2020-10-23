import { Action, createReducer, on } from '@ngrx/store';
import { MenuItem } from 'src/app/shared/modal/MenuItem';
import * as menuAction from '../menuStore/menu.action';

export interface State {
  menuItems : MenuItem[]
}

export const initialState : State = {
  menuItems : []
}

export const _reducer = createReducer(
  initialState,
  on(menuAction.SetMenuAcion, (state, action : {  menuItems : MenuItem[]})=>{
    return {
      ...state,
      menuItems : [...action.menuItems]
    }
  })
);



export function menuReducer(state: State, action : Action){
      return _reducer(state , action);
}
