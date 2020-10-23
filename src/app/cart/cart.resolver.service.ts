
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Cart } from '../shared/modal/Cart';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../globalStore/app.reducer';
import * as cartAction from './cartStore/cart.action';
import { take, map } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn : 'root'
})
export class CartResolver implements Resolve<Cart[]>{

  constructor(private store : Store<fromApp.AppState>, private actions$ : Actions){}

  resolve(route : ActivatedRouteSnapshot , state : RouterStateSnapshot){
      let cartItems : Cart[] = [];

      const user : {
              email: string,
              id: string,
              _token: string,
              _tokenExpirationDate: Date
          } = JSON.parse(sessionStorage.getItem('loggedUser'));

      let userID = user.id;

      this.store.select('cart').pipe(
        take(1),
        map(
          (cartData)=>{
            cartItems = cartData.carts;
          }
        )
      ).subscribe();

      if(cartItems.length == 0){

          this.store.dispatch(
           cartAction.GetCartAction({
               userID : userID
             }
           )
          );

        return this.actions$.pipe(
            ofType(cartAction.SetCartAction),
            take(1),
            map(
              (cartActionData)=>{
                return cartActionData.cartItems;
              }
            )
        );

      }
      else {
        return cartItems;
      }
  }
}
