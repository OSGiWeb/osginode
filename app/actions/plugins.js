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

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createPlugin(pluginInfo) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (_.trim(pluginInfo.pluginname).length <= 0) return;

    const identifier = md5.hash(pluginInfo.pluginname);
    pluginInfo.id = identifier;

    // // Redux thunk's middleware receives the store methods `dispatch`
    // // and `getState` as parameters
    // const { plugin } = getState();
    // // Conditional dispatch
    // // If the topic already exists, make sure we emit a dispatch event
    // if (topic.topics.filter(topicItem => topicItem.id === id).length > 0) {
    //   // Currently there is no reducer that changes state for this
    //   // For production you would ideally have a message reducer that
    //   // notifies the user of a duplicate topic
    //   return dispatch(createTopicDuplicate());
    // }

    // First dispatch an optimistic update
    dispatch(createPluginRequest());

    return makePluginRequest('post', pluginInfo.id, pluginInfo)
      .then(res => {
        if (res.status === 200) {

          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createPluginSuccess(pluginInfo));
        }
      })
      .catch(ex => {
        return dispatch(createPluginFailure({identifier, error: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      });
  };
}

// Fetch posts logic
export function fetchPlugins() {

  return dispatch => {
    dispatch(getPluginsRequest());

    return makePluginRequest('get').then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(getPluginsSuccess(res.data));
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