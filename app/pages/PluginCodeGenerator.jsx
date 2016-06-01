import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import SubHeader from './layout/SubHeader.jsx'
import BigBreadcrumbs from '../components/smartAdmin/layout/navigation/components/BigBreadcrumbs.jsx'
import JarvisWidget from '../components/smartAdmin/layout/widgets/JarvisWidget.jsx'
import WidgetGrid from '../components/smartAdmin/layout/widgets/WidgetGrid.jsx'
import UiValidate from '../components/smartAdmin/forms/validation/UiValidate.jsx'
import Wizard from '../components/smartAdmin/forms/wizards/Wizard.jsx'

import { generatePluginWithTemplate } from '../actions/generators'

/**
 * Styles for React component
 */
var styles = {
	legendFont: {
				color: 'blue',
				fontWeight: 'bold',
				fontSize: 15
	},
	checkBox: {
		fontSize: 15,
		width: 15,
		height: 15
	}
}

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

class PluginCodeGenerator extends Component {

	constructor(props) {
		super(props);

		// Function called from events (e.g. 'click', 'submit'...) must be bound to 'this' class,
		// Otherwise fields in 'this.props' is NOT avaiable
		this.onWizardComplete = this.onWizardComplete.bind(this);
		this.onChangePluginName = this.onChangePluginName.bind(this);

		// Initialize react state variables
    this.state = {
      pluginname: ''
    };
	}

	componentDidMount() {

	}

	// Deconstructor
	componentWillUnmount() {

	}

	onWizardComplete(data) {
		// TODO: Send data to server 

		const { dispatch } = this.props;
		dispatch(generatePluginWithTemplate(data));
		console.log('wizard submit stuff', data);


		// console.log('/<------ Compress files into zip file ------>/');
		// var JSZip = require("jszip");
		// var zip = new JSZip();
		// zip.file("Hello.txt", "Hello World\n");
		// // var img = zip.folder("images");
		// // img.file("smile.gif", imgData, { base64: true });
		// zip.generateAsync({ type: "blob" })
		// 	.then(function (content) {
		// 		// see FileSaver.js
		// 		saveAs(content, "example.zip");
		// 	});

	}

	onChangePluginName(event) {
		this.setState({
			pluginname: event.currentTarget.value
		});
	}

