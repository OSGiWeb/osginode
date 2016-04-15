/**
 * Created by griga on 11/24/15.
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { initRawItems } from '../../actions/navigations'; // TODO: change path
import SmartMenu from '../../components/smartAdmin/layout/navigation/components/SmartMenu.jsx'
import MinifyMenu from '../../components/smartAdmin/layout/actions/MinifyMenu.jsx'
import LoginInfo from '../../components/smartAdmin/user/components/LoginInfo.jsx'

// Must add parameter "route" otherwise not works for SmartMenu
const rawItems = {
  "items": [
    {
      "title": "Blank",
      "icon": "fa fa-lg fa-fw fa-home",
      "route": "/home",
      "items": [
        {
          "icon": "fa fa-gear",
          "title": "App Layouts",
          "route": "/"
        },
        {
          "icon": "fa fa-picture-o",
          "title": "Prebuilt Skins",
          "route": "/home"
        }
      ]
    }
  ]
};


class Navigation extends Component {
  constructor(props) {
    super(props);
    this.initialize();
  }

  initialize() {
    const { dispatch } = this.props;
    if(rawItems){
      dispatch(initRawItems(rawItems.items));
    }
  }

  render() {
    const { data } = this.props.navigation;

    return (
      <aside id="left-panel">
        <LoginInfo />
        <nav>
          <SmartMenu data={data} />
        </nav>
        <MinifyMenu />
      </aside>
    )
  }
}

Navigation.propTypes = {
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
export default connect(mapStateToProps)(Navigation);

// let rawItems = require('../../config/menu-items.json').items;
// let Navigation = React.createClass({
//
//
//
//   render: function () {
//     const { data } = this.props.navigation;
//
//     return (
//       <aside id="left-panel">
//         <LoginInfo />
//         <nav>
//           <SmartMenu rawItems={rawItems.items} />
//         </nav>
//         <MinifyMenu />
//       </aside>
//     )
//   }
// });
// export default Navigation
