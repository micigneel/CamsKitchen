import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/globalStore/app.reducer';
import * as authAction from './authStore/auth.action';

@Injectable({
  providedIn : 'root'
})
export class AuthService {

    private expriationTimer = null;

    constructor(private store : Store<fromApp.AppState>){}


    setLogOutTimer(expirationSec : number){
          this.expriationTimer = setTimeout(
            ()=>{
              this.store.dispatch(authAction.LogOutAction());
            }
            , expirationSec
          );
    }

    clearTimeOut(){
      if(this.expriationTimer){
        clearTimeout(this.expriationTimer);
      }
      this.expriationTimer = null;
    }

}
