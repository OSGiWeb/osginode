/**
 * Created by Information on 2016/3/28.
 */
import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'
import History from './components/smartAdmin/layout/navigation/classes/History.js';
import routes from './routes.jsx';


import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);


var rootInstance = render((
  <Provider store={store}>
    <Router history={History}>
      {routes}
    </Router>
  </Provider>
), document.getElementById('app'));


// import React from 'react';
// import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import { Router, browserHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
// import createRoutes from './routes.jsx';
// import configureStore from 'store/configureStore';
//
//
// // Grab the state from a global injected into
// // server-generated HTML
// const initialState = window.__INITIAL_STATE__;
//
// const store = configureStore(initialState, browserHistory);
// const history = syncHistoryWithStore(browserHistory, store);
// const routes = createRoutes(store);
//
// // Router converts <Route> element hierarchy to a route config:
// // Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
// render(
//   <Provider store={store}>
//     <Router history={history}>
//       {routes}
//     </Router>
//   </Provider>,
//   document.getElementById('app')
// );



// if (module.hot) {
//   require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
//     getRootInstances: function () {
//       // Help React Hot Loader figure out the root component instances on the page:
//       return [rootInstance];
//     }
//   });
// }