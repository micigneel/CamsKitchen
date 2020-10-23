import { createAction, props } from '@ngrx/store';
import { Recipe } from 'src/app/shared/modal/Recipe';

export const GET_RECIPES = "[Recipe] GET_RECIPES";
export const SET_RECIPES = "[Recipe] SET_RECIPES";
export const SET_SEARCH_DATA = "[Recipe] SET_SEARCH_DATA";


export const GetRecipeAction = createAction(
  GET_RECIPES,
  props<{ category : string}>()
);

export const SetRecipeAction = createAction(
  SET_RECIPES,
  props<{ recipes : Recipe[], category : string}>()
);

export const SetSearchAction = createAction(
  SET_SEARCH_DATA,
  props<{ search : string }>()
);

