/**
 * Created by pc on 2016/4/18.
 */
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import _ from 'lodash'

import * as types from '../constants';

polyfill();

/*
 Plugin repository control functions
 */
export function togglePrivateRepositoryMode() {
  return { type: types.TOGGLE_PRIVATE_REPOSITORY_MODE };
}


/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * Note: this function relies on an external variable `API_ENDPOINT`
 *        and isn't a pure function
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint
 * @return Promise
 */
function makePluginRequest(method, id, data, api='/pluginsRepository') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

/*
 Get plugin functions
 */
function getPluginsRequest() {
  return {
    type: types.GET_PLUGINS_REQUEST
  }
}
function getPluginsSuccess(data) {
  return {
    type: types.GET_PLUGINS_SUCCESS,
    data:data
  }
}

function getPluginsFailure() {
  return {
    type: types.GET_PLUGINS_FAILURE
  }
}

/*
 Create plugin functions
 */
function createPluginRequest() {
  return {
    type: types.CREATE_PLUGIN_REQUEST
  };
}

function createPluginSuccess(data) {
  return {
    type: types.CREATE_PLUGIN_SUCCESS,
    data:data
  };
}

function createPluginFailure(data) {
  return {
    type: types.CREATE_PLUGIN_FAILURE,
    id: data.id,
    error: data.error
  };
}

/*
 Datatable operation functions
 */
export function setDatatableSelectedData(data, isSelected) {
  return {
    type: types.SET_DATATABLE_SELECTED_DATA,
    data: data,
    isSelected: isSelected
  };
}
// The notification is already shown in UI, this action is used to set some related states in store
export function showNotificationDone() {
  return {
    type: types.SHOW_NOTIFICATION_DONE
  };
}

function formatPluginData(pluginData) {
  let formatData = [];
  // TODO: Maybe we need to keep the md5 id field which will be used to update plugin info!

  // Format data which will be saved in store
  for (let i = 0; i < pluginData.length; i++) {
    formatData[i] = _.omit(pluginData[i], '_id', '__v'); // Delete unused plugin info
    formatData[i].index = i+1; // Add plugin numeric index
  }

  return formatData;
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createPlugin(pluginInfo) {
  return (dispatch, getState) => {
    // If the creating plugin name is empty
    if (_.trim(pluginInfo.pluginname).length <= 0) return;

    // Calculate md5 identifier
    const identifier = md5.hash(pluginInfo.pluginname);
    pluginInfo.id = identifier; // store md5 id in database, id is used to update plugin info

    // First dispatch an optimistic update
    dispatch(createPluginRequest());

    return makePluginRequest('post', identifier, pluginInfo)
      .then(res => {
        if (res.status === 200) {
          // Add plugin numeric index
          const { plugins } = getState().plugin;
          pluginInfo.index = plugins.length + 1;

          // Dispatch a CREATE_PLUGIN_SUCCESS action and (in reducer) save the created plugin info to store
          return dispatch(createPluginSuccess(pluginInfo));
        }
      })
      .catch(ex => {
        return dispatch(createPluginFailure({identifier, error: 'Plugin creation failed on sending to database!'}));
      });
  };
}

// Fetch posts logic
export function fetchPlugins() {

  return dispatch => {
    dispatch(getPluginsRequest());

    return makePluginRequest('get').then(res => {
        if (res.status === 200) {
          // Format plugin data structure which will be saved in store
          const pluginData = formatPluginData(res.data);

          // Dispatch a GET_PLUGIN_SUCCESS action and (in reducer) save all plugins to store
          return dispatch(getPluginsSuccess(pluginData));
        }
      })
      .catch(ex => {
        return dispatch(getPluginsFailure());
      });
  };



  // return dispatch => {
  //   dispatch(beginLogout());
  //
  //   return makeUserRequest('post', null, '/logout')
  //     .then( response => {
  //       if (response.status === 200) {
  //         dispatch(logoutSuccess());
  //       } else {
  //         dispatch(logoutError());
  //       }
  //     });
  // };

  // return {
  //   type: types.GET_PLUGINS_REQUEST,
  //   promise: makePluginRequest('get')
  // };
}