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
import { Router, browserHistory, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from './routes.jsx';
import configureStore from 'store/configureStore';
import History from './components/smartAdmin/layout/navigation/classes/History.js';


// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, History);

// const authenticated = false;
// const store = configureStore({
//   user: {
//     authenticated: authenticated,
//     isWaiting: false,
//     message: '',
//     isLogin: true
//   }
// }, History);
const history = syncHistoryWithStore(History, store);
const routes = createRoutes(store);

// const history = createMemoryHistory();
// const authenticated = true;
// const store = configureStore({
//   user: {
//     authenticated: authenticated,
//     isWaiting: false,
//     message: '',
//     isLogin: true
//   }
// }, history);

// Router converts <Route> element hierarchy to a route config:
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
render(
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