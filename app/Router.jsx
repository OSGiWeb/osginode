/**
 * Created by Information on 2016/3/28.
 */
// import React from 'react'
// import {render} from 'react-dom'
// import {Router, browserHistory} from 'react-router'
// import History from './components/smartAdmin/layout/navigation/classes/History.js';
// import routes from './routes.jsx';
//
// // Add redux store to React UIs
// import { Provider } from 'react-redux';
// import configureStore from 'store/configureStore';
// import { syncHistoryWithStore } from 'react-router-redux';
// const initialState = window.__INITIAL_STATE__;
// const store = configureStore(initialState, browserHistory);
// const history = syncHistoryWithStore(browserHistory, store);
//
// var rootInstance = render((
//   <Provider store={store}>
//     <Router history={History}>
//       {routes}
//     </Router>
//   </Provider>
// ), document.getElementById('app'));


/**
 * Using user authentication with store
 * TODO: [react-router] It appears you have provided a deprecated history object to `<Router/>`, please use a history
 * provided by React Router with `import { browserHistory } from 'react-router'` or `import { hashHistory } from
 * 'react-router'`. If you are using a custom history please create it with `useRouterHistory`,
 * see http://tiny.cc/router-usinghistory for details.
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory  } from 'react-router';
import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from './routes.jsx';
import configureStore from 'store/configureStore';

// Used for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Using new browserHistory reference
// const initialState = window.__INITIAL_STATE__;
// const store = configureStore(initialState, browserHistory);
// const history = syncHistoryWithStore(browserHistory, store);
// const routes = createRoutes(store);

// useRouterHistory creates a composable higher-order function
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, appHistory);
const history = syncHistoryWithStore(appHistory, store);
const routes = createRoutes(store);


/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
  // Prevent duplicate fetches when first loaded.
  // Explanation: On server-side render, we already have __INITIAL_STATE__
  // So when the client side onUpdate kicks in, we do not need to fetch twice.
  // We set it to null so that every subsequent client-side navigation will
  // still trigger a fetch data.
  // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
  // if (window.__INITIAL_STATE__ !== null) {
  //   window.__INITIAL_STATE__ = null;
  //   return;
  // }

  // const { components, params } = this.state;

  // preRenderMiddleware(store.dispatch, components, params);

  
}

// Router converts <Route> element hierarchy to a route config:
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
var rootInstance = render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);

// if (module.hot) {
//   require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
//     getRootInstances: function () {
//       // Help React Hot Loader figure out the root component instances on the page:
//       return [rootInstance];
//     }
//   });
// }