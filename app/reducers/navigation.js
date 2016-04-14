/**
 * Created by Information on 2016/4/8.
 */

import {
  SET_NAVIGATION_ACTIVE,
  GET_NAVIGATION_CONTENT
} from '../constants/index';

var defaultItems = {
  "items": [
    {
      "_id": "123456",
      "title": "Blank",
      "icon": "fa fa-lg fa-fw fa-home",
      "route": "/home"
    }
  ]
};

export default function navigation(
  state={
    isActive: false,
    data: defaultItems
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