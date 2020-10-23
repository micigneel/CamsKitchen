import { createAction, props } from '@ngrx/store';
import { Cart } from 'src/app/shared/modal/Cart';

export const GET_CART_DETAILS = "[Cart] GET_CART_DETAILS";
export const SET_CART_DETAILS = "[Cart] SET_CART_DETAILS";
export const UPDATE_ITEM = "[Cart] UPDATE_ITEM";
export const DELETE_ITEM = "[Cart] DELETE_ITEM";
export const ADD_ITEM = "[Cart] ADD_ITEM";
export const SAVE_ALL_CHANGES = "[Cart] SAVE_ALL_CHANGES";
export const SUCCESS_SAVE = "[Cart] SUCCESS_SAVE";
export const SAVE_TO_CART = "[Cart] SAVE_TO_CART";


export const GetCartAction = createAction(
  GET_CART_DETAILS,
  props<{ userID : string}>()
);

export const SetCartAction = createAction(
  SET_CART_DETAILS,
  props<{ cartItems : Cart[] , userID : string}>()
);

export const ModifiedAction = createAction(
  UPDATE_ITEM,
  props<{ index : number, item : Cart}>()
);

export const DeleteAction = createAction(
  DELETE_ITEM,
  props<{ index: number}>()
);


export const AddAction = createAction(
  ADD_ITEM,
  props<{ cart : Cart}>()
);


export const SaveAllAction = createAction(
  SAVE_ALL_CHANGES,
  props<{ userID : string}>()
);

export const SuccessSaveAction = createAction(
  SUCCESS_SAVE
);


export const SaveToCartAction = createAction(
  SAVE_TO_CART,
  props<{ item : string , quantity : number , unit : string}>()
);
