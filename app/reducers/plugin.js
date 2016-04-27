/**
 * Created by Information on 2016/4/19.
 */
import {
  TOGGLE_PRIVATE_REPOSITORY_MODE,
  CREATE_PLUGIN_REQUEST,
  CREATE_PLUGIN_SUCCESS,
  CREATE_PLUGIN_FAILURE,
  GET_PLUGINS_REQUEST,
  GET_PLUGINS_SUCCESS,
  GET_PLUGINS_FAILURE,
  SHOW_NOTIFICATION_DONE,
  SET_DATATABLE_SELECTED_DATA,
  UPDATE_PLUGIN_REQUEST,
  UPDATE_PLUGIN_SUCCESS,
  UPDATE_PLUGIN_FAILURE,
  DELETE_PLUGIN_REQUEST,
  DELETE_PLUGIN_SUCCESS,
  DELETE_PLUGIN_FAILURE
} from '../constants/index';


// TODO: try to use redux middleware to make the action logic simple!
export default function plugin(
  state={
    isPrivate: true, // Is private plugins repository
    isFetched: false,
    isSelected: false, // Is row in Datatable selected
    isCreated: undefined,
    isUpdated: undefined,
    isDeleted: undefined,
    deletedIndex: '', // Indicate which row is deleted (already minus 1)
    plugins: [],
    newPlugin: [],
    selectedData: [],
    updatedPlugin:[]
  }, action={}) {
  switch (action.type) {
    case TOGGLE_PRIVATE_REPOSITORY_MODE:
      return Object.assign({}, state, {
        isPrivate: !state.isPrivate
      });

    /* Create plugin functions */
    case CREATE_PLUGIN_SUCCESS:
      return Object.assign({}, state, {
        plugins: [...state.plugins, action.data],
        newPlugin: action.data,
        isFetched: true,
        isCreated: true
      });
    case CREATE_PLUGIN_FAILURE:
      return Object.assign({}, state, {
        newPlugin: [],
        isFetched: true,
        isCreated: false
      });
    /*
     YunXu: comment out because we have already save the data in CREATE_PLUGIN_SUCCESS
     action when status code '200' returned from server. So we just dispatch actions no process in reducer.
     */
    // case CREATE_PLUGIN_REQUEST:
    //   return Object.assign({}, state, {
    //     newPlugin: ''
    //   });
    // case CREATE_PLUGIN_FAILURE:
    //   return Object.assign({}, state, {
    //     plugins: [...state.plugins.filter((tp) => tp.id !== action.id)],
    //     newPlugin: state.newPlugin
    //   });

    /* Get plugins functions */
    case GET_PLUGINS_REQUEST:
      return Object.assign({}, state, {
        isFetched: false
      });
    case GET_PLUGINS_SUCCESS:
      return Object.assign({}, state, {
        plugins: action.data,
        isFetched: true
      });
    case GET_PLUGINS_FAILURE:
      return Object.assign({}, state, {
        isFetched: false
      });

    /* Update plugin functions */
    case UPDATE_PLUGIN_SUCCESS:
      return Object.assign({}, state, {
        plugins: [
          ...state.plugins.slice(0, action.index),
          Object.assign({}, state.plugins[action.index], action.data),
          ...state.plugins.slice(action.index + 1)
        ],
        updatedPlugin: action.data,
        isUpdated: true
      });
    case UPDATE_PLUGIN_FAILURE:
      return Object.assign({}, state, {
        updatedPlugin: [],
        isUpdated: false
      });

    /* Delete plugin functions */
    case DELETE_PLUGIN_SUCCESS:
      return Object.assign({}, state, {
        plugins: [...state.plugins.filter((tp, i) => i !== action.index)],
        deletedIndex: action.index,
        isDeleted: true,
        isSelected: false // must set 'isSelected' to false to avoid reading false data on edit plugin modal
      });
    case DELETE_PLUGIN_FAILURE:
      return Object.assign({}, state, {
        isDeleted: false,
        isSelected: false
      });

    /* Plugin datatable operation functions */
    // Show operation success/failure notification and set some state to default*IMPORTANT!*
    case SHOW_NOTIFICATION_DONE:
      return Object.assign({}, state, {
        newPlugin: [],
        updatedPlugin: [],
        isCreated: undefined,
        isUpdated: undefined,
        isDeleted: undefined
      });
    case SET_DATATABLE_SELECTED_DATA:
      return Object.assign({}, state, {
        selectedData: action.data,
        isSelected: action.isSelected
      });

    default:
      return state;
  }
}