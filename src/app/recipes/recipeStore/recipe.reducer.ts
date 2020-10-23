import { Recipe } from 'src/app/shared/modal/Recipe';
import { Action, createReducer, on } from '@ngrx/store';
import * as recipeAction from '../recipeStore/recipe.action';

export interface State {
  recipesArr : Recipe[],
  recipeLen : number,
  categoryState : string,
  loading : boolean,
  searchData : string
}

export const initialState : State = {
  recipesArr : [],
  recipeLen : 0,
  categoryState : null,
  loading : true,
  searchData : null
}

export const _reducer = createReducer(
  initialState,
  on(recipeAction.SetRecipeAction , (state, action : { recipes : Recipe[] , category : string})=>{
      return {
        ...state,
        recipesArr : [...action.recipes],
        recipeLen : action.recipes.length ,
        categoryState : action.category,
        loading : false
      }
  }),
  on(recipeAction.SetSearchAction, (state, action : {search : string})=>{
    return {
      ...state,
      searchData : action.search
    }
  })
);


export function recipeReducer(state, action: Action){
    return _reducer(state, action);
}
