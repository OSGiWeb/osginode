import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { signUp } from '../actions/users';
import styles from '../css/components/login';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class Register extends Component {

  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
  }

  onRegisterSubmit() {
    var errMsg = '';
    const { dispatch } = this.props;
    const username = ReactDOM.findDOMNode(this.refs.username).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    const passwordConfirm = ReactDOM.findDOMNode(this.refs.passwordConfirm).value;

    const firstname = ReactDOM.findDOMNode(this.refs.firstname).value;
    const lastname = ReactDOM.findDOMNode(this.refs.lastname).value;
    const gender = ReactDOM.findDOMNode(this.refs.gender).value;
    const specialty = ReactDOM.findDOMNode(this.refs.specialty).value;

    // Send message to user controller and show the no validation error
    if (passwordConfirm !== password) {
      errMsg = '请确定密码一致性!'
    }

    dispatch(signUp({
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      specialty: specialty
    }, errMsg));
  }

  render() {
    const { message } = this.props.user;

    return (
      <div id="extr-page" >
        <header id="header" className="animated fadeInDown">

          <div id="logo-group">
            <span id="logo"> <img src="styles/img/logo.png" alt="SmartAdmin"/> </span>
          </div>

    <span id="extr-page-header-space">
        <span className="hidden-mobile hiddex-xs">已经注册？</span>&nbsp;<a href="#login" className="btn btn-danger">登录</a> </span>

        </header>
        <div id="main" role="main" className="animated fadeInDown">

          {/* MAIN CONTENT */}
          <div id="content" className="container">

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7 hidden-xs hidden-sm">
                <h1 className="txt-color-red login-header-big">SmartAdmin</h1>
                <div className="hero">

                  <div className="pull-left login-desc-box-l">
                    <h4 className="paragraph-header">It's Okay to be Smart. Experience the simplicity of SmartAdmin, everywhere you go!</h4>
                  </div>

                  <img src="styles/img/demo/iphoneview.png" alt="" className="pull-right display-image" style={{width:'210px'}}/>

                </div>

                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <h5 className="about-heading">About SmartAdmin - Are you up to date?</h5>
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.
                    </p>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <h5 className="about-heading">Not just your average template!</h5>
                    <p>
                      Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi voluptatem accusantium!
                    </p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* Modal */}
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title" id="myModalLabel">Terms & Conditions</h4>
              </div>
              <div className="modal-body custom-scroll terms-body">

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" id="i-agree">
                  <i className="fa fa-check"/> I Agree
                </button>

                <button type="button" className="btn btn-danger pull-left" id="print">
                  <i className="fa fa-print"/> Print
                </button>
              </div>
            </div>{/* /.modal-content */}
          </div>{/* /.modal-dialog */}
        </div>{/* /.modal */}
      </div>
    )
  }
}

// let Register = React.createClass({
//   render: function () {
//
//   }
// });
// export default Register

Register.propTypes = {
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
export default connect(mapStateToProps)(Register);