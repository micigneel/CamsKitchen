import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/shared/modal/Recipe';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/globalStore/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipseSub = new Subscription();
  recipes : Recipe[] = [];
  searchData : string ;
  originalArr : Recipe[] = [];
  loading : boolean = true;

  constructor(private store : Store<fromApp.AppState>) { }

  ngOnInit(): void {

      this.recipseSub = this.store.select('recipe').subscribe(
        (recipeData)=>{
            this.searchData = recipeData.searchData;
            this.originalArr = recipeData.recipesArr;
            this.loading = recipeData.loading;
            if(this.searchData){
              this.searchData =this.searchData.toLowerCase();
              this.filterWithSearch();
            }
            else{
                this.recipes = recipeData.recipesArr;
            }
        }
      );
  }

  filterWithSearch(){
      this.recipes = this.originalArr.filter(
        (recipe : Recipe) =>{
            return ( recipe.type === this.searchData
              || recipe.recipeDesc.toLowerCase().search(this.searchData) !== -1
              || recipe.recipeTitle.toLowerCase().search(this.searchData) !== -1
              )
        }
      );

  }

  ngOnDestroy(){
      this.recipseSub.unsubscribe();
  }

}
