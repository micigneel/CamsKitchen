import { Ingredient } from './Ingredient';

export class Recipe {

  constructor(
    public recipeTitle : string,
    public recipeDesc : string,
    public recipeMainImg : string,
    public imgUrls : string[],
    public ingredients : Ingredient[],
    public type : string
  ){}

}
