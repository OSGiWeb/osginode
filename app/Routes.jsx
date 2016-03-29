/**
 * Created by pc on 2016/3/28.
 */
import React from 'react'
import {Route, Redirect, IndexRoute} from 'react-router'

import Layout from './pages/layout/Layout.jsx'

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
// import LockedScreen from './pages/LockedScreen.jsx'

const Routes = (
  <Route>
    {/* First show the login page */}
    <Route path="/">
      <Redirect from="/" to="/login"/>
      <IndexRoute component={Login}/>
    </Route>

    {/* Home page with layout */}
    <Route component={Layout}>
       <Route path="home" component={Home}/>
    </Route>
    {/*<Route path="lock" component={LockedScreen} />*/}
    <Route path="login" component={Login}/>
    <Route path="register" component={Register}/>
  </Route>);

export default Routes