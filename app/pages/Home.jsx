import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import classnames from 'classnames'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import BigBreadcrumbs from '../components/smartAdmin/layout/navigation/components/BigBreadcrumbs.jsx'
import JarvisWidget from '../components/smartAdmin/layout/widgets/JarvisWidget.jsx'

import { fetchPlugins } from '../actions/plugins';

class Home extends Component {
  
  //Data that needs to be called before rendering the component
  //This is used for server side rending via the fetchComponentDataBeforeRender() method
  static need = [  // eslint-disable-line
    fetchPlugins
  ]
  
  constructor(props) {
    super(props);


  }

  componentDidMount() {

  }

  // Deconstructor
  componentWillUnmount() {
  }

  render() {
    return (
      <div id="content" className="ng-scope faster fadeInUp">
        <div className="row">
          <BigBreadcrumbs items={['主页', '插件市场']} icon="fa fa-fw fa-home"
            className="col-xs-12 col-sm-7 col-md-7 col-lg-4"/>
        </div>

        <div className="row well well-light">
          <div className="col-sm-12">
            <div>
              <h1> 核心插件 <small> 共 4 种 </small></h1> <br/>
              <div class="row">
                <div className="col-xs-12 col-sm-4 col-md-2">
                  <div className="panel panel-primary pricing-big">
                    <img src="styles/img/ribbon.png" className="ribbon" alt=""/>
                    <div className="panel-heading">
                      <h3 className="panel-title"> 框架核心 </h3>
                    </div>
                    <div className="panel-body no-padding text-align-center">
                      <div className="price-features">
                        <ul className="list-unstyled text-left">
                          <li><i className="fa fa-user"></i> <strong> 开发者： </strong> 许昀 </li>
                          <li><i className="fa fa-file-excel-o"></i> <strong> 最新版本： </strong> 1.0.0 </li>
                          <li><i className="fa fa-calendar"></i> <strong> 更新日期： </strong> 2016.06.15 </li>
                          <li><i className="fa fa-download"></i> <strong> 下载次数： </strong> 84 </li>
                          <li><i className="fa fa-star-half-full"></i> <strong> 星级： </strong>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-muted"></i>
                            <span className="fa font-sm"> (109) 评分 </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="panel-footer text-align-center">
                      <a href-void="" className="btn btn-primary btn-block" role="button" href="#"> 下载 </a>
                      <div> <a className="font-sm" href-void="" href="#"> 详情 </a>
                        或 <a className="font-sm" href-void="" href="#"> 评分 </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4 col-md-2">
                  <div className="panel panel-primary pricing-big">
                    <img src="styles/img/ribbon.png" className="ribbon" alt=""/>
                    <div className="panel-heading">
                      <h3 className="panel-title"> 框架核心 </h3>
                    </div>
                    <div className="panel-body no-padding text-align-center">
                      <div className="price-features">
                        <ul className="list-unstyled text-left">
                          <li><i className="fa fa-2x fa-user"></i> <strong> 开发者： </strong> 许昀 </li>
                          <li><i className="fa fa-2x fa-user"></i> <strong> 最新版本： </strong> 1.0.0 </li>
                          <li><i className="fa fa-2x fa-user"></i> <strong> 更新日期： </strong> 2016.06.15 </li>
                          <li><i className="fa fa-2x fa-user"></i> <strong> 下载次数： </strong> 84 </li>
                          <li><i className="fa fa-2x fa-star text-success"></i> <strong> 星级： </strong>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-muted"></i>
                            <span className="fa"> (109) Votes </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="panel-footer text-align-center">
                      <a href-void="" className="btn btn-primary btn-block" role="button" href="#"> 下载 </a>
                      <div>
                        或 <a href-void="" href="#"> 评分 </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4 col-md-2">
                  <div className="panel panel-primary pricing-big">
                    <img src="styles/img/ribbon.png" className="ribbon" alt=""/>
                    <div className="panel-heading">
                      <h3 className="panel-title"> 框架核心 </h3>
                    </div>
                    <div className="panel-body no-padding text-align-center">
                      <div className="price-features">
                        <ul className="list-unstyled text-left">
                          <li><i className="fa fa-2x fa-user"></i> <strong> 开发者： </strong> 许昀 </li>
                          <li><i className="fa fa-2x fa-user"></i> <strong> 最新版本： </strong> 1.0.0 </li>
                          <li><i className="fa fa-2x fa-user"></i> <strong> 更新日期： </strong> 2016.06.15 </li>
                          <li><i className="fa fa-2x fa-user"></i> <strong> 下载次数： </strong> 84 </li>
                          <li><i className="fa fa-2x fa-star text-success"></i> <strong> 星级： </strong>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-muted"></i>
                            <span className="fa"> (109) Votes </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="panel-footer text-align-center">
                      <a href-void="" className="btn btn-primary btn-block" role="button" href="#"> 下载 </a>
                      <div>
                        或 <a href-void="" href="#"> 评分 </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4 col-md-2">
                  <div className="panel panel-primary pricing-big">
                    <img src="styles/img/ribbon.png" className="ribbon" alt=""/>
                    <div className="panel-heading">
                      <h3 className="panel-title"> 框架核心 </h3>
                    </div>
                    <div className="panel-body no-padding text-align-center">
                      <div className="price-features">
                        <ul className="list-unstyled text-left">
                          <li><i className="fa fa-2x fa-user"></i> <strong> 开发者： </strong> 许昀 </li>
                          <li><i className="fa fa-2x fa-user"></i> <strong> 最新版本： </strong> 1.0.0 </li>
                          <li><i className="fa fa-2x fa-user"></i> <strong> 更新日期： </strong> 2016.06.15 </li>
                          <li><i className="fa fa-2x fa-user"></i> <strong> 下载次数： </strong> 84 </li>
                          <li><i className="fa fa-2x fa-star text-success"></i> <strong> 星级： </strong>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-muted"></i>
                            <span className="fa"> (109) Votes </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="panel-footer text-align-center">
                      <a href-void="" className="btn btn-primary btn-block" role="button" href="#"> 下载 </a>
                      <div>
                        或 <a href-void="" href="#"> 评分 </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4 col-md-2">
                  <div className="panel panel-primary pricing-big">
                    <img src="styles/img/ribbon.png" className="ribbon" alt=""/>
                    <div className="panel-heading">
                      <h3 className="panel-title"> 框架核心 </h3>
                    </div>
                    <div className="panel-body no-padding text-align-center">
                      <div className="price-features">
                        <ul className="list-unstyled text-left">
                          <li><i className="fa fa-2x fa-user"></i> <strong> 开发者： </strong> 许昀 </li>
                          <li><i className="fa fa-2x fa-user"></i> <strong> 最新版本： </strong> 1.0.0 </li>
                          <li><i className="fa fa-2x fa-user"></i> <strong> 更新日期： </strong> 2016.06.15 </li>
                          <li><i className="fa fa-2x fa-user"></i> <strong> 下载次数： </strong> 84 </li>
                          <li><i className="fa fa-2x fa-star text-success"></i> <strong> 星级： </strong>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-muted"></i>
                            <span className="fa"> (109) Votes </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="panel-footer text-align-center">
                      <a href-void="" className="btn btn-primary btn-block" role="button" href="#"> 下载 </a>
                      <div>
                        或 <a href-void="" href="#"> 评分 </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4 col-md-2">
                  <div className="panel panel-primary pricing-big">
                    <img src="styles/img/ribbon.png" className="ribbon" alt=""/>
                    <div className="panel-heading">
                      <h3 className="panel-title"> 框架核心 </h3>
                    </div>
                    <div className="panel-body no-padding text-align-center">
                      <div className="price-features">
                        <ul className="list-unstyled text-left">
                          <li><i className="fa fa-2x fa-user"></i> <strong> 开发者： </strong> 许昀 </li>
                          <li><i className="fa fa-2x fa-user"></i> <strong> 最新版本： </strong> 1.0.0 </li>
                          <li><i className="fa fa-2x fa-user"></i> <strong> 更新日期： </strong> 2016.06.15 </li>
                          <li><i className="fa fa-2x fa-user"></i> <strong> 下载次数： </strong> 84 </li>
                          <li><i className="fa fa-2x fa-star text-success"></i> <strong> 星级： </strong>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-primary"></i>
                            <i className="fa fa-star text-muted"></i>
                            <span className="fa"> (109) Votes </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="panel-footer text-align-center">
                      <a href-void="" className="btn btn-primary btn-block" role="button" href="#"> 下载 </a>
                      <div>
                        或 <a href-void="" href="#"> 评分 </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="row well well-light">
          <div className="col-sm-12">
            <div>
              <h1> 核心插件 <small>4 Plans</small></h1> <br/>
              <div class="row">
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <div className="panel panel-success pricing-big">
                    <div className="panel-heading">
                      <h3 className="panel-title">
                        Light version</h3>
                    </div>
                    <div className="panel-body no-padding text-align-center">
                      <div className="the-price">
                        <h1>
                          <strong>FREE</strong></h1>
                      </div>
                      <div className="price-features">
                        <ul className="list-unstyled text-left">
                          <li><i className="fa fa-check text-success"></i> <strong> to all storage locations</strong></li>
                          <li><i className="fa fa-check text-success"></i> <strong>Unlimited</strong> storage</li>
                          <li><i className="fa fa-check text-success"></i> Limited <strong> download quota</strong></li>
                          <li><i className="fa fa-check text-success"></i> <strong>Cash on Delivery</strong></li>
                          <li><i className="fa fa-check text-success"></i> All time <strong> updates</strong></li>
                          <li><i className="fa fa-times text-danger"></i> <strong>Unlimited</strong> access to
                            all files</li>
                          <li><i className="fa fa-times text-danger"></i> <strong>Allowed</strong> to be exclusing
                            per sale</li>
                        </ul>
                      </div>
                    </div>
                    <div className="panel-footer text-align-center">
                      <a href-void="" className="btn btn-primary btn-block" role="button" href="#">Download <span> now!</span></a>
                      <div>
                        Or <a href-void="" href="#">Sign up</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <div className="panel panel-teal pricing-big">
                    <div className="panel-heading">
                      <h3 className="panel-title">
                        Personal Project</h3>
                    </div>
                    <div className="panel-body no-padding text-align-center">
                      <div className="the-price">
                        <h1>
                          $99<span className="subscript">/ mo</span></h1>
                      </div>
                      <div className="price-features">
                        <ul className="list-unstyled text-left">
                          <li><i className="fa fa-check text-success"></i> 2 years access <strong> to all storage locations</strong></li>
                          <li><i className="fa fa-check text-success"></i> <strong>Unlimited</strong> storage</li>
                          <li><i className="fa fa-check text-success"></i> Superbig <strong> download quota</strong></li>
                          <li><i className="fa fa-check text-success"></i> <strong>Cash on Delivery</strong></li>
                          <li><i className="fa fa-check text-success"></i> All time <strong> updates</strong></li>
                          <li><i className="fa fa-check text-success"></i> <strong>Unlimited</strong> access to
                            all files</li>
                          <li><i className="fa fa-check text-success"></i> <strong>Allowed</strong> to be exclusing
                            per sale</li>
                        </ul>
                      </div>
                    </div>
                    <div className="panel-footer text-align-center">
                      <a href-void="" className="btn btn-primary btn-block" role="button" href="#">Purchase <span>via Paypal</span></a>
                      <div>
                        <a href-void="" href="#"><i>We accept all major credit cards</i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


      </div>
    )
  }
}

Home.propTypes = {
  plugin: PropTypes.object,
  dispatch: PropTypes.func
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    plugin: state.plugin
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(Home);