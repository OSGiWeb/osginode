/**
 * Created by pc on 2016/4/18.
 */
import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';
import md5 from 'spark-md5';


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
  Create plugin functions
 */
function createPluginRequest(data) {
  return {
    type: types.CREATE_PLUGIN_REQUEST,
    id: data.id,
    pluginname: data.pluginname,
    category: data.category,
    version: data.version,
    author: data.author,
    description: data.description
  };
}

function createPluginSuccess() {
  return {
    type: types.CREATE_PLUGIN_SUCCESS
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
export function createPlugin(data) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (data.trim().length <= 0) return;

    const id = md5.hash(data);

    const data = {
      id: id,
      data
    };

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
    dispatch(createPluginRequest(data));

    return makePluginRequest('post', id, data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createPluginSuccess());
        }
      })
      .catch(ex => {
        return dispatch(createPluginFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      });
  };
}

// Fetch posts logic
export function fetchPlugins() {
  return {
    type: types.GET_PLUGINS_REQUEST,
    promise: makePluginRequest('get')
  };
}