	render() {
		return (
			<div id="content">
				<div className="row">
					<BigBreadcrumbs items={['插件开发', '插件代码生成工具']} icon="table"
						className="col-xs-12 col-sm-7 col-md-7 col-lg-4"/>
				</div>

				<WidgetGrid>
					<JarvisWidget togglebutton={false} sortable={false} colorbutton={false} editbutton={false} deletebutton={false}
						fullscreenbutton={false} deletebutton={false} editbutton={false} collapsed={false} color="blueDark">
						<header>
							<span className="widget-icon"> <i className="fa fa-cloud-upload"/> </span>
							<h2> 插件代码生成流程 </h2>
						</header>
						{/* widget div*/}
						<div>
							{/* widget content */}
							<div className="widget-body">

								<div className="row">
									<UiValidate options={validateOptions}>
										<form noValidate="novalidate">
											<Wizard className="col-sm-12" onComplete={this.onWizardComplete}>
												<div className="form-bootstrapWizard clearfix">
													<ul className="bootstrapWizard">
														<li data-smart-wizard-tab="1">
															<a href="#"> <span className="step">1</span> <span
																className="title">基本信息</span>
															</a>
														</li>
														<li data-smart-wizard-tab="2">
															<a href="#"> <span className="step">2</span> <span
																className="title">插件依赖库配置</span> </a>
														</li>
														<li data-smart-wizard-tab="3">
															<a href="#"> <span className="step">3</span> <span
																className="title">插件下载</span> </a>
														</li>
													</ul>
												</div>

												<div className="tab-content">
													<div className="tab-pane" data-smart-wizard-pane="1">
														<br/>
														<h3><strong> 步骤 1 </strong> - 基本信息 </h3>

														<div className="row">
															<div className="col-sm-12">
																<legend style={styles.legendFont}> 插件生成设置 </legend>
																<div className="col-sm-6">
																	<fieldset>
																		<div className="form-group">
																			<div className="input-group">
																				<span className="input-group-addon"><i className="fa fa-info fa-fw"/></span>
																				<input className="form-control"
																					placeholder="插件简称" type="text" name="pluginname"
																					data-smart-validate-input="" data-required=""
																					data-message="请填写插件简称" onChange={this.onChangePluginName}/>
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
																					name="plugintype" defaultValue={"插件类型"} data-message="请选择插件类型">
																					<option defaultValue="插件类型" disabled={true}> 插件类型 </option>
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
																<legend style={styles.legendFont}> 插件信息 </legend>
																<div className="col-sm-3">
																	<fieldset>
																		<div className="form-group">
																			<div className="input-group">
																				<span className="input-group-addon"><i className="fa fa-tag fa-fw"/></span>
																				<input className="form-control"
																					placeholder="插件全称" type="text" name="pluginsymblicname"
																					data-smart-validate-input="" data-required="" readOnly={true}
																					data-message="请填写插件简称" value={'com.plugins.' + this.state.pluginname}/>
																			</div>
																		</div>
																	</fieldset>
																</div>
																<div className="col-sm-3">
																	<fieldset>
																		<div className="form-group">
																			<div className="input-group">
																				<span className="input-group-addon"><i className="fa fa-file-excel-o fa-fw"/></span>
																				<input className="form-control"
																					placeholder="插件版本" type="text" name="pluginversion"
																					data-smart-validate-input="" data-required=""
																					defaultValue="0.0.1" data-message="请填写插件版本"/>
																			</div>
																		</div>
																	</fieldset>
																</div>
																<div className="col-sm-3">
																	<fieldset>
																		<div className="form-group">
																			<div className="input-group">
																				<span className="input-group-addon"><i className="fa fa-user fa-fw"/></span>
																				<input className="form-control"
																					placeholder="插件作者" type="text" name="pluginauthor"
																					data-smart-validate-input="" data-required=""
																					defaultValue="许昀" data-message="请填写插件作者"/>
																			</div>
																		</div>
																	</fieldset>
																</div>
																<div className="col-sm-3">
																	<fieldset>
																		<div className="form-group">
																			<div className="input-group">
																				<span className="input-group-addon"><i className="fa fa-wordpress fa-fw"/></span>
																				<input className="form-control"
																					placeholder="插件网站" type="text" name="pluginwebsite"
																					data-smart-validate-input="" data-required=""
																					defaultValue="http://localhost:3000/" data-message="请填写插件网站"/>
																			</div>
																		</div>
																	</fieldset>
																</div>
																<div className="col-sm-12">
																	<fieldset>
																		<div className="form-group">
																			<div className="input-group">
																				<span className="input-group-addon"><i className="fa fa-comment fa-fw"/></span>
																				<textarea rows="2" className="form-control"
																					placeholder="插件简介" type="text" name="pluginintrod"
																					data-smart-validate-input="" data-required=""
																					defaultValue="该插件由插件模板创建" data-message="请填写插件简介"/>
																			</div>
																		</div>
																	</fieldset>
																</div>
															</div>
														</div>

													</div>
													<div className="tab-pane" data-smart-wizard-pane="2">
														<br/>

														<h3><strong> 步骤 2 </strong> - 插件依赖配置 </h3>

														<div className="row">
															<div className="col-sm-12">
																<legend style={styles.legendFont}> 插件依赖 </legend>
																<fieldset>
																	<div className="form-group">
																		<div className="col-sm-3">
																			<div className="checkbox">
																				<label style={{ fontSize: 15 }}> <input style={{ width: 15, height: 15 }}
																					type="checkbox" name="pluginframework"  defaultValue="插件框架"/> 插件框架 </label>
																			</div>
																		</div>
																		<div className="col-sm-3">
																			<div className="checkbox">
																				<label style={{ fontSize: 15 }}> <input style={{ width: 15, height: 15 }}
																					type="checkbox" name="plugincore" defaultValue="核心插件"/> 核心插件 </label>
																			</div>
																		</div>
																		<div className="col-sm-3">
																			<div className="checkbox">
																				<label style={{ fontSize: 15 }}> <input style={{ width: 15, height: 15 }}
																					type="checkbox" name="plugincomm" defaultValue="数据通信插件"/> 数据通信插件 </label>
																			</div>
																		</div>
																		<div className="col-sm-3">
																			<div className="checkbox">
																				<label style={{ fontSize: 15 }}> <input style={{ width: 15, height: 15 }}
																					type="checkbox" name="plugindatabase" defaultValue="数据库管理插件"/> 数据库管理插件 </label>
																			</div>
																		</div>
																	</div>
																</fieldset>
															</div>
														</div>

														<div className="row">
															<div className="col-sm-12">
																<legend style={styles.legendFont}> 第三方库依赖 </legend>
																<fieldset>
																	<div className="form-group">
																		<div className="col-sm-3">
																			<div className="checkbox">
																				<label style={{ fontSize: 15 }}> <input style={{ width: 15, height: 15 }}
																					type="checkbox" name="libqwt" defaultValue="QWT"/> QWT </label>
																			</div>
																		</div>
																		<div className="col-sm-3">
																			<div className="checkbox">
																				<label style={{ fontSize: 15 }}> <input style={{ width: 15, height: 15 }}
																					type="checkbox" name="libboost" defaultValue="Boost"/> Boost </label>
																			</div>
																		</div>
																		<div className="col-sm-3">
																			<div className="checkbox">
																				<label style={{ fontSize: 15 }}> <input style={{ width: 15, height: 15 }}
																					type="checkbox" name="libgdal" defaultValue="GDAL"/> GDAL </label>
																			</div>
																		</div>
																		<div className="col-sm-3">
																			<div className="checkbox">
																				<label style={{ fontSize: 15 }}> <input style={{ width: 15, height: 15 }}
																					type="checkbox" name="libopengl" defaultValue="OpenGL"/> OpenGL </label>
																			</div>
																		</div>
																	</div>

																</fieldset>
															</div>
														</div>
													</div>

													<div className="tab-pane" data-smart-wizard-pane="3">
														<br/>

														<h3><strong> 步骤 3 </strong> - 插件下载 </h3>
														<br/>

														<h1 className="text-center text-success"><strong><i
															className="fa fa-check fa-lg"/> 完成！</strong></h1>
														<h4 className="text-center"> 点击 “下一步” 下载插件 </h4>
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
				</WidgetGrid>



			</div>

				)
	}
}

