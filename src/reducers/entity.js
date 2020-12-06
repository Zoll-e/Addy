import {
  ENTITY_LOADED,
  ENTITY_FAIL,
  ENTITY_ADDED,
  ENTITY_ADD_FAIL,
  REMOVE_FAIL,
  REMOVE_SUCCESS,
} from "../actions/types";

const initialState = {
  loading: true,
  entities: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ENTITY_LOADED:
      return {
        ...state,
        entities: payload,
        loading: false,
      };
    case ENTITY_ADDED:
      return {
        ...state,
        loading: false,
      };
    case REMOVE_FAIL:
    case REMOVE_SUCCESS:
    case ENTITY_ADD_FAIL:
    case ENTITY_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
