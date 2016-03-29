import React from 'react'

let Register = React.createClass({
  render: function () {
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
                  <form action="#/dashboard" id="smart-form-register" className="smart-form client-form">
                    <header>
                     新用户注册
                    </header>

                    <fieldset>
                      <section>
                        <label className="input"> <i className="icon-append fa fa-user"/>
                          <input type="text" name="username" placeholder="用户名"/>
                          <b className="tooltip tooltip-bottom-right">请输入用户名</b> </label>
                      </section>

                      <section>
                        <label className="input"> <i className="icon-append fa fa-lock"/>
                          <input type="password" name="password" placeholder="密码" id="password"/>
                          <b className="tooltip tooltip-bottom-right">请输入密码</b> </label>
                      </section>

                      <section>
                        <label className="input"> <i className="icon-append fa fa-lock"/>
                          <input type="password" name="passwordConfirm" placeholder="密码确认"/>
                          <b className="tooltip tooltip-bottom-right">请确认密码</b> </label>
                      </section>
                    </fieldset>

                    <fieldset>
                      <div className="row">
                        <section className="col col-6">
                          <label className="input">
                            <input type="text" name="firstname" placeholder="姓"/>
                          </label>
                        </section>
                        <section className="col col-6">
                          <label className="input">
                            <input type="text" name="lastname" placeholder="名"/>
                          </label>
                        </section>
                      </div>

                      <div className="row">
                        <section className="col col-6">
                          <label className="select">
                            <select name="gender" defaultValue={"0"}>
                              <option value="0" disabled={true}>性别</option>
                              <option value="1">男</option>
                              <option value="2">女</option>
                            </select> <i/> </label>
                        </section>
                        <section className="col col-6">
                          <label className="select">
                            <select name="gender" defaultValue={"0"}>
                              <option value="0" disabled={true}>专业方向</option>
                              <option value="1">数据处理</option>
                              <option value="2">显示控制</option>
                              <option value="3">信号软件</option>
                            </select> <i/> </label>
                        </section>
                      </div>
                    </fieldset>
                    <footer>
                      <button type="submit" className="btn btn-primary">
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
});

export default Register