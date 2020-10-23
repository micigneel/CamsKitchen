import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as cartAction from '../cartStore/cart.action';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Cart } from 'src/app/shared/modal/Cart';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/globalStore/app.reducer';

@Injectable()
export class CartEffect {

    cartURL : string = 'https://camskitchen-f1a0c.firebaseio.com/cart/';
    ext : string = '.json';

    constructor(private action$ : Actions, private http : HttpClient, private store : Store<fromApp.AppState>){}

    //Get Cart Details
    getCart$ = createEffect(
      ()=>{
        return this.action$.pipe(
          ofType(cartAction.GetCartAction),
          switchMap(
            (cartData)=>{
                return this.http.get<Cart[]>(this.cartURL+cartData.userID+this.ext)
                .pipe(
                  map(
                    (carts : Cart[])=>{
                      if(carts === null || carts === undefined || carts.length === 0 ){
                          return [];
                      }
                      else{
                        return carts;
                      }

                    }
                  ),
                  map(
                    ( carts : Cart[])=>{
                      return cartAction.SetCartAction({
                        cartItems : carts,
                        userID : cartData.userID
                      });
                    }
                  )
                )
            }
          )
        );
      }
    );


    //Save All Changes
    saveAll$ = createEffect(
      ()=>{
        return this.action$.pipe(
          ofType(cartAction.SaveAllAction),
          withLatestFrom(this.store.select('cart')),
          switchMap(
            ([cartActdata , finalCartState])=>{
                return this.http.put(
                  this.cartURL + cartActdata.userID + this.ext ,
                  finalCartState.carts
                )
                .pipe(
                  map(
                    ()=>{
                      return cartAction.SuccessSaveAction();
                    }
                  )
                )
            }
          )
        )
      }
    );

    //Save from Recipe
    saveToCart$ = createEffect(
      ()=>{
          return this.action$.pipe(
            ofType(cartAction.SaveToCartAction),
            withLatestFrom(this.store.select('cart')),
            map(
              ([cartData, finalCartState ])=>{

                let cartItem : Cart ;

                const modifiedItemInd : number = finalCartState.carts.findIndex(
                  (cart)=>{
                      return cart.item === cartData.item
                  }
                );

                if(modifiedItemInd !== -1  && modifiedItemInd!== null){

                  cartItem = new Cart(cartData.item ,
                                      (cartData.quantity + finalCartState.carts[modifiedItemInd].quantity)
                                    , cartData.unit);
                  return cartAction.ModifiedAction({
                    index : modifiedItemInd,
                    item : cartItem
                  });
                }
                else{
                  cartItem = new Cart(cartData.item , cartData.quantity  , cartData.unit);
                  return cartAction.AddAction({ cart : cartItem});
                }
              }
            )
          )
      }
    );

}
