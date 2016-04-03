import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
// import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { signUp, signUpError } from '../actions/users';
// import React from 'react'

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
    const { dispatch } = this.props;
    const username = ReactDOM.findDOMNode(this.refs.username).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    const passwordConfirm = ReactDOM.findDOMNode(this.refs.passwordConfirm).value;

    const firstname = ReactDOM.findDOMNode(this.refs.firstname).value;
    const lastname = ReactDOM.findDOMNode(this.refs.lastname).value;
    const gender = ReactDOM.findDOMNode(this.refs.gender).value;
    const specialty = ReactDOM.findDOMNode(this.refs.specialty).value;

    if (passwordConfirm !== password)
      dispatch(signUpError('请确定密码一致性！'));

    dispatch(signUp({
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      specialty: specialty
    }));
  }

  render() {
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

              <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                <div className="well no-padding">
                  <form action="#/home" id="smart-form-register" className="smart-form client-form">
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
                    </fieldset>
                    <footer>
                      <button type="submit" onClick={this.onRegisterSubmit} className="btn btn-primary">
                        注册
                      </button>
                    </footer>

                    <div className="message">
                      <i className="fa fa-check"/>
                      <p>
                        Thank you for your registration!
                      </p>
                    </div>
                  </form>
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