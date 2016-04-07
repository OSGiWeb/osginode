import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { manualLogin, toggleLoginMode, signUp } from '../actions/users';
import UiValidate from '../components/smartAdmin/forms/validation/UiValidate.jsx'
import styles from '../css/components/login';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class LoginOrRegister extends Component {
  constructor(props) {
    super(props);
    this.toggleMode = this.toggleMode.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
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
    if (!(username || username.length > 0) ||
      !(password || password.length > 0) ||
      !(passwordConfirm || passwordConfirm.length > 0)) {
      errMsg = '请输入用户名和密码';

    } else if (!(firstname || firstname.length > 0) ||
      !(lastname || lastname.length > 0)) {
      errMsg = '请输入用户姓名'
    }

    if (passwordConfirm !== password) {
      errMsg = '请确定密码一致性'
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


  toggleMode() {
    const { dispatch } = this.props;
    dispatch(toggleLoginMode());
  }

  renderHeader() {
    const { isLogin } = this.props.user;

    if (isLogin) {
      return (
        <header id="header" className="animated fadeInDown">
          <div id="logo-group">
            <span id="logo"> <img src="styles/img/logo.png" alt="SmartAdmin"/> </span>
          </div>
          <span id="extr-page-header-space">&nbsp;<a className="btn btn-danger"　onClick={this.toggleMode}>用户注册</a> </span>
        </header>
      );
    }

    return (
      <header id="header" className="animated fadeInDown">
        <div id="logo-group">
          <span id="logo"> <img src="styles/img/logo.png" alt="SmartAdmin"/> </span>
        </div>
        <span id="extr-page-header-space">&nbsp;已经注册？<a className="btn btn-danger"　onClick={this.toggleMode}>用户登录</a> </span>
      </header>
    );
  }

  renderButton() {
    const { isLogin } = this.props.user;

    if (isLogin) {
      return (
        <footer>
          <button onClick={this.onLoginSubmit}　className="btn btn-primary">
            登陆
          </button>
        </footer>
      );
    }

    return (
      <footer>
        <button onClick={this.onRegisterSubmit}　className="btn btn-primary">
          注册
        </button>
      </footer>
    );
  }

  renderForm() {
    const { isLogin, message } = this.props.user;

    if (isLogin) {
      return (
        <div className="col-xs-12 col-sm-12 col-md-5 col-lg-4">
          <div className="well no-padding">
            <UiValidate>
              <div id="login-div" className="smart-form client-form">
                <header>
                  用户登录
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
                  <p className={cx('message', { 'message-show': message && message.length > 0 })}>{message}</p>
                  <section>
                    <label className="checkbox">
                      <input type="checkbox" name="remember" defaultChecked={true}/>
                      <i/>保持登陆状态</label>
                  </section>
                </fieldset>
                {this.renderButton()}
              </div></UiValidate>
          </div>
        </div>
      );
    }

    return (
      <div className="col-xs-12 col-sm-12 col-md-5 col-lg-4">
        <div className="well no-padding">
          <div id="smart-form-register" className="smart-form client-form">
            <header>
              新用户注册
            </header>

            <fieldset>
              <section>
                <label className="input"> <i className="icon-append fa fa-user"/>
                  <input type="text" name="username" ref="username" placeholder="用户名"/>
                  <b className="tooltip tooltip-bottom-right">请输入用户名</b> </label>
              </section>

              <section>
                <label className="input"> <i className="icon-append fa fa-lock"/>
                  <input type="password" name="password" ref="password" placeholder="密码" id="password"/>
                  <b className="tooltip tooltip-bottom-right">请输入密码</b> </label>
              </section>

              <section>
                <label className="input"> <i className="icon-append fa fa-lock"/>
                  <input type="password" name="passwordConfirm" ref="passwordConfirm" placeholder="密码确认"/>
                  <b className="tooltip tooltip-bottom-right">请确认密码</b> </label>
              </section>
            </fieldset>

            <fieldset>
              <div className="row">
                <section className="col col-6">
                  <label className="input">
                    <input type="text" name="lastname" ref="lastname" placeholder="姓"/>
                  </label>
                </section>
                <section className="col col-6">
                  <label className="input">
                    <input type="text" name="firstname" ref="firstname" placeholder="名"/>
                  </label>
                </section>
              </div>

              <div className="row">
                <section className="col col-6">
                  <label className="select">
                    <select name="gender" ref="gender" defaultValue={"0"}>
                      <option value="0" disabled={true}>性别</option>
                      <option value="1">男</option>
                      <option value="2">女</option>
                    </select> <i/> </label>
                </section>
                <section className="col col-6">
                  <label className="select">
                    <select name="specialty" ref="specialty" defaultValue={"0"}>
                      <option value="0" disabled={true}>专业方向</option>
                      <option value="1">数据处理</option>
                      <option value="2">显示控制</option>
                      <option value="3">信号软件</option>
                    </select> <i/> </label>
                </section>
              </div>
              <p className={cx('message', { 'message-show': message && message.length > 0 })}>{message}</p>
            </fieldset>
            {this.renderButton()}
          </div>
        </div>
      </div>
    );
  }

  /* Main render function */
  render() {

    return (
      <div id="extr-page" >
        { this.renderHeader() }

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
              {this.renderForm()}
              <div className="col-xs-12 col-sm-12 col-md-5 col-lg-4">
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

LoginOrRegister.propTypes = {
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
export default connect(mapStateToProps)(LoginOrRegister);