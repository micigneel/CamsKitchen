import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as menuAction from '../menuStore/menu.action';
import { MenuItem } from 'src/app/shared/modal/MenuItem';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import * as authAction from '../../auth/authStore/auth.action';

@Injectable()
export class MenuEffect {

  menuURL: string = 'https://camskitchen-f1a0c.firebaseio.com/menu-items.json';

  constructor(private action$ : Actions,
              private http : HttpClient){}


  //GET MENU ITEMS FROM SERVER
  getMenu$ = createEffect(
    ()=>{
      return this.action$.pipe(
        ofType(menuAction.GetMenuAction),
        switchMap(
        (menuData)=>{
            return  this.http.get<MenuItem[]>(this.menuURL).pipe(
              map(
                (menuItems)=>{
                  return menuAction.SetMenuAcion({
                    menuItems : menuItems
                  })
                }
              )
            );
        }
      )
      )
    }
  );

  menuLoaded$ = createEffect(
    ()=>{
      return this.action$.pipe(
        ofType(menuAction.SetMenuAcion),
        map(
          ()=>{
              return authAction.MenuLoadAction();
          }
        )
      )
    }
  );

}
