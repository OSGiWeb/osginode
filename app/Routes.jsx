/**
 * Created by pc on 2016/3/28.
 */
import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Application from './pages/Application.jsx'
import Layout from './layout/Layout.jsx'
import Home from './pages/Home.jsx'
import LoginOrRegister from './pages/LoginOrRegister.jsx'
import PrivateRepository from './pages/PrivateRepository.jsx'
import PluginCodeGenerator from './pages/PluginCodeGenerator.jsx'

import preRenderMiddleware from './middlewares/preRenderMiddleware';

// import Register from './pages/Register.jsx'
// import LockedScreen from './pages/LockedScreen.jsx'

/**
 * Callback function handling frontend route changes.
 */
// function onUpdate() {
//   // Prevent duplicate fetches when first loaded.
//   // Explanation: On server-side render, we already have __INITIAL_STATE__
//   // So when the client side onUpdate kicks in, we do not need to fetch twice.
//   // We set it to null so that every subsequent client-side navigation will
//   // still trigger a fetch data.
//   // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
//   // if (window.__INITIAL_STATE__ !== null) {
//   //   window.__INITIAL_STATE__ = null;
//   //   return;
//   // }

//   const { components, params } = this.state;

//   preRenderMiddleware(store.dispatch, components, params);


// }

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  // Application routes: Redux store connection should be placed in bellowing components (container component / pages),
  // e.g. 'Application' as abstract / pure container, and 'LoginOrRegister', 'layout' as functional / logic container
  return (
    <Route path="/" component={Application}>
      <IndexRoute component={LoginOrRegister} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />

      <Route component={Layout} >
        {/*<IndexRoute component={PrivateRepository} />*/}
        <Route path="home" component={Home} onEnter={requireAuth} />
        <Route path="privateRepository" component={PrivateRepository} onEnter={requireAuth} />
        <Route path="publicRepository" component={Home} onEnter={requireAuth} />
        <Route path="pluginCodeGenerator" component={PluginCodeGenerator} onEnter={requireAuth} />
      </Route>
    </Route>
  );
};

// <Route path="register" component={Register}/>

/* Router strategy */
// return (
//   <Route>
//     {/* First show the login page */}
//     <Route path="/">
//       {/*<Redirect from="/" to="/login"/>*/}
//       <IndexRoute component={Login}/>
//     </Route>
//
//     {/* Home page with layout */}
//     <Route component={Layout}>
//       <Route path="home" component={Home} onEnter={requireAuth}/>
//     </Route>
//     {/*<Route path="lock" component={LockedScreen} />*/}
//     <Route path="login" component={Login}/>
//     <Route path="register" component={Register}/>
//   </Route>
// );