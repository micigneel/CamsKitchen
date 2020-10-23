import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { Recipe } from '../shared/modal/Recipe';
import { take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../globalStore/app.reducer';
import * as recipeAction from '../recipes/recipeStore/recipe.action';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn : 'root'
})
export class RecipesResolver implements Resolve<Recipe[]>{

    constructor(private store : Store<fromApp.AppState>, private actions$ : Actions){}

    resolve( route : ActivatedRouteSnapshot, state : RouterStateSnapshot){
        let recipeList : Recipe[] =[];
        let storeCategory : string ;
        let category : string ;

        this.store.select('recipe').pipe(
          take(1),
          map(
            (recipeData)=>{
                recipeList = recipeData.recipesArr;
                storeCategory = recipeData.categoryState;
            }
          )
        );

        category = route.params['category'];

        if(recipeList.length == 0){
             this.accessRecipes(category);
        }
        else {
          if( storeCategory === category){
            return recipeList;
          }
          else{
             this.accessRecipes(category);
          }
        }

    }

    accessRecipes(category : string ){
        this.store.dispatch(recipeAction.GetRecipeAction({ category : category}));

        return this.actions$.pipe(
          ofType(recipeAction.SetRecipeAction),
          map(
            (recipeData)=>{
              return recipeData.recipes;
            }
          )
        )
    }

}
