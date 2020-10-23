import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { recipes } from '../shared/Sample.data';
import { Recipe } from '../shared/modal/Recipe';
import { map , filter, tap } from 'rxjs/operators';

export const ALL_CAT : string = 'all';


@Injectable({
  providedIn : 'root'
})
export class RecipeDataService {

    recipesURL : string = 'https://camskitchen-f1a0c.firebaseio.com/recipes.json';

    constructor(private http : HttpClient){}

    setRecipeList(){
      return this.http.put<Recipe[]>(this.recipesURL, recipes).subscribe(
        (res)=>{
          console.log(res);
        }
      );
    }

}
