import { combineReducers } from "redux";
import {
  AUTH_LOADING,
  IS_FIRST,
  LOGIN_DATA,
  LOG_OUT,
  COUNTRY_NAME,
  MAKE_FAV
} from "./action";

const initialUserState = {
  AuthLoading: false,
  isFirst: false,
  login: "",
  countryData: [],
  makeFav: ""
};

const userReducer = (state = initialUserState, action) => {
  if (action.type === LOG_OUT) {
    return {
      ...state,
      AuthLoading: false,
      login: "",
      countryData: [],
      makeFav: ""
    };
  }
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
  if (action.type === COUNTRY_NAME) {
    return {
      ...state,
      countryData: action.payload.countryData
    };
  }
  if (action.type === MAKE_FAV) {
    return {
      ...state,
      makeFav: action.payload.makeFav
    };
  }

  return state;
};


const reducer = combineReducers({
  user: userReducer,
});
export default reducer;