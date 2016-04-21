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
  GET_PLUGINS_FAILURE
} from '../constants/index';

export default function plugin(
  state={
    isPrivate: true, // Is private plugins repository
    plugins: [],
    newPlugin:''
  }, action={}) {
  switch (action.type) {
    case TOGGLE_PRIVATE_REPOSITORY_MODE:
      return Object.assign({}, state, {
        isPrivate: !state.isPrivate
      });
    case CREATE_PLUGIN_REQUEST:
      return Object.assign({}, state, {
        plugins: [...state.plugins, action.data], //id: action.id, count: action.count, text: action.text
        newPlugin: ''
      });
    case CREATE_PLUGIN_FAILURE:
      return Object.assign({}, state, {
        plugins: [...state.plugins.filter((tp) => tp.id !== action.id)],
        newPlugin: state.newPlugin
      });

    case GET_PLUGINS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_PLUGINS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        plugins: action.data
      });
    case GET_PLUGINS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}