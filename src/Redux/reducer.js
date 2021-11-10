import { combineReducers } from "redux";
import {
  AUTH_LOADING,
  IS_FIRST
} from "./action";

const initialUserState = {
  AuthLoading: false,
  isFirst: false
};

const userReducer = (state = initialUserState, action) => {

  if (action.type === AUTH_LOADING) {
    return {
      ...state,
      AuthLoading: action.payload
    };
  }
  if (action.type === IS_FIRST) {
    return {
      ...state,
      isFirst: action.payload.isFirst
    };
  }

  return state;
};


const reducer = combineReducers({
  user: userReducer,
});
export default reducer;