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

/**
 * NEW IMPLEMENTATION
 */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getNavigationItems } from '../../../../../actions/navigations'; // TODO: change path
import SmartMenuList from './SmartMenuList.jsx'

class SmartMenu extends Component {
  constructor(props) {
    super(props);
    // getNavigationItems();
    if(this.props.rawItems){
      // NavigationStore.initRawItems(this.props.rawItems)
    }
  }

  render() {
    const {items} = this.props.navigation;

    return(
      <SmartMenuList items={items} />
    );
  }

}


SmartMenu.propTypes = {
  navigation: PropTypes.object,
  dispatch: PropTypes.func
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    navigation: state.navigation
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(SmartMenu);




export default SmartMenu