/**
 * Created by pc on 2016/4/18.
 */
import { polyfill } from 'es6-promise';
import request from 'axios';
import moment from 'moment'
import md5 from 'spark-md5';
import _ from 'lodash';
import axios from 'axios';
import * as types from '../constants';

polyfill();


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
function makePluginRequest(method, id, data, api='/pluginRepository') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

function makeUploadRequest(method, api, id, data, config) {
  return request[method](api + (id ? ('/' + id) : ''), data, config);
}

/*
 Plugin status control functions
 */
// export function togglePluginStatus(index, status) {
//   return {
//     type: types.TOGGLE_PLUGIN_STATUS,
//     index: index - 1,
//     status: status
//   };
// }

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
  Update plguin functions
 */
function updatePluginRequest() {
  return {
    type: types.UPDATE_PLUGIN_REQUEST
  };
}
function updatePluginSuccess(data) {
  return {
    type: types.UPDATE_PLUGIN_SUCCESS,
    data: data
  };
}
function updatePluginFailure() {
  return {
    type: types.UPDATE_PLUGIN_FAILURE
  };
}

/*
 Delete plugin functions
 */
function deletePluginRequest() {
  return {
    type: types.DELETE_PLUGIN_REQUEST
  };
}
function deletePluginSuccess() {
  return {
    type: types.DELETE_PLUGIN_SUCCESS
  };
}
function deletePluginFailure() {
  return {
    type: types.DELETE_PLUGIN_FAILURE
  };
}

/*
  Download plugin functions
 */
