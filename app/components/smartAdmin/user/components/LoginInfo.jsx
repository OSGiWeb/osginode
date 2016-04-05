import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import UserStore from '../stores/UserStore'
import ToggleShortcut from './ToggleShortcut.jsx'


// let LoginInfo = React.createClass({
//   getInitialState: function () {
//     return {}
//   },
//   componentWillMount: function () {
//     UserStore.listen(function (data) {
//       this.setState(data)
//     }.bind(this))
//   },
//   render: function(){
//     return (
//
//       <div className="login-info">
// 			    <span>
// 			        <ToggleShortcut>
//                 <img src={this.state.picture} alt="me"
//                      className="online" /><span>{ this.state.username }</span><i className="fa fa-angle-down" />
//               </ToggleShortcut>
// 			     </span>
//       </div>
//     )
//   }
// });

class LoginInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userFullname } = this.props.user;

    return (
      <div className="login-info">
			    <span>
			        <ToggleShortcut>
                <img src="styles/img/avatars/3.png" alt="me"
                     className="online" /><span>{userFullname}</span><i className="fa fa-angle-down" />
              </ToggleShortcut>
			     </span>
      </div>
    )
  }
}

LoginInfo.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(LoginInfo);