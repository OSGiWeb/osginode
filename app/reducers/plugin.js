/**
 * Created by Information on 2016/4/19.
 */
import {
  TOGGLE_PRIVATE_REPOSITORY_MODE
} from '../constants/index';

export default function plugin(
  state={
    isPrivate: true, // Is private plugins repository
    data: ''
  }, action={}) {
  switch (action.type) {
    case TOGGLE_PRIVATE_REPOSITORY_MODE:
      return Object.assign({}, state, {
        isPrivate: !state.isPrivate,
      });
    // case SET_NAVIGATION_CONTENT:
    //   return Object.assign({}, state, {
    //     data: action.data
    //   });
    // case SET_MENUITEM_OPEN_CLOSE:
    //   return Object.assign({}, state, {
    //     data: action.data
    //   });
    default:
      return state;
  }
}