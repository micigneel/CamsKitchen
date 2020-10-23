import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../globalStore/app.reducer';
import { take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn : 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private store : Store<fromApp.AppState>,
              private router : Router){}

  canActivate(route : ActivatedRouteSnapshot , router : RouterStateSnapshot)
                        : boolean |
                          UrlTree |
                          Observable<boolean | UrlTree> |
                          Promise<boolean | UrlTree>
  {

    return this.store.select('auth').pipe(
          take(1),
          map(
            (authData)=>{
                if(authData.user){
                  return true;
                }

                return this.router.createUrlTree(['/auth']);
            }
          )
        );
  }

}