function downloadPluginSuccess() {
  return {
    type: types.DOWNLOAD_PLUGIN_SUCCESS
  };
}
function downloadPluginFailure() {
  return {
    type: types.DOWNLOAD_PLUGIN_FAILURE
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

export function resetStoreStates() {
  return {
    type: types.RESET_STORE_STATES
  }
}

function formatPluginData(pluginData) {
  let formatData = [];
  // TODO: Maybe we need to keep the md5 id field which will be used to update plugin info!

  // Format data which will be saved in store
  for (let i = 0; i < pluginData.length; i++) {
    formatData[i] = _.omit(pluginData[i], '_id', '__v'); // Delete unused plugin info
    formatData[i].index = i + 1; // Add plugin numeric index
  }
  return formatData;
}



/**
 * createPlugin()
 * @param pluginInfo
 * @param uploadData
 * @param uploadConfig
 * @returns {function()}
 */
export function createPlugin(pluginInfo, uploadData, uploadConfig) {
  return (dispatch, getState) => {
    // If the creating plugin name is empty
    // TODO: Add validation of all fileds
    if (_.trim(pluginInfo.pluginname).length <= 0) return;

    // Calculate plugin md5 identifier
    const identifier = getMd5Identifier(pluginInfo.pluginname);
    pluginInfo.id = identifier; // store md5 id in database, id is used to update plugin info

    // First dispatch an optimistic update
    dispatch(createPluginRequest());

    // Upload file to mongoDB GridFS
    makeUploadRequest('post', '/pluginRepository/upload', pluginInfo.id, uploadData, uploadConfig)
      .then(res => {
        if (res.status === 200) { // When file create success then storing new plugin information
          return makePluginRequest('post', identifier, pluginInfo)
            .then(res => {
              if (res.status === 200) {
                // Dispatch a CREATE_PLUGIN_SUCCESS action and (in reducer) save the created plugin info to store
                return dispatch(createPluginSuccess(pluginInfo));
              }
            })
            .catch(ex => {
              return dispatch(createPluginFailure({identifier, error: 'Plugin creation failed on storing plugin info!'}));
            });
        }})
      .catch(ex => {
        return dispatch(createPluginFailure({identifier, error: 'Plugin creation failed on upload plugin file!'}));
      });
  };
}

function getMd5Identifier(field) {
  return md5.hash(field + moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
}

/**
 * Fetch all plugins
 * @returns {function()}
 */
// TODO: fetch plugin based on username
export function fetchPlugins() {

  return dispatch => {
    dispatch(getPluginsRequest());

    return makePluginRequest('get').then(res => {
        if (res.status === 200) { // Only when database operation return 'SUCCESS(200)', then modify the data in store
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
}

/**
 * updatePlugin()
 * For plugin uploaded files: first delete related plugin files and then update with new plugin file
 * @param updatePlugin
 * @param uploadData
 * @param uploadConfig
 * @returns {function()}
 */
export function updatePlugin(updatePlugin) {
  return dispatch => {
    dispatch(updatePluginRequest());

    // No 'index' field in database (recalculate in cliet side), delete it for DB data update
    let updatePluginDB = _.omit(updatePlugin, 'id'); // Delete unused plugin info in client side

    return makePluginRequest('put', updatePlugin.id, updatePluginDB).then(res => {
        if (res.status === 200) {
          return dispatch(updatePluginSuccess(updatePlugin));
        }
      })
      .catch(ex => {
        return dispatch(updatePluginFailure());
      });
  };
}

/**
 * updatePluginWithUploads()
 * @param updatePlugin
 * @param uploadData
 * @param uploadConfig
 * @returns {function()}
 */
export function updatePluginWithUploads(updatePlugin, uploadData, uploadConfig) {
  return dispatch => {

    let pluginID = updatePlugin.id;
    // No 'index' field in database (recalculate in cliet side), delete it for DB data update
    let updatePluginDB = _.omit(updatePlugin, 'id');

    dispatch(updatePluginRequest());

    makeUploadRequest('put', '/pluginRepository/update', pluginID, uploadData, uploadConfig)
      .then(res => {
        if (res.status === 200) { // When old upload file is updated, change plugin info in database
          return makePluginRequest('put', pluginID, updatePluginDB).then(res => {
              if (res.status === 200) {
                return dispatch(updatePluginSuccess(updatePlugin));
              }
            })
            .catch(ex => {
              return dispatch(updatePluginFailure());
            });
        }})
      .catch(ex => {
        return dispatch(deletePluginFailure());
      });
  };
}

/**
 * deletePlguin(id)
 * @param id: used to update plugin data in database
 * @returns {function()}
 */
export function deletePlguin(id) {
  return dispatch => {
    dispatch(deletePluginRequest());

    // Delete file in mongoDB GridFS and delete plugin info in database
    makeUploadRequest('delete', '/pluginRepository/delete', id)
      .then(res => {
        if (res.status === 200) { // When upload file is deleted, then delete plugin info
          return makePluginRequest('delete', id)
            .then(res => {
              if (res.status === 200) {return dispatch(deletePluginSuccess());}})
            .catch(ex => {return dispatch(deletePluginFailure());});
        }})
      .catch(ex => {
        return dispatch(deletePluginFailure());
      });
  };
}
/**
 * downloadPluginPkg(id)
 * @param id: used to find download plugin file in database
 */
export function downloadPluginPkg(id, downloadConfig) { // USE open new download window instead
  // return dispatch => {
  //   // Delete file in mongoDB GridFS and delete plugin info in database
  //   // makeUploadRequest('get', '/pluginRepository/download', id, '', downloadConfig)
  //   axios.get('/pluginRepository/download/' + id, downloadConfig)
  //     .then(res => {
  //       if (res.status === 200) {
  //         let url = '/pluginRepository/download' + '/' + id;
  //         window.location = url;
  //         window.open(url, '_self');
  //         return dispatch(downloadPluginSuccess());
  //       }
  //     })
  //     .catch(ex => {
  //       return dispatch(downloadPluginFailure());
  //     });
  // };
}

/**
 * toggleStatus(id)
 * @param id: md5 format, used to update plugin props'isprivate' in database
 * @param index: used to update plguin data in store
 * @returns {function()}
 */
// export function toggleStatus(id, index, status) {
//   return dispatch => {
//
//     return makePluginRequest('put', id, { isprivate:status }).then(res => {
//         if (res.status === 200) {
//           return dispatch(togglePluginStatus(index, status)); // Update state in store
//         }
//       })
//       .catch(ex => {
//         return dispatch(deletePluginFailure());
//       });
//   };
// }