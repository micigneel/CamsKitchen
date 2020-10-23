import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { Recipe } from 'src/app/shared/modal/Recipe';
import { NgForm } from '@angular/forms';
import { units, UnitInt } from 'src/app/shared/BasicData/units';
import { Ingredient } from 'src/app/shared/modal/Ingredient';
import { Store } from '@ngrx/store';


import * as fromApp from 'src/app/globalStore/app.reducer';
import * as cartAction from '../../cart/cartStore/cart.action';
import { Cart } from 'src/app/shared/modal/Cart';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit, OnDestroy {

  subsink = new SubSink();
  category : string ;
  index : number ;
  recipe : Recipe;
  units : UnitInt[] ;
  selectedIngredient : string ;
  updatedToCart : boolean = false;

  constructor(private route : ActivatedRoute,
              private router : Router,
              private store : Store<fromApp.AppState>) { }

  ngOnInit(){

    this.units = units;


    this.subsink.add(
      this.route.params.subscribe(
        (params : Params)=>{
            this.category = params['category'];
            this.index = params['id'];
            this.subsink.add(
              this.store.select('recipe').subscribe(
                (recipeData)=>{
                    this.recipe = recipeData.recipesArr[this.index];
                }
              )
          );
        }
      )
    );


  }

  returnToList(){
      this.router.navigate(['../'],
      {
        relativeTo : this.route
      }
      );
  }

  saveCart(form : NgForm){
      const formData = form.value;
      this.store.dispatch( cartAction.SaveToCartAction({
        item : formData.ingredient,
        quantity : formData.quantity,
        unit : formData.unit
      }));

      this.updatedToCart = true;
      setTimeout(() => {
        this.updatedToCart = false;
      }, 1000);
  }

  onSelectIngredient(ingredient : Ingredient){
      this.selectedIngredient = ingredient.ingredientName;
  }

  ngOnDestroy(){
    this.subsink.unsubscribe();
  }


}
