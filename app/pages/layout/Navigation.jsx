/**
 * Created by griga on 11/24/15.
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { initRawItems, setActiveNavigationItem, toggleMenuItemOpenClose } from '../../actions/navigations'; // TODO: change path
import SmartMenuList from '../../components/smartAdmin/layout/navigation/components/SmartMenuList.jsx'
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
    // Event handlers for SmartMenu component
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.onMenuItemOpen = this.onMenuItemOpen.bind(this);
    this.onMenuItemClose = this.onMenuItemClose.bind(this);
    
    // Initialize raw item to MenuItem structure format
    this.initialize();
  }

  initialize() {
    const { dispatch } = this.props;
    if(rawItems){
      dispatch(initRawItems(rawItems.items));
    }
  }

  /*
   Event handlers for SmartMenu component
   */
  onMenuItemClick(item) {
    const { dispatch } = this.props;
    dispatch(setActiveNavigationItem(item));
  }

  onMenuItemOpen(item) {
    const { dispatch } = this.props;
    dispatch(toggleMenuItemOpenClose(item, true));
  }

  onMenuItemClose(item) {
    const { dispatch } = this.props;
    dispatch(toggleMenuItemOpenClose(item, false));
  }

  render() {
    const { data } = this.props.navigation;
    const { userFullname } = this.props.user;
    
    return (
      <aside id="left-panel">
        <LoginInfo userFullname={userFullname}/>
        <nav>
          <SmartMenuList data={data} items={data.items}
                     onMenuItemClick={this.onMenuItemClick}
                     onMenuItemOpen={this.onMenuItemOpen}
                     onMenuItemClose={this.onMenuItemClose}
          />
        </nav>
        <MinifyMenu />
      </aside>
    )
  }
}

Navigation.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object,
  dispatch: PropTypes.func
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    user: state.user,
    navigation: state.navigation
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(Navigation);
