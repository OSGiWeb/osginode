import React, { Component, PropTypes } from 'react'
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

// export default class LoginInfo extends Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     const { userFullname } = this.props;
//     return (
//       <div className="login-info">
// 			    <span>
// 			        <ToggleShortcut>
//                 <img src="styles/img/avatars/3.png" alt="me"
//                      className="online" /><span>{userFullname}</span><i className="fa fa-angle-down" />
//               </ToggleShortcut>
// 			     </span>
//       </div>
//     )
//   }
// }

const LoginInfo = ({ userFullname }) => {
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
};

LoginInfo.propTypes = {
  userFullname: PropTypes.string
};

export default LoginInfo;