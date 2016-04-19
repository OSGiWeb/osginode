import { combineReducers } from 'redux';
import user from '../reducers/user';
import navigation from '../reducers/navigation'
import plugin from '../reducers/plugin'
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  navigation,
  plugin,
  routing
});

export default rootReducer;
