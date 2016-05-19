/**
 * Created by pc on 2016/3/28.
 */
import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Layout from './pages/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import LoginOrRegister from './pages/LoginOrRegister.jsx'
import PrivateRepository from './pages/PrivateRepository.jsx'
import PublicRepository from './pages/PublicRepository.jsx'

// import Register from './pages/Register.jsx'
// import LockedScreen from './pages/LockedScreen.jsx'

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
  // e.g. 'LoginOrRegister', 'layout'
  return (
    <Route>
      <Route path="/">
        {/*<IndexRoute component={LoginOrRegister} />*/}
        <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
        <Route component={Layout}>
          
          <IndexRoute component={PrivateRepository} />

          <Route path="home" component={Home} onEnter={requireAuth} />
          <Route path="privateRepository" component={PrivateRepository} onEnter={requireAuth} />
          <Route path="publicRepository" component={PublicRepository} onEnter={requireAuth} />
        </Route>
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