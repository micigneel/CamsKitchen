import * as authAction from '../auth/authStore/auth.action';

export function clearAllState(reducer){
      return function(state, action){

          if(action.type === authAction.LOGOUT){
              state = undefined;
          }

          return reducer(state, action);
      }
}
