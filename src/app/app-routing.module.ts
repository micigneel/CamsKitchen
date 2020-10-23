import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './auth/auth.guard';
import { MenuResolver } from './menu/menu-resolver.service';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesResolver } from './recipes/recipes.resolver.service';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';
import { CartComponent } from './cart/cart.component';
import { CartResolver } from './cart/cart.resolver.service';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlayListResolver } from './playlist/playlist.resolver.service';
import { GoogleMapComponent } from './google-map/google-map.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    component: AuthComponent,
  },

  {
    path: 'menu',
    canActivate : [AuthGuard],
    resolve : [MenuResolver],
    component: MenuComponent,
  },
  {
    path : 'recipes',
    redirectTo : 'recipes/all',
    pathMatch : 'full'
  },
  {
    path : 'recipes/:category',
    canActivate : [AuthGuard],
    resolve : [RecipesResolver],
    component : RecipesComponent,
  },
  {
    path : 'recipes/:category/:id',
    canActivate : [AuthGuard],
    resolve : [RecipesResolver , CartResolver],
    component : RecipeViewComponent
  },
  {
    path : 'cart',
    canActivate : [AuthGuard],
    resolve : [CartResolver],
    component : CartComponent
  },
  {
    path : 'video',
    canActivate : [AuthGuard],
    resolve : [PlayListResolver],
    component : PlaylistComponent
  },
  {
    path : 'maps',
    canActivate : [AuthGuard],
    component : GoogleMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
