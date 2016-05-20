// import React, { Component, PropTypes } from 'react'
// import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';
//
// import SubHeader from './layout/SubHeader.jsx'
// import BigBreadcrumbs from '../components/smartAdmin/layout/navigation/components/BigBreadcrumbs.jsx'
// import JarvisWidget from '../components/smartAdmin/layout/widgets/JarvisWidget.jsx'
// import WidgetGrid from '../components/smartAdmin/layout/widgets/WidgetGrid.jsx'
// import UiValidate from '../components/smartAdmin/forms/validation/UiValidate.jsx'
// import Wizard from '../components/smartAdmin/forms/wizards/Wizard.jsx'
//
// import { setRepoWizardExpand } from '../actions/processes'
// import { updatePlugin } from '../actions/plugins'
//
// /* Material-ui components */
// import RaisedButton from 'material-ui/raised-button';
// import Dialog from 'material-ui/lib/dialog';
// import {deepOrange500} from 'material-ui/lib/styles/colors';
// import FlatButton from 'material-ui/lib/flat-button';
// import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
//
// const styles = {
//   container: {
//     textAlign: 'center',
//     paddingTop: 200,
//   }
// };
//
// const muiTheme = getMuiTheme({
//   palette: {
//     accent1Color: deepOrange500,
//   }
// });
//
//
//
//
// let validateOptions = {
//   highlight: function (element) {
//     $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
//   },
//   unhighlight: function (element) {
//     $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
//   },
//   errorElement: 'span',
//   errorClass: 'help-block'
// };
//
//
//
// // TODO: use store to make params transfer bw. PrivateRepository and RepositoryChangeWizard
// class PluginCodeGenerator extends Component {
//   constructor(props, context) {
//     super(props, context);
//     this.handleRequestClose = this.handleRequestClose.bind(this);
//     this.handleTouchTap = this.handleTouchTap.bind(this);
//
//     this.state = {
//       open: false,
//     };
//   }
//
//   handleRequestClose() {
//     this.setState({
//       open: false,
//     });
//   }
//
//   handleTouchTap() {
//     this.setState({
//       open: true,
//     });
//   }
//
//
//
//   render() {
//
//     const standardActions = (
//       <FlatButton
//         label="Okey"
//         secondary={true}
//         onTouchTap={this.handleRequestClose}
//       />
//     );
//
//     return (
//       <div id="content">
//         <div className="row">
//           <BigBreadcrumbs items={['插件开发', '插件代码生成工具']} icon="table"
//                           className="col-xs-12 col-sm-7 col-md-7 col-lg-4"/>
//
//           <MuiThemeProvider muiTheme={muiTheme}>
//             <div style={styles.container}>
//               <Dialog
//                 open={this.state.open}
//                 title="Super Secret Password"
//                 actions={standardActions}
//                 onRequestClose={this.handleRequestClose}
//               >
//                 1-2-3-4-5
//               </Dialog>
//               <h1>material-ui</h1>
//               <h2>example project</h2>
//               <RaisedButton
//                 label="Super Secret Password"
//                 primary={true}
//                 onTouchTap={this.handleTouchTap}
//               />
//             </div>
//           </MuiThemeProvider>
//         </div>
//       </div>
//     )
//   }
// }
//
// // PluginCodeGenerator.propTypes = {
// //   process: PropTypes.object,
// //   plugin: PropTypes.object,
// //   dispatch: PropTypes.func
// // };
// //
// // // Function passed in to `connect` to subscribe to Redux store updates.
// // // Any time it updates, mapStateToProps is called.
// // function mapStateToProps(state) {
// //   return {
// //     plugin: state.plugin,
// //     process: state.process
// //   };
// // }
// //
// // // Connects React component to the redux store
// // // It does not modify the component class passed to it
// // // Instead, it returns a new, connected component class, for you to use.
// // export default connect(mapStateToProps)(PluginCodeGenerator);
// export default PluginCodeGenerator;

/**
 * Backup code
 */
/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class PluginCodeGenerator extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        secondary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <Dialog
            open={this.state.open}
            title="Super Secret Password"
            actions={standardActions}
            onRequestClose={this.handleRequestClose}
          >
            1-2-3-4-5
          </Dialog>
          <h1>material-ui</h1>
          <h2>example project</h2>
          <RaisedButton
            label="Super Secret Password"
            primary={true}
            onTouchTap={this.handleTouchTap}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default PluginCodeGenerator;