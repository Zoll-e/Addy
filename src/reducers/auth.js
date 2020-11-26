import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  USER_LOADED,
  USER_LOAD_ERROR,
  LOG_OUT_ERROR
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated:true,
          user:payload,
          loading:false,
        }
        case USER_LOAD_ERROR:
          return {
            ...state,
            loading:false,
            errors:payload,
          }
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case LOG_OUT_ERROR:
      return state;
    default:
      return state;
  }
}
