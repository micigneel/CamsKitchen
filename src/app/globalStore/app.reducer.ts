import { ActionReducerMap } from '@ngrx/store';
import * as authReducer from '../auth/authStore/auth.reducer';
import * as menuReducer from '../menu/menuStore/menu.recuder';
import * as cartReducer from '../cart/cartStore/cart.reducer';
import * as playListReducer from '../playlist/playlistStore/playlist.reducer';
import * as recipeReducer from '../recipes/recipeStore/recipe.reducer';

export interface AppState {
    'auth' : authReducer.State,
    'menu' : menuReducer.State,
    'cart' : cartReducer.State,
    'play' : playListReducer.State,
    'recipe' : recipeReducer.State
}

export const appReducers : ActionReducerMap<AppState> = {
  'auth' : authReducer.authReducer,
  'menu' : menuReducer.menuReducer,
  'cart' : cartReducer.cartreducer,
  'play' : playListReducer.playlistReducer,
  'recipe' : recipeReducer.recipeReducer
}
