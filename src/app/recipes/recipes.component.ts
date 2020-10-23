import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SubSink } from '../../../node_modules/subsink';
import { Store } from '@ngrx/store';
import * as fromApp from '../globalStore/app.reducer';
import * as recipeAction from '../recipes/recipeStore/recipe.action'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy{

  recipeCategory : string ;
  recievedRecipes : number ;
  searchData : string ;
  private subsink = new SubSink();
  constructor(private route : ActivatedRoute,
          private store : Store<fromApp.AppState>) { }

  ngOnInit(){

    this.subsink.add(
      this.store.select('recipe').subscribe(
        (recipeData)=>{
          this.recievedRecipes = recipeData.recipeLen;
        }
      )
    );

    this.subsink.add (this.route.params.subscribe(
        (params : Params)=>{
            this.recipeCategory = params['category'];
        }
      )
    );

    this.subsink.add(
      this.route.queryParams.subscribe(
        (queryParams )=>{
            this.searchData = queryParams.search;
            this.store.dispatch(recipeAction.SetSearchAction({ search : this.searchData}));
        }
      )
    )

  }


  ngOnDestroy(){
    this.subsink.unsubscribe();
  }


}
