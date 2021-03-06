import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import _ from 'lodash'
import { connect } from 'react-redux';
import JarvisWidget from '../components/smartAdmin/layout/widgets/JarvisWidget.jsx'
import UiValidate from '../components/smartAdmin/forms/validation/UiValidate.jsx'
import Wizard from '../components/smartAdmin/forms/wizards/Wizard.jsx'
import Select2 from '../components/smartAdmin/forms/inputs/Select2.jsx'

import { setRepoWizardExpand } from '../actions/processes'
import { updatePlugin, createPluginAttachments } from '../actions/plugins'

// Material-UI
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';

// React-Grid-Layout
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);


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
  legendFont: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 15
  },
}

// TODO: use store to make params transfer bw. PrivateRepository and RepositoryChangeWizard
class RepositoryChangeWizard extends Component {

  static propTypes = {
    process: PropTypes.object,
    plugin: PropTypes.object,
    dispatch: PropTypes.func
  };

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
    this.onSelectUploadFiles = this.onSelectUploadFiles.bind(this);

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
      },
      pluginList: [],
      uploadLibsName: [],
      uploadDocsName: [],
      loading: false,
      finished: false,
      stepIndex: 0,
    };

    // Initialize variables used in class
    this.dependencies = [];
    this.uploadFiles = {
      libs: [],
      docs: []
    }
  }

  componentDidMount() {
  }

  // Deconstructor
  componentWillUnmount() {
    const { dispatch } = this.props;
    // Close wizard form
    dispatch(setRepoWizardExpand(false));
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

    // Add properties for plugin plugins
    selectedData.pluginintrod = data.pluginintrod;
    selectedData.installmanual = data.installmanual;
    selectedData.compilemanual = data.compilemanual;

    // Add plugin dependencies
    selectedData.dependencies = this.dependencies;

    // Create form data to let server know the request source is from a form
    let attachments = new FormData();

    // Attach files to upload 
    _.forEach(this.uploadFiles, function (value, key) {
      _.forEach(value, function (file) {
        attachments.append(key, file);
      });
    });

    // // Start upload progress control timer
    // this.interval = setInterval(this.tick.bind(this), 500);
    // // Do upload progress calculate
    // g_uploadPercent = 0;
    // this.state.uploadProgress = 0;

    var config = { // Callback to send upload progress back from request
      // progress: function (progressEvent) {
      //   var percentCompleted = (progressEvent.loaded / progressEvent.total) * 100;
      //   g_uploadPercent = parseFloat(percentCompleted.toFixed(2));
      // }
    };

    // Update plugin with attachments
    dispatch(createPluginAttachments(selectedData, attachments, config));

    // Clear buffer for this transfer
    this.dependencies = [];
    this.uploadFiles = {
      libs: [],
      docs: []
    }
  }

  onWizardFormClose() {
    const { dispatch } = this.props;
    // Close wizard form
    dispatch(setRepoWizardExpand(false));

  }

  /* Triggered when dependencies select changed (incl. selected / unselected) */
  onDependenciesSelect(event) {
    let data = event.params.data;
    let name = _.split(data.text, ':')[0];
    let version = _.split(data.text, ':')[1];

    let plugin = {
      id: data.id,
      name: name,
      version: version
    }
    this.dependencies.push(plugin);
  }

  onDependenciesUnselect(event) {
    _.remove(this.dependencies, function (n) {
      return n.id === event.params.data.id;
    });
  }

  onSelectUploadFiles(event) {
    let filesName = [];
    let files = [];
    let len = ReactDOM.findDOMNode(this.refs.filesupload).files.length;
    let fileType = ReactDOM.findDOMNode(this.refs.uploadfiletype).value;

    // Store uploaded files name in array based on file type 
    for (let i = 0; i < len; i++) {
      // Push files name in array to display on UI 
      filesName.push(ReactDOM.findDOMNode(this.refs.filesupload).files[i].name + '; ');
      files.push(ReactDOM.findDOMNode(this.refs.filesupload).files[i]);
    }

    // Update react state and files array
    if (fileType === 'pluginlibs') { // Plugin libraries
      this.setState({ uploadLibsName: filesName });
      this.uploadFiles.libs = files;
    } else if (fileType === 'plugindocs') { // Plugin documents
      this.setState({ uploadDocsName: filesName });
      this.uploadFiles.docs = files;
    }
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

  /* Material-UI */
  handleNext = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <p>
            Select campaign settings.Campaign settings can include your budget, network, bidding
            options and adjustments, location targeting, campaign end date, and other settings that
            affect an entire campaign.
          </p>
        );
      case 1:
        return (
          <div>
            <TextField style={{ marginTop: 0 }} floatingLabelText="Ad group name" />
            <p>
              Ad group status is different than the statuses for campaigns, ads, and keywords, though the
              statuses can affect each other.Ad groups are contained within a campaign, and each campaign can
              have one or more ad groups.Within each ad group are ads, keywords, and bids.
            </p>
            <p>Something something whatever cool</p>
          </div>
        );
      case 2:
        return (
          <p>
            Try out different ad text to see what brings in the most customers, and learn how to
            enhance your ads using features like ad extensions.If you run into any problems with your
            ads, find out how to tell if they're running and how to resolve approval issues.
          </p>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = { margin: '0 16px', overflow: 'hidden' };

    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({ stepIndex: 0, finished: false });
              } }
              >
              Click here
            </a> to reset the example.
          </p>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex) }</div>
        <div style={{ marginTop: 24, marginBottom: 12 }}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{ marginRight: 12 }}
            />
          <RaisedButton
            label={stepIndex === 2 ? 'Finish' : 'Next'}
            primary={true}
            onTouchTap={this.handleNext}
            />
        </div>
      </div>
    );
  }

  render() {

    const { isRepoWizardExpand } = this.props.process;
    const { selectedData } = this.props.plugin;

    // Material-UI
    const {loading, stepIndex} = this.state;

    // Select2 options to get data from database via ajax 
    var options = {
      ajax: {
        url: '/pluginRepository',
        dataType: 'json',
        delay: 0,

        processResults: function (data, params) {
          // Initialize variables
          let plugin = {
            id: '',
            text: ''
          };
          let pluginList = [];

          // Remove private plugins, only the public plugins can be selected as depended plugin
          _.remove(data, function (n) {
            return n.isprivate === true;
          });

          // Reformat data from server to fill dependencies select box
          for (let i = 0; i < data.length; i++) {

            let isNewCategory = false;
            plugin = {
              id: data[i].id,
              text: data[i].symbolicname + ':' + data[i].version
            }

            // Initialize pluginlist 
            if (pluginList.length === 0) {
              pluginList.push({
                text: data[i].category,
                children: [plugin]
              });
            } else {
              // Check if the plugin is in same category 
              for (let j = 0; j < pluginList.length; j++) {
                if (pluginList[j].text === data[i].category) {
                  pluginList[j].children.push(plugin);
                  isNewCategory = false;
                  break;
                } else {
                  isNewCategory = true;
                }
              }

              // When the plugin is belong to new category, add it after check all element in pluginlist
              if (isNewCategory === true) {
                pluginList.push({
                  text: data[i].category,
                  children: [plugin]
                });
              }
            }
          }

          return { results: pluginList };
        },
        cache: true
      }
    }

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
                                    <textarea rows="2" className="form-control"
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
                              <legend style={styles.legendFont}> 发布插件名和版本 </legend>
                              <div className="col-sm-6">
                                <fieldset>
                                  <div className="form-group">
                                    <div className="input-group">
                                      <span className="input-group-addon"><i className="fa fa-puzzle-piece fa-fw"/></span>
                                      <input className="form-control"
                                        placeholder="发布插件版本" type="text" ref="pluginversion"
                                        data-smart-validate-input="" data-required="" readOnly={true}
                                        defaultValue={selectedData.symbolicname}/>
                                    </div>
                                  </div>
                                </fieldset>
                              </div>
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
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-12">
                              <legend style={styles.legendFont}> 插件依赖管理 </legend>
                              <div className="col-sm-12">
                                <label> 选择依赖插件 </label>
                                <Select2 multiple="multiple" style={{ width: '100%' }} options={ options }
                                  className="select2" ref="dependenciesselect"
                                  onDependenciesSelect={this.onDependenciesSelect} onDependenciesUnselect={this.onDependenciesUnselect}>
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

                          <div className="row">
                            <div className="col-sm-12">
                              <label> 已选择的附件 </label>
                                <div className="alert alert-info fade in">
                                  <i className="fa-fw fa fa-info"/>
                                  <strong> 插件库: </strong> {this.state.uploadLibsName} <br/>
                                  <i className="fa-fw fa fa-file"/>
                                  <strong> 插件文档: </strong> {this.state.uploadDocsName}
                                </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-12">
                              <div className="col-sm-6">
																	<fieldset>
																		<div className="form-group">
																			<div className="input-group">
																				<span className="input-group-addon"><i className="fa fa-file fa-fw"/></span>
																				<select className="form-control"
																					data-smart-validate-input="" data-required=""
																					ref="uploadfiletype" defaultValue={"附件类型"} data-message="请选择附件类型">
																					<option value="filetype" disabled={true}> 附件类型 </option>
                                          <option value="pluginlibs">插件库</option>
																					<option value="plugindocs">插件文档</option>
																				</select>
																			</div>
																		</div>
																	</fieldset>
																</div>
																<div className="col-sm-6">
																	<fieldset>
																		<div className="form-group">
																			<div className="input-group">
																				<span className="input-group-addon"><i className="fa fa-info fa-fw"/></span>
																				<input className="form-control"  multiple="multiple" placeholder="上传插件附件"
                                          type="file" ref="filesupload" onChange={this.onSelectUploadFiles}
                                          data-smart-validate-input="" data-required="" readOnly={true}/>
																			</div>
																		</div>
																	</fieldset>
																</div>
															</div>
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

// RepositoryChangeWizard.propTypes = {
//   process: PropTypes.object,
//   plugin: PropTypes.object,
//   dispatch: PropTypes.func
// };

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

 // var testlist = [
          //   {
          //     text: '核心插件',
          //     children: [
          //       { id: '3c', text: 'com.plugins.core:1.0.0' },
          //       { id: '2b', text: 'com.plugins.framework:1.0.0' },
          //     ]
          //   },
          //   {
          //     text: '显示插件',
          //     children: [
          //       { id: '3dd', text: 'com.plugins.Radar2D:0.0.1' },
          //       { id: '4cc', text: 'com.plugins.RadarMonitor:0.0.1' },
          //     ]
          //   }
          // ];

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

    // fetchAllPluginsFromDB() {
  //   axios.get('/pluginRepository').then(res => {
  //     if (res.status === 200) { // Only when database operation return 'SUCCESS(200)', then modify the data in store
  //       // Reformating data structure which is used to update select2 UI box
  //       var data = res.data;

  //       // Initialize variables
  //       var plugin = {
  //         id: '',
  //         text: ''
  //       };
  //       var pluginList = [];

  //       // Reformat data from server to fill dependencies select box
  //       // TODO: only public plugins can be selected!
  //       for (let i = 0; i < data.length; i++) {

  //         let isNewCategory = false;
  //         plugin = {
  //           id: data[i].id,
  //           text: data[i].symbolicname + ':' + data[i].version
  //         }

  //         // Initialize pluginlist
  //         if (pluginList.length === 0) {
  //           pluginList.push({
  //             text: data[i].category,
  //             children: [plugin]
  //           });
  //         } else {
  //           // Check if the plugin is in same category
  //           for (let j = 0; j < pluginList.length; j++) {
  //             if (pluginList[j].text === data[i].category) {
  //               pluginList[j].children.push(plugin);
  //               isNewCategory = false;
  //               break;
  //             } else {
  //               isNewCategory = true;
  //             }
  //           }

  //           // When the plugin is belong to new category, add it after check all element in pluginlist
  //           if (isNewCategory === true) {
  //             pluginList.push({
  //               text: data[i].category,
  //               children: [plugin]
  //             });
  //           }
  //         }
  //       }

  //       // Update React state
  //       this.setState({
  //         pluginList: pluginList
  //       });
  //     }
  //   })
  // }









  // <div>
  //       <ResponsiveReactGridLayout className="layout" isDraggable={false} isResizable={false}
  //         rowHeight={60}
  //         breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
  //         cols={{ lg: 12, md: 9, sm: 6, xs: 3, xxs: 1 }}
  //         >

  //         <div key="1" _grid={{ x: 0, y: 0, w: 1, h: 1 }}>
  //           <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
  //             <Stepper activeStep={stepIndex}>
  //               <Step>
  //                 <StepLabel>Select campaign settings</StepLabel>
  //               </Step>
  //               <Step>
  //                 <StepLabel>Create an ad group</StepLabel>
  //               </Step>
  //               <Step>
  //                 <StepLabel>Create an ad</StepLabel>
  //               </Step>
  //             </Stepper>
  //             <ExpandTransition loading={loading} open={true}>
  //               {this.renderContent()}
  //             </ExpandTransition>
  //           </div>
  //         </div>
  //       </ResponsiveReactGridLayout>
  //     </div>