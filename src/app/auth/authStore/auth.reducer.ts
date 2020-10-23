import { createReducer, on, Action } from '@ngrx/store';
import * as authAction from '../authStore/auth.action';
import { User } from 'src/app/shared/modal/User';


export interface State {
  user :User,
  errorMessage : string,
  loading : boolean
}

export const initialState : State ={
  user : null,
  errorMessage : null,
  loading : false

}

export const _reducer = createReducer(
  initialState,
  on(authAction.loginSuccessAction , ( state , action : {user : User, redirect : boolean})=>{
        return {
          ...state,
          user : action.user,
          errorMessage : null
        }
  }),

  on(authAction.loginStartAction,
      authAction.SignupStartAction,  (state ,  action : { email : string, password : string})=>{
        return {
          ...state,
          user : null,
          loading : true,
          errorMessage : null
        }
    }),

  on(authAction.loginFailAction, (state , action : { errorMessage : string })=>{
    return {
      ...state,
      loading : false,
      user : null,
      errorMessage : action.errorMessage
    }
  }),

  on(authAction.LogOutAction , (state)=>{
    return {
      ...state,
      loading : false,
      user : null,
      errorMessage : null
    }
  }),

  on(authAction.ClearErrorAction , (state)=>{
    return {
      ...state,
      errorMessage : null
    }
  }),

  on(authAction.MenuLoadAction , (state)=>{
      return {
        ...state,
        loading : false
      }
  })
);




export function authReducer( state : State , action : Action){
    return _reducer(state, action);
}