PluginCodeGenerator.propTypes = {
  generators: PropTypes.object,
  dispatch: PropTypes.func
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    generators: state.generators
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(PluginCodeGenerator);


// export default PluginCodeGenerator;

		/**
		 * Backup code
		 */

		/**
		 * In this file, we create a React component which incorporates components providedby material-ui.
		 */

		// import React, { Component, PropTypes } from 'react'
		// import WidgetGrid from '../components/smartAdmin/layout/widgets/WidgetGrid.jsx'
		// import JarvisWidget from '../components/smartAdmin/layout/widgets/JarvisWidget.jsx'

		// import getMuiTheme from 'material-ui/styles/getMuiTheme';
		// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
		// import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

		// import {
		//   Step,
		//   Stepper,
		//   StepLabel,
		// } from 'material-ui/Stepper';
		// import RaisedButton from 'material-ui/RaisedButton';
		// import FlatButton from 'material-ui/FlatButton';
		// import ExpandTransition from 'material-ui/internal/ExpandTransition';
		// import TextField from 'material-ui/TextField';

		// const {Grid, Row, Col} = require('react-flexbox-grid');


		// /**
		//  * A contrived example using a transition between steps
		//  */
		// class PluginCodeGenerator extends Component {

		//   state = {
		//     loading: false,
		//     finished: false,
		//     stepIndex: 0,
		//   };

		//   dummyAsync = (cb) => {
		//     this.setState({loading: true}, () => {
		//       this.asyncTimer = setTimeout(cb, 500);
		//     });
		//   };

		//   handleNext = () => {
		//     const {stepIndex} = this.state;
		//     if (!this.state.loading) {
		//       this.dummyAsync(() => this.setState({
		//         loading: false,
		//         stepIndex: stepIndex + 1,
		//         finished: stepIndex >= 2,
		//       }));
		//     }
		//   };

		//   handlePrev = () => {
		//     const {stepIndex} = this.state;
		//     if (!this.state.loading) {
		//       this.dummyAsync(() => this.setState({
		//         loading: false,
		//         stepIndex: stepIndex - 1,
		//       }));
		//     }
		//   };

		//   getStepContent(stepIndex) {
		//     switch (stepIndex) {
		//       case 0:
		//         return (
		//           <p>
		//             Select campaign settings. Campaign settings can include your budget, network, bidding
		//             options and adjustments, location targeting, campaign end date, and other settings that
		//             affect an entire campaign.
		//           </p>
		//         );
		//       case 1:
		//         return (
		//           <div>
		//             <TextField style={{marginTop: 0}} floatingLabelText="Ad group name" />
		//             <p>
		//               Ad group status is different than the statuses for campaigns, ads, and keywords, though the
		//               statuses can affect each other. Ad groups are contained within a campaign, and each campaign can
		//               have one or more ad groups. Within each ad group are ads, keywords, and bids.
		//             </p>
		//             <p>Something something whatever cool</p>
		//           </div>
		//         );
		//       case 2:
		//         return (
		//           <p>
		//             Try out different ad text to see what brings in the most customers, and learn how to
		//             enhance your ads using features like ad extensions. If you run into any problems with your
		//             ads, find out how to tell if they're running and how to resolve approval issues.
		//           </p>
		//         );
		//       default:
		//         return 'You\'re a long way from home sonny jim!';
		//     }
		//   }

		//   renderContent() {
		//     const {finished, stepIndex} = this.state;
		//     const contentStyle = {margin: '0 16px', overflow: 'hidden'};

		//     if (finished) {
		//       return (
		//         <div style={contentStyle}>
		//           <p>
		//             <a
		//               href="#"
		//               onClick={(event) => {
		//                 event.preventDefault();
		//                 this.setState({stepIndex: 0, finished: false});
		//               }}
		//             >
		//               Click here
		//             </a> to reset the example.
		//           </p>
		//         </div>
		//       );
		//     }

		//     return (
		//       <div style={contentStyle}>
		//         <div>{this.getStepContent(stepIndex)}</div>
		//         <div style={{marginTop: 24, marginBottom: 12}}>
		//           <FlatButton
		//             label="Back"
		//             disabled={stepIndex === 0}
		//             onTouchTap={this.handlePrev}
		//             style={{marginRight: 12}}
		//           />
		//           <RaisedButton
		//             label={stepIndex === 2 ? 'Finish' : 'Next'}
		//             primary={true}
		//             onTouchTap={this.handleNext}
		//           />
		//         </div>
		//       </div>
		//     );
		//   }

		//   render() {
		//     const {loading, stepIndex} = this.state;
		//     return (
		//       <Grid>
		//         <Row>
		//           <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
		//           <Col xs={6} md={12}>

		//               <div>
		//                 <Stepper activeStep={stepIndex}>
		//                   <Step>
		//                     <StepLabel>Select campaign settings</StepLabel>
		//                   </Step>
		//                   <Step>
		//                     <StepLabel>Create an ad group</StepLabel>
		//                   </Step>
		//                   <Step>
		//                     <StepLabel>Create an ad</StepLabel>
		//                   </Step>
		//                 </Stepper>
		//                 <ExpandTransition loading={loading} open={true}>
		//                   {this.renderContent()}
		//                 </ExpandTransition>
		//               </div>
		//           </Col>
		//           </MuiThemeProvider>
		//         </Row>
		//       </Grid>
		//     );
		//   }


		//   // render() {
		//   //   const {loading, stepIndex} = this.state;
		//   //
		//   //   return (
		//   //     <div id="content">
		//   //       <WidgetGrid>
		//   //         <JarvisWidget sortable={false} colorbutton={false} togglebutton={true} editbutton={false}
		//   //                       fullscreenbutton={false} deletebutton={false} color="blueDark">
		//   //           <header>
		//   //             <span className="widget-icon"> <i className="fa fa-cloud-upload"/> </span>
		//   //             <h2> 插件提交流程 </h2>
		//   //             <div className="widget-toolbar">
		//   //               <i className="fa fa-lg fa-times" />
		//   //             </div>
		//   //           </header>
		//   //           <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
		//   //             <div>
		//   //               <Stepper activeStep={stepIndex}>
		//   //                 <Step>
		//   //                   <StepLabel>Select campaign settings</StepLabel>
		//   //                 </Step>
		//   //                 <Step>
		//   //                   <StepLabel>Create an ad group</StepLabel>
		//   //                 </Step>
		//   //                 <Step>
		//   //                   <StepLabel>Create an ad</StepLabel>
		//   //                 </Step>
		//   //               </Stepper>
		//   //               <ExpandTransition loading={loading} open={true}>
		//   //                 {this.renderContent()}
		//   //               </ExpandTransition>
		//   //             </div>
		//   //           </MuiThemeProvider>
		//   //         </JarvisWidget>
		//   //
		//   //
		//   //       </WidgetGrid>
		//   //
		//   //     </div>
		//   //   );
		//   // }


		// }

		// export default PluginCodeGenerator;