import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import * as fromApp from './globalStore/app.reducer';
import { MenuComponent } from './menu/menu.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './auth/authStore/auth.effects';
import { FooterComponent } from './footer/footer.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MessageModalComponent } from './shared/message-modal/message-modal.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { MenuEffect } from './menu/menuStore/menu.effect';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { CartComponent } from './cart/cart.component';
import { CartEffect } from './cart/cartStore/cart.effect';
import { NgxPaginationModule } from 'ngx-pagination';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistEffect } from './playlist/playlistStore/playlist.effect';
import { SafePipe } from './safe.pipe';
import { clearAllState } from './globalStore/clearGlobal.reducer';
import { RecipeEffect } from './recipes/recipeStore/recipe.effect';
import {  AgmCoreModule } from '@agm/core';
import { GoogleMapComponent } from './google-map/google-map.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    MenuComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    MessageModalComponent,
    MenuItemComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeViewComponent,
    MenuListComponent,
    CartComponent,
    PlaylistComponent,
    SafePipe,
    GoogleMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducers, {metaReducers : [clearAllState]}),
    EffectsModule.forRoot([AuthEffect, MenuEffect, CartEffect, PlaylistEffect, RecipeEffect]),
    NgxPaginationModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyBSxirdkFgcxfyHCG1Macsj8vN1MXu1QlA'
    })
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
