import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import Header from './Header.jsx'
import Navigation from './Navigation.jsx'
import Ribbon from './Ribbon.jsx'
// import Footer from './Footer.jsx'
// import Shortcut from './Shortcut.jsx'

import UserActions from '../../components/smartAdmin/user/actions/UserActions.js'

require('../../components/smartAdmin/layout/less/layout.less');
class Layout extends Component {
  constructor(props) {
    super(props);
    UserActions.init();
  }


  render() {
    const { naviContents } = this.props.navigation;

    return (
      <div>
        <Header />
        <Navigation />
        <div id="main" role="main">
          <Ribbon naviContents={naviContents}/>
          {this.props.children}
        </div>
        {/*<Footer />*/}
        {/*<Shortcut />*/}
      </div>
    )
  }
}

Layout.propTypes = {
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
export default connect(mapStateToProps)(Layout);
