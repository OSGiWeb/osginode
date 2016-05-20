import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import JarvisWidget from '../components/smartAdmin/layout/widgets/JarvisWidget.jsx'
import UiValidate from '../components/smartAdmin/forms/validation/UiValidate.jsx'
import Wizard from '../components/smartAdmin/forms/wizards/Wizard.jsx'
import countries from '../components/smartAdmin/forms/commons/countries'

import { setRepoWizardExpand } from '../actions/processes'
import { updatePlugin } from '../actions/plugins'

let validateOptions = {
  highlight: function (element) {
    $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
  },
  unhighlight: function (element) {
    $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
  },
  errorElement: 'span',
  errorClass: 'help-block'
};

/**
 * Styles for React component
 */
var styles = {
  // page: {
  //   paddingBottom: 300,
  // },
  // default: {
  //   height: 26,
  //   borderWidth: 0.5,
  //   borderColor: '#0f0f0f',
  //   flex: 1,
  //   fontSize: 13,
  //   padding: 4,
  // },
  // multiline: {
  //   borderWidth: 0.5,
  //   borderColor: '#0f0f0f',
  //   flex: 1,
  //   fontSize: 13,
  //   height: 50,
  //   padding: 4,
  //   marginBottom: 4,
  // },
  // multilineWithFontStyles: {
  //   color: 'blue',
  //   fontWeight: 'bold',
  //   fontSize: 18,
  //   fontFamily: 'Cochin',
  //   height: 60,
  // },
  // multilineChild: {
  //   width: 50,
  //   height: 40,
  //   position: 'absolute',
  //   right: 5,
  //   backgroundColor: 'red',
  // },
  // eventLabel: {
  //   margin: 3,
  //   fontSize: 12,
  // },
  // labelContainer: {
  //   flexDirection: 'row',
  //   marginVertical: 2,
  //   flex: 1,
  // },
  // label: {
  //   width: 115,
  //   alignItems: 'flex-end',
  //   marginRight: 10,
  //   paddingTop: 2,
  // },
  // rewriteContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // remainder: {
  //   textAlign: 'right',
  //   width: 24,
  // },
  legendFont: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 15
  },
}


// TODO: use store to make params transfer bw. PrivateRepository and RepositoryChangeWizard
class RepositoryChangeWizard extends Component {
  constructor(props) {
    super(props);

    // Function called from events (e.g. 'click', 'submit'...) must be bound to 'this' class,
    // Otherwise fields in 'this.props' is NOT avaiable
    this.onWizardComplete = this.onWizardComplete.bind(this);
    this.onWizardFormClose = this.onWizardFormClose.bind(this);
    this.onTextInputFoucused = this.onTextInputFoucused.bind(this);
    this.onTextInputBlured = this.onTextInputBlured.bind(this);

    // Initialize react state variables
    this.state = {
      installmanualStyle: {
        textAlign:'center',
        // fontSize:20,
        // fontWeight:'bold'
      },
      compilemanualStyle: {
        textAlign:'center',
        // fontSize:20,
        // fontWeight:'bold'
      }
    };
  }

  componentDidMount() {

  }

  // Deconstructor
  componentWillUnmount() {
  }

  onWizardComplete(data){
    console.log('wizard submit stuff', data);

    const { dispatch } = this.props;
    const { selectedData } = this.props.plugin;

    // Private/Public control
    selectedData.isprivate = !selectedData.isprivate;
    selectedData.statusIcon = selectedData.isprivate ? "<span class='label label-danger'>私有</span>" :
      "<span class='label label-success'>公共</span>";

    // When the private->public of repo filled completed, close the form
    dispatch(setRepoWizardExpand(false));

    // Dispatch update plugin action
    dispatch(updatePlugin(selectedData));
  }

  onWizardFormClose() {
    const { dispatch } = this.props;
    // Close wizard form
    dispatch(setRepoWizardExpand(false));

  }

  onTextInputFoucused(e) {
    const { name } = e.currentTarget;

    if(name === 'installmanual') {
      this.setState({
        installmanualStyle: {
          textAlign:'left'
        }});
    } else if (name === 'compilemanual') {
      this.setState({
        compilemanualStyle: {
          textAlign:'left'
        }});
    }
  }

  onTextInputBlured(e) {
    const { name } = e.currentTarget;

    if(name === 'installmanual') {
      this.setState({
        installmanualStyle: {
          textAlign:'left',
          color: 'green'
        }});
    } else if (name === 'compilemanual') {
      this.setState({
        compilemanualStyle: {
          textAlign:'left',
          color: 'green'
        }});
    }
  }

