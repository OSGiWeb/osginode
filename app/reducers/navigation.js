/**
 * Created by Information on 2016/4/8.
 */
import {
  TOGGLE_NAVIGATION_ACTIVE,
  GET_NAVIGATION_ITEMS
} from '../constants/index';

export default function user(
  state={
    isActive: false,
    items: ''
  }, action={}) {
  switch (action.type) {
    case TOGGLE_NAVIGATION_ACTIVE:
      return Object.assign({}, state, {
        isActive: action.isActive
      });
    case GET_NAVIGATION_ITEMS:
      return Object.assign({}, state, {
        items: action.items
      });
    default:
      return state;
  }
}