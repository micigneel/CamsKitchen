import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/shared/modal/Recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipeItem : Recipe;
  @Input() recipeIndex : number;
  constructor() { }

  ngOnInit(): void {
  }

}
