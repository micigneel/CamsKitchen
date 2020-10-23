import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MenuItem } from '../shared/modal/MenuItem';
import { Store } from '@ngrx/store';
import * as fromApp from '../globalStore/app.reducer';
import { Actions, ofType } from '@ngrx/effects';
import * as menuAction from '../menu/menuStore/menu.action';
import { take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn : 'root'
})
export class MenuResolver implements Resolve<MenuItem[]>{

    constructor(
      private store : Store<fromApp.AppState>,
      private action$ : Actions
    ){}

    resolve( route : ActivatedRouteSnapshot, routeState : RouterStateSnapshot){
        let menu_items : MenuItem[] = [];

        this.store.select('menu').subscribe(
          (menuData)=>{
            menu_items = menuData.menuItems
          }
        );
        if(menu_items.length === 0){

            //Dispatch action to get from Server
            this.store.dispatch(menuAction.GetMenuAction());

            //After setting Data
            return this.action$.pipe(
              ofType(menuAction.SetMenuAcion),
              take(1),
              map(
                (menuData)=>{
                  return menuData.menuItems;
                }
              )
            );

        }
        else{
          return menu_items;
        }
    }
}
