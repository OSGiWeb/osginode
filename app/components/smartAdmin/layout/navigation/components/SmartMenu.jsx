/**
 * Created by griga on 11/30/15.
 */

// import React, { Component, PropTypes } from 'react'
// import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';
//
// import Reflux from 'reflux'
// import _ from 'lodash'
// import {Link}  from 'react-router'
// import classnames from 'classnames'
//
// import SmartMenuList from './SmartMenuList.jsx'
//
// import NavigationStore from './../stores/NavigationStore.js'
// import NavigationActions from './../actions/NavigationActions.js'
//
// let config = window.SMARTADMIN_GLOBALS;
//
// let SmartMenu = React.createClass({
//   mixins:[Reflux.connect(NavigationStore)],
//   getInitialState: function () {
//     if(this.props.rawItems){
//       NavigationStore.initRawItems(this.props.rawItems)
//     }
//     return NavigationStore.getData()
//   },
//   render: function () {
//     return (
//       <SmartMenuList items={this.state.items} />
//     )
//   }
// });
//
// export default SmartMenu



/**
 * NEW IMPLEMENTATION
 */
import React, { Component } from 'react'
import SmartMenuList from './SmartMenuList.jsx'

class SmartMenu extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <SmartMenuList items={this.props.data.items} />
    );
  }

}

export default SmartMenu

// Also send parameter 'data' with 'data={this.props.data}' to sub components to avoid store data access,  data={this.props.data}