import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { manualLogin, toggleLoginMode, signUp } from '../actions/users';
import { fetchPlugins } from '../actions/plugins';
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

    // no server-side rendering, fetch all plugins info from database here in <IndexRoute>
    const {dispatch} = this.props;
    dispatch(fetchPlugins());
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
            <span> <img src="styles/img/project/glass.jpg" alt="PluginPlatform"/> </span>
          </div>
          <span id="extr-page-header-space">&nbsp;<a className="btn btn-danger"　onClick={this.toggleMode}>用户注册</a> </span>
        </header>
      );
    }

    return (
      <header id="header" className="animated fadeInDown">
        <div id="logo-group">
          <span> <img src="styles/img/project/glass.jpg" alt="PluginPlatform"/> </span>
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
                    <select name="gender" ref="gender" defaultValue={"性别"}>
                      <option value="性别" disabled={true}>性别</option>
                      <option value="男">男</option>
                      <option value="女">女</option>
                    </select> <i/> </label>
                </section>
                <section className="col col-6">
                  <label className="select">
                    <select name="specialty" ref="specialty" defaultValue={"专业方向"}>
                      <option value="专业方向" disabled={true}>专业方向</option>
                      <option value="数据处理">数据处理</option>
                      <option value="显示控制">显示控制</option>
                      <option value="信号软件">信号软件</option>
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
                <div className="well">
                  <h1 ><span className="alert-heading"><i className="fa fa-puzzle-piece"/> 一体化插件管理平台 </span>
                    <sup className="badge bg-color-red bounceIn animated"> A l p h a </sup> <br />
                    <small className="text-danger slideInRight fast animated"><strong>Exclusive to
                      PluginPlatform!</strong></small>
                  </h1>

                  <div id="myCarousel-2" className="carousel slide" data-smart-ride-carousel=""
                       data-interval="3000">
                    <ol className="carousel-indicators">
                      <li data-target="#myCarousel-2" data-slide-to="0" className="active"/>
                      <li data-target="#myCarousel-2" data-slide-to="1" className=""/>
                      <li data-target="#myCarousel-2" data-slide-to="2" className=""/>
                    </ol>
                    <div className="carousel-inner">
                      {/* Slide 1 */}
                      <div className="item active">
                        <img src="styles/img/project/m1.png" alt=""/>
                        <div className="carousel-caption caption-right">
                          <h4> </h4>
                          <p>

                          </p>
                          <br/>
                        </div>
                      </div>
                      {/* Slide 2 */}
                      <div className="item">
                        <img src="styles/img/project/m2.png" alt=""/>
                        <div className="carousel-caption caption-left">
                          <h4> </h4>
                          <p>

                          </p>
                          <br/>
                        </div>
                      </div>
                      {/* Slide 3 */}
                      <div className="item">
                        <img src="styles/img/project/m3.png" alt=""/>
                        <div className="carousel-caption">
                          <h4> </h4>
                          <br/>
                        </div>
                      </div>
                    </div>
                    <a className="left carousel-control" href="#myCarousel-2" ng-non-bindable=""
                       data-slide="prev"> <span className="glyphicon glyphicon-chevron-left"/>
                    </a>
                    <a className="right carousel-control" href="#myCarousel-2"
                       ng-non-bindable="" data-slide="next"> <span
                      className="glyphicon glyphicon-chevron-right"/> </a>
                  </div>
                  {/*End Well */}
                </div>

                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <h5 className="about-heading">一体化插件开发平台</h5>
                  <p>
                    一体化插件开发平台向您提供了规范化的 OSGi 插件框架和可复用的插件仓库，通过插件仓库来解决应用系统的持续集成、远程管理、自动更新、敏捷发布，无缝实现开发/QA/运维间无缝协作，并允许您将自定义的插件共享。
                  </p>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <h5 className="about-heading">多样化插件仓库</h5>
                  <p>
                    插件仓库提供了众多开发框架和系统服务，使您只需关注自己的商业逻辑，以“搭积木”方式来开发软件，加速应用程序的开发部署。
                  </p>
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


/**
 * Backup code
 */
// /* Main render function */
// render() {
//
//   return (
//     <div id="extr-page" >
//       { this.renderHeader() }
//
//       <div id="main" role="main" className="animated fadeInDown">
//
//         <div id="content" className="container">
//           <div className="row">
//             <div className="col-xs-12 col-sm-12 col-md-7 col-lg-8 hidden-xs hidden-sm">
//               <h1 className="txt-color-red login-header-big">SmartAdmin</h1>
//
//               <div className="hero">
//                 <div className="pull-left login-desc-box-l">
//                   <h4 className="paragraph-header">It's Okay to be Smart. Experience the simplicity of SmartAdmin,
//                     everywhere you go!</h4>
//                 </div>
//                 <img src="styles/img/demo/iphoneview.png" className="pull-right display-image" alt="" style={{width:'210px'}}/>
//               </div>
//               <div className="row">
//                 <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
//                   <h5 className="about-heading">About SmartAdmin - Are you up to date?</h5>
//
//                   <p>
//                     Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
//                     laudantium, totam rem aperiam, eaque ipsa.
//                   </p>
//                 </div>
//                 <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
//                   <h5 className="about-heading">Not just your average template!</h5>
//
//                   <p>
//                     Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta
//                     nobis est eligendi voluptatem accusantium!
//                   </p>
//                 </div>
//               </div>
//             </div>
//             {this.renderForm()}
//             <div className="col-xs-12 col-sm-12 col-md-5 col-lg-4">
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }