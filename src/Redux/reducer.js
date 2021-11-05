import { combineReducers } from "redux";
import {
  AUTH_LOADING,

} from "./action";

const initialUserState = {
  AuthLoading: false,
};

const userReducer = (state = initialUserState, action) => {

  if (action.type === AUTH_LOADING) {
    return {
      ...state,
      AuthLoading: action.payload
    };
  }

  return state;
};


const reducer = combineReducers({
  user: userReducer,
});
export default reducer;