  render() {

    const { isRepoWizardExpand } = this.props.process;

    if (isRepoWizardExpand === true) {
      return (
        <JarvisWidget togglebutton={false} sortable={false} colorbutton={false} editbutton={false} deletebutton={false}
                      fullscreenbutton={false} deletebutton={false} editbutton={false} collapsed={false} color="green">
          <header>
            <span className="widget-icon"> <i className="fa fa-cloud-upload"/> </span>
            <h2> 插件提交流程 </h2>
            <div className="widget-toolbar">
              <i className="fa fa-lg fa-times" onClick={this.onWizardFormClose}/>
            </div>
          </header>
          {/* widget div*/}
          <div>
            {/* widget content */}
            <div className="widget-body">

              <div className="row">
                <UiValidate options={validateOptions}>
                  <form noValidate="novalidate">
                    <Wizard className="col-sm-12"
                            onComplete={this.onWizardComplete}>
                      <div className="form-bootstrapWizard clearfix">
                        <ul className="bootstrapWizard">
                          <li data-smart-wizard-tab="1">
                            <a href="#"> <span className="step">1</span> <span
                              className="title">基本信息</span>
                            </a>
                          </li>
                          <li data-smart-wizard-tab="2">
                            <a href="#"> <span className="step">2</span> <span
                              className="title">版本管理</span> </a>
                          </li>
                          <li data-smart-wizard-tab="3">
                            <a href="#"> <span className="step">3</span> <span
                              className="title">附件上传</span> </a>
                          </li>
                          <li data-smart-wizard-tab="4">
                            <a href="#"> <span className="step">4</span> <span
                              className="title">保存表单</span> </a>
                          </li>
                        </ul>
                      </div>
                      <div className="tab-content">
                        <div className="tab-pane" data-smart-wizard-pane="1">
                          <br/>

                          <h3><strong> 步骤 1 </strong> - 基本信息 </h3>

                          <div className="row">
                            <div className="col-sm-12">
                              <fieldset>
                                <legend style={styles.legendFont}> 插件介绍 </legend>
                                <div className="form-group">
                                  <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-info fa-fw"/></span>
                                  <textarea rows="1" className="form-control"
                                            placeholder="请简短介绍该插件的功能" type="text" name="pluginintrod"
                                            data-smart-validate-input="" data-required=""
                                            data-message="请填写提交插件介绍信息"/>
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-6">
                              <fieldset>
                                <legend style={styles.legendFont}> 安装指南 </legend>
                                <div className="form-group">
                                  <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-gavel fa-fw"/></span>
                                  <textarea rows="6" className="form-control" style={ this.state.installmanualStyle }
                                            placeholder="请输入插件安装步骤" type="text" name="installmanual"
                                            data-smart-validate-input="" data-required=""
                                            data-message="请填写提交插件安装指南信息"
                                            onFocus={this.onTextInputFoucused} onBlur={this.onTextInputBlured}/>
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                            <div className="col-sm-6">
                              <fieldset>
                                <legend style={styles.legendFont}> 编译指南 </legend>
                                <div className="form-group">
                                  <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-tasks fa-fw"/></span>
                                  <textarea rows="6" className="form-control" style={ this.state.compilemanualStyle }
                                            placeholder="请输入插件编译和集成方法" type="text" name="compilemanual"
                                            data-smart-validate-input="" data-required=""
                                            data-message="请填写提交插件编译指南信息"
                                            onFocus={this.onTextInputFoucused} onBlur={this.onTextInputBlured}/>
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                          </div>

                        </div>
                        <div className="tab-pane" data-smart-wizard-pane="2">
                          <br/>

                          <h3><strong> 步骤 2 </strong> - 版本管理 </h3>

                          <div className="row">
                            <div className="col-sm-4">
                              <div className="form-group">
                                <div className="input-group">
                                                                <span className="input-group-addon"><i
                                                                  className="fa fa-flag fa-lg fa-fw"/></span>
                                  <select name="country" data-smart-validate-input=""
                                          data-required=""
                                          className="form-control input-lg">

                                    {countries.map(function(country){
                                      return <option value={country.key} key={country.key}>{country.value}</option>
                                    })}

                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div className="form-group">
                                <div className="input-group">
                                  <span className="input-group-addon"><i className="fa fa-map-marker fa-lg fa-fw"/></span>
                                  <select className="form-control input-lg"
                                          data-smart-validate-input="" data-required=""
                                          name="city">
                                    <option value="" >Select City
                                    </option>
                                    <option>Amsterdam</option>
                                    <option>Atlanta</option>
                                    <option>Baltimore</option>
                                    <option>Boston</option>
                                    <option>Buenos Aires</option>
                                    <option>Calgary</option>
                                    <option>Chicago</option>
                                    <option>Denver</option>
                                    <option>Dubai</option>
                                    <option>Frankfurt</option>
                                    <option>Hong Kong</option>
                                    <option>Honolulu</option>
                                    <option>Houston</option>
                                    <option>Kuala Lumpur</option>
                                    <option>London</option>
                                    <option>Los Angeles</option>
                                    <option>Melbourne</option>
                                    <option>Mexico City</option>
                                    <option>Miami</option>
                                    <option>Minneapolis</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div className="form-group">
                                <div className="input-group">
                                                                <span className="input-group-addon"><i
                                                                  className="fa fa-envelope-o fa-lg fa-fw"/></span>
                                  <input className="form-control input-lg"
                                         placeholder="Postal Code" type="text"
                                         name="postal" data-smart-validate-input=""
                                         data-required="" data-minlength="4"
                                         value="London"/>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <div className="input-group">
                                                                <span className="input-group-addon"><i
                                                                  className="fa fa-phone fa-lg fa-fw"/></span>
                                  <input className="form-control input-lg"
                                         data-smart-masked-input="+99 (999) 999-9999"
                                         data-mask-placeholder="X" placeholder="+1"
                                         type="text" name="wphone"
                                         data-smart-validate-input="" data-required=""
                                         data-minlength="10"
                                         value="13013039639"/>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <div className="input-group">
                                                                <span className="input-group-addon"><i
                                                                  className="fa fa-mobile fa-lg fa-fw"/></span>
                                  <input className="form-control input-lg"
                                         data-smart-masked-input="+99 (999) 999-9999"
                                         data-mask-placeholder="X" placeholder="+01"
                                         type="text" name="hphone"
                                         data-smart-validate-input="" data-required=""
                                         data-minlength="10"
                                         value="13013039639"/>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane" data-smart-wizard-pane="3">
                          <br/>

                          <h3><strong> 步骤 3 </strong> - 附件上传 </h3>

                          <div className="alert alert-info fade in">
                            <button className="close" data-dismiss="alert">
                              ×
                            </button>
                            <i className="fa-fw fa fa-info"/>
                            <strong>注意!</strong> 可以上传多种插件信息，包括源码、文档和链接库等
                          </div>
                          <div className="form-group">
                            <label>插件附件列表</label>
                            <input className="form-control input-lg"
                                   placeholder="上传插件信息" type="text"
                                   name="etc" id="etc"/>
                          </div>
                        </div>
                        <div className="tab-pane" data-smart-wizard-pane="4">
                          <br/>

                          <h3><strong> 步骤 4 </strong> - 保存表单 </h3>
                          <br/>

                          <h1 className="text-center text-success"><strong><i
                            className="fa fa-check fa-lg"/> 完成！</strong></h1>
                          <h4 className="text-center"> 点击 “下一步” 提交插件 </h4>
                          <br/>
                          <br/>
                        </div>

                        <div className="form-actions">
                          <div className="row">
                            <div className="col-sm-12">
                              <ul className="pager wizard no-margin">
                                <li className="previous" data-smart-wizard-prev="">
                                  <a href="#" className="btn btn-sm btn-default">
                                    上一步 </a>
                                </li>
                                <li className="next" data-smart-wizard-next="">
                                  <a href="#" className="btn btn-sm txt-color-darken">
                                    下一步 </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                      </div>
                    </Wizard>
                  </form>
                </UiValidate>
              </div>

            </div>
            {/* end widget content */}
          </div>
          {/* end widget div */}
        </JarvisWidget>
      )
    }

    return (
      <div className="row">

      </div>
    )
  }
}

RepositoryChangeWizard.propTypes = {
  process: PropTypes.object,
  plugin: PropTypes.object,
  dispatch: PropTypes.func
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    plugin: state.plugin,
    process: state.process
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(RepositoryChangeWizard);


/**
 * Backup code
 */
// <textarea rows="4" className="form-control" style={{ textAlign: this.state.textAlignment}}
//           placeholder="安装指南" type="text" name="installmanual"
//           data-smart-validate-input="" data-required=""
//           data-message="请填写提交插件安装指南信息" onFocus={this.onTextInputFoucused}/>