import { Cart } from 'src/app/shared/modal/Cart';
import { Action, createReducer, on } from '@ngrx/store';
import * as cartAction from '../cartStore/cart.action';

export interface State {
  user : string
  carts : Cart[],
  updatedToServer : boolean
}

export const initialState : State = {
  user : null,
  carts : [],
  updatedToServer : false
}

export const _reducer = createReducer(
  initialState,

  on(cartAction.SetCartAction , (state, action : { cartItems : Cart[] , userID : string}) =>{
    return {
      ...state,
      user : action.userID,
      carts : [...action.cartItems]
    }
  }
  ),

  on( cartAction.ModifiedAction , (state, action  : {index : number , item : Cart})=>{
    const modifiedCart = [...state.carts];
    modifiedCart[action.index] = action.item;
    return {
      ...state,
      carts : modifiedCart,
      updatedToServer : false
    }
  }),

  on (cartAction.DeleteAction , (state, action : { index: number})=>{
    const updatedCart = [...state.carts];
    updatedCart.splice(action.index ,1 );
    return {
      ...state,
      carts : updatedCart,
      updatedToServer : false
    }
  }),

  on(cartAction.AddAction , (state , action : { cart : Cart})=>{
    const addCart = [...state.carts];
    addCart.push(action.cart)
    return {
      ...state,
      carts : addCart,
      updatedToServer : false
    }
  }),

  on(cartAction.SuccessSaveAction , (state)=>{
    return {
      ...state,
      updatedToServer : true
    }
  }),



);



export function cartreducer(state , action :Action){
    return _reducer(state, action);
}
