import { combineReducers } from "redux";
import {
  AUTH_LOADING,
  IS_FIRST,
  LOGIN_DATA
} from "./action";

const initialUserState = {
  AuthLoading: false,
  isFirst: false,
  login: ""
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
  if (action.type === LOGIN_DATA) {
    return {
      ...state,
      login: action.payload.login
    };
  }

  return state;
};


const reducer = combineReducers({
  user: userReducer,
});
export default reducer;