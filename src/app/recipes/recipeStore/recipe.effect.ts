import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as recipeAction from '../recipeStore/recipe.action';
import { switchMap, map } from 'rxjs/operators';
import { Recipe } from 'src/app/shared/modal/Recipe';
import { HttpClient } from '@angular/common/http';

export const ALL_CAT : string = 'all';

@Injectable()
export class RecipeEffect{

  recipesURL : string = 'https://camskitchen-f1a0c.firebaseio.com/recipes.json';

  constructor(private actions$ : Actions, private http: HttpClient){}

  //getRecipes
  getRecipes$ = createEffect(
    ()=>{
      return this.actions$.pipe(
        ofType(recipeAction.GetRecipeAction),
        switchMap(
          (recipeData)=>{
            return this.http.get(this.recipesURL)
            .pipe(
              map(
                (serverRep : Recipe[] ) =>{
                  if(recipeData.category === ALL_CAT){
                    return recipeAction.SetRecipeAction({
                      recipes : serverRep,
                      category : recipeData.category
                    });
                  }
                  else {

                   let filterRecipe : Recipe[] = serverRep.filter(
                     (recipe) => {
                        return recipe.type === recipeData.category
                     }
                   )

                  return recipeAction.SetRecipeAction({
                      recipes : filterRecipe,
                      category : recipeData.category
                  });

                  }
                }
              )
             )
          }
        )
      )
    }
  );
}
