import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import * as authActions from '../authStore/auth.action';
import { of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/shared/modal/User';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffect {
  key: string = 'AIzaSyBSxirdkFgcxfyHCG1Macsj8vN1MXu1QlA';
  signUpURL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.key;
  loginURL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.key;

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private router : Router,
    private authService : AuthService
  ) {}


//LOGIN
  authLogin$ =  createEffect(() => {
    return this.action$.pipe(
      ofType(authActions.loginStartAction),
      switchMap((authData) => {
        return this.http
          .post<AuthResponseData>(this.loginURL, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .pipe(
            map((resData) => {
                return authActions.loginSuccessAction({
                  user: this.handleData(resData),
                  redirect: true,
                })
            }),
            catchError((err) => {
              return of(
                  authActions.loginFailAction({
                    errorMessage: this.handleError(err),
                  })
              )
            })
          )
      })
    )
  });


  //SignUp
   authSignup$ = createEffect(() => {
    return this.action$.pipe(
      ofType(authActions.SignupStartAction),
      switchMap((authData) => {
        return this.http.post<AuthResponseData>(this.signUpURL, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .pipe(
            map((resData) => {
               return authActions.loginSuccessAction({
                  user: this.handleData(resData),
                  redirect: true,
                })
            }),
            catchError((err) => {
              return of(
                  authActions.loginFailAction({
                    errorMessage: this.handleError(err),
                  })
              )
            })
          )
      })
    )
  });



  //Success Login
  loginSuccess$ = createEffect(() => {
      return this.action$.pipe(
        ofType(authActions.loginSuccessAction),
        tap(
          (authData)=>{
              if(authData.redirect){
                this.router.navigate(['/menu']);
              }
          }
        )
      )
    },
    {
      dispatch : false
    });


    //LogOut
    authLogout$ = createEffect(
      ()=>{
        return this.action$.pipe(
          ofType(authActions.LogOutAction),
          tap(
            ()=>{
              this.authService.clearTimeOut();
              sessionStorage.removeItem('loggedUser');
              this.router.navigate(['/auth']);
            }
          )
        );
      },
      {
          dispatch : false
      }
    );


  //AUTO_LOGIN
  authAutoLogin$ = createEffect(
    () =>{
      return this.action$.pipe(
        ofType(authActions.AutoLoginAction),
        map(
          ()=>{
            const user : {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: Date
            } = JSON.parse(sessionStorage.getItem('loggedUser'));

            if(!user)
                return { type : 'INVALID'}

            const loggedUser = new User(user.email, user.id, user._token, user._tokenExpirationDate);

            if(loggedUser.token){
                const expirationTimer = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogOutTimer(+expirationTimer);

                return authActions.loginSuccessAction({
                  user : loggedUser,
                  redirect : false
                });
            }

            return { type : 'INVALID'}

          }
        )
      )
    }
  );



  //Data Handling Methods

  private handleData(resData: any) {
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    let user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );
    sessionStorage.setItem('loggedUser', JSON.stringify(user));
    return user;
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Unkown Error has occured!';

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password!';
        break;
      case 'USER_DISABLED':
        errorMessage = 'Account disabled!';
        break;
    }
    return errorMessage;
  }
}
