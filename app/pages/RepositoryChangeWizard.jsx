import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import JarvisWidget from '../components/smartAdmin/layout/widgets/JarvisWidget.jsx'
import UiValidate from '../components/smartAdmin/forms/validation/UiValidate.jsx'
import Wizard from '../components/smartAdmin/forms/wizards/Wizard.jsx'
import Select2 from '../components/smartAdmin/forms/inputs/Select2.jsx'

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
    this.onDependenciesSelect = this.onDependenciesSelect.bind(this);
    this.onDependenciesUnselect = this.onDependenciesUnselect.bind(this);
    
   
    // Initialize react state variables
    this.state = {
      installmanualStyle: {
        textAlign: 'center',
        // fontSize:20,
        // fontWeight:'bold'
      },
      compilemanualStyle: {
        textAlign: 'center',
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

  onWizardComplete(data) {
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


  /* Triggered when dependencies select changed (incl. selected / unselected) */ 
  onDependenciesSelect(event) {
    var selectOption = event.params.data.text;
    
  }
  
  onDependenciesUnselect(event) {
    var unselectOption = event.params.data.text;
  }
  
  onTextInputFoucused(e) {
    const { name } = e.currentTarget;

    if (name === 'installmanual') {
      this.setState({
        installmanualStyle: {
          textAlign: 'left'
        }
      });
    } else if (name === 'compilemanual') {
      this.setState({
        compilemanualStyle: {
          textAlign: 'left'
        }
      });
    }
  }

  onTextInputBlured(e) {
    const { name } = e.currentTarget;

    if (name === 'installmanual') {
      this.setState({
        installmanualStyle: {
          textAlign: 'left',
          color: 'green'
        }
      });
    } else if (name === 'compilemanual') {
      this.setState({
        compilemanualStyle: {
          textAlign: 'left',
          color: 'green'
        }
      });
    }
  }

  render() {

    const { isRepoWizardExpand } = this.props.process;
    const { selectedData } = this.props.plugin;

    // TEST select2 
    var data = [
      {
        text: 'enhancement', "children": [
          { id: 1, text: 'ench_1' },
          { id: 2, text: 'ench_2' },
        ]
      },
      { id: 3, text: 'bug' },
      { id: 4, text: 'duplicate' },
      { id: 5, text: 'invalid' },
      { id: 6, text: 'wontfix' }
    ];

    if (isRepoWizardExpand === true) {
      return (
        <JarvisWidget togglebutton={false} sortable={false} colorbutton={false} editbutton={false} deletebutton={false}
          fullscreenbutton={false} deletebutton={false} editbutton={false} collapsed={false} color="green">
          <header>
            <span className="widget-icon"> <i className="fa fa-cloud-upload"/> </span>
            <h2> 插件发布流程 </h2>
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
                            <div className="col-sm-12">
                              <legend style={styles.legendFont}> 发布插件版本 </legend>
                              <div className="col-sm-6">
                                <fieldset>
                                  <div className="form-group">
                                    <div className="input-group">
                                      <span className="input-group-addon"><i className="fa fa-info fa-fw"/></span>
                                      <input className="form-control"
                                        placeholder="发布插件版本" type="text" ref="pluginversion"
                                        data-smart-validate-input="" data-required="" readOnly={true}
                                        defaultValue={selectedData.version}/>
                                    </div>
                                  </div>
                                </fieldset>
                              </div>
                              <div className="col-sm-6">
                                <fieldset>
                                  <div className="form-group">
                                    <div className="input-group">
                                      <span className="input-group-addon"><i className="fa fa-file fa-fw"/></span>
                                      <select className="form-control"
                                        data-smart-validate-input="" data-required=""
                                        ref="plugintype" defaultValue={"插件类型"} data-message="请选择插件类型">
                                        <option defaultValue="插件类型" disabled={true}> 被依赖插件 </option>
                                        <option defaultValue="核心插件">核心插件</option>
                                        <option defaultValue="显示插件">显示插件</option>
                                        <option defaultValue="通信插件">通信插件</option>
                                        <option defaultValue="辅助插件">辅助插件</option>
                                      </select>
                                    </div>
                                  </div>
                                </fieldset>
                              </div>
                            </div>
                          </div>


                          <div className="row">
                            <div className="col-sm-12">
                              <legend style={styles.legendFont}> 插件依赖管理 </legend>
                              <div className="col-sm-6">
                                <label> 选择依赖插件 </label>
                                <Select2 multiple={true} style={{ width: '100%' }}
                                  className="select2" defaultValue={["NV", "MT", "MI"]}>
                                  <optgroup label={selectedData.category}>
                                    <option value="AK">Alaska</option>
                                    <option value="HI">Hawaii</option>
                                  </optgroup>
                                  <optgroup label="Pacific Time Zone">
                                    <option value="CA">California</option>
                                    <option value="NV">Nevada</option>
                                    <option value="OR">Oregon</option>
                                    <option value="WA">Washington</option>
                                  </optgroup>
                                  <optgroup label="Mountain Time Zone">
                                    <option value="AZ">Arizona</option>
                                    <option value="CO">Colorado</option>
                                    <option value="ID">Idaho</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="UT">Utah</option>
                                    <option value="WY">Wyoming</option>
                                  </optgroup>
                                  <optgroup label="Central Time Zone">
                                    <option value="AL">Alabama</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TX">Texas</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="WI">Wisconsin</option>
                                  </optgroup>
                                  <optgroup label="Eastern Time Zone">
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="IN">Indiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="OH">Ohio</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WV">West Virginia</option>
                                  </optgroup>
                                </Select2>
                              </div>

                              <div className="col-sm-6">
                                <label> 选择依赖插件 </label>
                                <Select2 multiple={true} style={{ width: '100%' }} data={data}
                                  className="select2" ref="dependenciesselect" 
                                  onDependenciesSelect={this.onDependenciesSelect} onDependenciesUnselect={this.onDependenciesUnselect} >
                                </Select2>
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