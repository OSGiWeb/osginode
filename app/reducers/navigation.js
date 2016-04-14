/**
 * Created by Information on 2016/4/8.
 */
import {
  SET_NAVIGATION_ACTIVE,
  GET_NAVIGATION_CONTENT
} from '../constants/index';

export default function navigation(
  state={
    isActive: false,
    data: ''
  }, action={}) {
  switch (action.type) {
    case SET_NAVIGATION_ACTIVE:
      return Object.assign({}, state, {
        isActive: action.isActive
      });
    case GET_NAVIGATION_CONTENT:
      return Object.assign({}, state, {
        data: action.data
      });
    default:
      return state;
  }
}