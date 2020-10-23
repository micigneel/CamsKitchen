import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../globalStore/app.reducer';
import { take, map, exhaustMap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private store : Store<fromApp.AppState>){}

  intercept( request : HttpRequest<any>, next : HttpHandler){

      return this.store.select('auth').pipe(
        take(1),
        map(
          (authData)=>{
            return authData.user;
          }
        ),
        exhaustMap(
          (user)=>{

            if(!user){
              return next.handle(request);
            }

            const modifiedReq = request.clone({
              params : new HttpParams().set('auth', user.token)
            });
            return next.handle(modifiedReq);
          }
        )
      );


  }

}
