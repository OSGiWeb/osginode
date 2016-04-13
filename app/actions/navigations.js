/**
 * Created by Information on 2016/4/8.
 */
import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import * as types from '../constants';

polyfill();

function onNaviItemActive(item) {


  return {
    type: types.SET_NAVIGATION_ACTIVE,

  };
}

function setNavigationItems(item) {
  return {
    type: types.GET_NAVIGATION_ITEMS,
    item: item
  };
}

// TODO: not used!
export function getNavigationItems() {
  $.getJSON('api/menu-items.json')
    .success(function (data) {
      dispatch(setNavigationItems(data));
    });

}