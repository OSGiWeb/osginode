import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { manualLogin } from '../actions/users';
import UiValidate from '../components/smartAdmin/forms/validation/UiValidate.jsx'

class Login extends Component {
  constructor(props) {
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  onLoginSubmit() {
    const { dispatch } = this.props;
    const username = ReactDOM.findDOMNode(this.refs.username).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    dispatch(manualLogin({
      username: username,
      password: password
    }));
  }

  render() {
    return (
      <div id="extr-page" >
        <header id="header" className="animated fadeInDown">

          <div id="logo-group">
            <span id="logo"> <img src="styles/img/logo.png" alt="SmartAdmin"/> </span>
          </div>

          <span id="extr-page-header-space">&nbsp;<a href="#/register" className="btn btn-danger">用户注册</a> </span>

        </header>
        <div id="main" role="main" className="animated fadeInDown">

          <div id="content" className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-7 col-lg-8 hidden-xs hidden-sm">
                <h1 className="txt-color-red login-header-big">SmartAdmin</h1>

                <div className="hero">
                  <div className="pull-left login-desc-box-l">
                    <h4 className="paragraph-header">It's Okay to be Smart. Experience the simplicity of SmartAdmin,
                      everywhere you go!</h4>
                  </div>
                  <img src="styles/img/demo/iphoneview.png" className="pull-right display-image" alt="" style={{width:'210px'}}/>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <h5 className="about-heading">About SmartAdmin - Are you up to date?</h5>

                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                      laudantium, totam rem aperiam, eaque ipsa.
                    </p>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <h5 className="about-heading">Not just your average template!</h5>

                    <p>
                      Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta
                      nobis est eligendi voluptatem accusantium!
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-5 col-lg-4">
                <div className="well no-padding">
                  <UiValidate>
                    <form action="#/home" id="login-form" className="smart-form client-form">
                      <header>
                        Sign In
                      </header>
                      <fieldset>
                        <section>
                          <label className="label">用户名</label>
                          <label className="input"> <i className="icon-append fa fa-user"/>
                            <input type="email" name="username" ref="username" data-smart-validate-input="" data-required="" data-email="" data-message-required="Please enter your email address" data-message-email="Please enter a VALID email address"/>
                            <b className="tooltip tooltip-top-right"><i className="fa fa-user txt-color-teal"/>
                              请输入用户名</b></label>
                        </section>
                        <section>
                          <label className="label">密码</label>
                          <label className="input"> <i className="icon-append fa fa-lock"/>
                            <input type="password" name="password" ref="password" data-smart-validate-input="" data-required="" data-minlength="3" data-maxnlength="20" data-message="Please enter your email password"/>
                            <b className="tooltip tooltip-top-right"><i className="fa fa-lock txt-color-teal"/> 请输入密码</b> </label>

                          <div className="note">
                            <a ui-sref="forgotPassword">忘记密码？</a>
                          </div>
                        </section>
                        <section>
                          <label className="checkbox">
                            <input type="checkbox" name="remember" defaultChecked={true}/>
                            <i/>保持登陆状态</label>
                        </section>
                      </fieldset>
                      <footer>
                        <button type="submit" onClick={this.onLoginSubmit}　className="btn btn-primary">
                          登陆
                        </button>
                      </footer>
                    </form></UiValidate>
                </div>
                <h5 className="text-center"> - Or sign in using -</h5>
                <ul className="list-inline text-center">
                  <li>
                    <a href-void="" className="btn btn-primary btn-circle"><i className="fa fa-facebook"/></a>
                  </li>
                  <li>
                    <a href-void="" className="btn btn-info btn-circle"><i className="fa fa-twitter"/></a>
                  </li>
                  <li>
                    <a href-void="" className="btn btn-warning btn-circle"><i className="fa fa-linkedin"/></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

Login.propTypes = {
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
export default connect(mapStateToProps)(Login);

// let Login = React.createClass({
//   render: function () {
//
//   }
// });
//
// export default Login