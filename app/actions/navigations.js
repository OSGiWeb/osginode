/**
 * Created by Information on 2016/4/8.
 */
import { polyfill } from 'es6-promise'
import _ from 'lodash'
import request from 'axios'
import { push } from 'react-router-redux'

import MenuItem from '../components/smartAdmin/layout/navigation/stores/MenuItem.js' // TODO: change path
import * as types from '../constants'

polyfill();

let data = {
  item: undefined,
  items: []
};


function onNaviItemActive(item) {


  return {
    type: types.SET_NAVIGATION_ACTIVE,

  };
}

function setInitialItem(items) {
  items.forEach(function(item){
    if (item.isActive){
      data.item = item
    }
    if(item.items){
      setInitialItem(item.items)
    }
  })
}

function normalize(items) {
  return _.map(items, function (item) {
    return new MenuItem(item)
  })
}

function setNavigationContent(data) {
  return {
    type: types.GET_NAVIGATION_CONTENT,
    data: data
  };
}

export function initRawItems(rawItems) {
  data.items = normalize(rawItems);
  setInitialItem(data.items);
  return dispatch => {
    dispatch(setNavigationContent(data));
  }
}

// TODO: not used!
// export function getNavigationItems() {
//   $.getJSON('api/menu-items.json')
//     .success(function (data) {
//       dispatch(setNavigationItems(data));
//     });
// }