import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import Header from './Header.jsx'
import Navigation from './Navigation.jsx'
import Ribbon from './Ribbon.jsx'

// import UserActions from '../components/smartAdmin/user/actions/UserActions.js'
require('../components/smartAdmin/layout/less/layout.less');

// Material-UI Imports
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import spacing from 'material-ui/styles/spacing';
import {darkWhite, lightWhite, grey900} from 'material-ui/styles/colors';
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';
import FullWidthSection from './FullWidthSection';

import ApplicationBar from '../components/materialDesign/layout/ApplicationBar'
import NavigationBar from '../components/materialDesign/layout/NavigationBar'

class Layout extends Component {

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    width: PropTypes.number.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object,
  };

  state = {
    navDrawerOpen: false,
  };

  constructor(props) {
    super(props);
    // UserActions.init();
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  componentWillMount() {
    // Set global font styles
    this.setState({
      muiTheme: getMuiTheme({
        fontFamily: 'Roboto, Microsoft YaHei',
      }),
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  }

  getStyles() {
    const styles = {
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0,
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400,
      },
      content: {
        margin: spacing.desktopGutter,
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
      },
      footer: {
        backgroundColor: grey900,
        textAlign: 'center',
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: lightWhite,
        maxWidth: 356,
      },
      browserstack: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: '25px 15px 0',
        padding: 0,
        color: lightWhite,
        lineHeight: '25px',
        fontSize: 12,
      },
      browserstackLogo: {
        margin: '0 3px',
      },
      iconButton: {
        color: darkWhite,
      },
    };

    if (this.props.width === MEDIUM || this.props.width === LARGE) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);
    }

    return styles;
  }

  handleChangeRequestNavDrawer = (open) => {
    this.setState({
      navDrawerOpen: open,
    });
  };

  handleChangeList = (event, value) => {
    this.context.router.push(value);
    this.setState({
      navDrawerOpen: false,
    });
  };

  render() {
    const { location, children } = this.props;
    let { navDrawerOpen } = this.state;
    const { prepareStyles } = this.state.muiTheme;

    const router = this.context.router;
    const styles = this.getStyles();

    let docked = false;
    let showMenuIconButton = true;

    const title =
      router.isActive('/home') ? 'Home' :
        router.isActive('/privateRepository') ? 'privateRepository' :
          router.isActive('/publicRepository') ? 'publicRepository' :
            router.isActive('/pluginCodeGenerator') ? 'pluginCodeGenerator' : '';

    if (this.props.width === LARGE && title !== '') {
      docked = true;
      navDrawerOpen = true;
      showMenuIconButton = false;

      styles.navDrawer = {
        zIndex: styles.appBar.zIndex - 1,
      };
      styles.root.paddingLeft = 256;
      styles.footer.paddingLeft = 256;
    }

    styles.navDrawer = {
      zIndex: styles.appBar.zIndex - 1,
    };

    const { naviContents } = this.props.navigation;

    return (
      <div>
        {/*<Header />*/}

        <ApplicationBar />
        <NavigationBar
          style={styles.navDrawer}
          location={location}
          docked={docked}
          onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
          onChangeList={this.handleChangeList}
          open={navDrawerOpen}
          />

        {/*<Navigation />*/}

        <div id="main" role="main">
          {/*<Ribbon naviContents={naviContents}/> */}
          {this.props.children}
        </div>

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
export default connect(mapStateToProps)(withWidth()(Layout));
