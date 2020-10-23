import { createAction, props, Action } from '@ngrx/store';
import { User } from 'src/app/shared/modal/User';

export const LOGIN_START ="[Auth] LOGIN_START";
export const SIGNUP_START ="[Auth] SIGNUP_START";
export const LOGIN_SUCCESS ="[Auth] LOGIN_SUCCESS";
export const LOGIN_FAIL = "[Auth] LOGIN_FAIL";
export const LOGOUT = "[Auth] LOGOUT";
export const AUTO_LOGIN = "[Auth] AUTO_LOGIN";
export const CLEAR_ERROR = "[Auth] CLEAR_ERROR";
export const LOADED_MENU = "[Auth] LOADED_MENU";

export const loginStartAction = createAction(
  LOGIN_START,
  props<{ email : string, password : string }>()
);

export const LogInStartAciton = createAction(
  LOGIN_START,
  props< { email : string , password : string }>()
);


export const loginSuccessAction = createAction(
  LOGIN_SUCCESS,
  props<{user : User, redirect : boolean}>()
);

export const loginFailAction = createAction(
  LOGIN_FAIL,
  props<{ errorMessage : string }>()
);


export const SignupStartAction = createAction(
  SIGNUP_START,
  props<{ email : string, password : string}>()
);

export const LogOutAction = createAction(
  LOGOUT
);

export const AutoLoginAction = createAction (
  AUTO_LOGIN
);

export const ClearErrorAction = createAction (
  CLEAR_ERROR
);

export const MenuLoadAction = createAction(
  LOADED_MENU
);


