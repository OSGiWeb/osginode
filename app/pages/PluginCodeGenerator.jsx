import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import BigBreadcrumbs from '../components/smartAdmin/layout/navigation/components/BigBreadcrumbs.jsx'
import JarvisWidget from '../components/smartAdmin/layout/widgets/JarvisWidget.jsx'
import WidgetGrid from '../components/smartAdmin/layout/widgets/WidgetGrid.jsx'
import UiValidate from '../components/smartAdmin/forms/validation/UiValidate.jsx'
import Wizard from '../components/smartAdmin/forms/wizards/Wizard.jsx'

import { generatePluginWithTemplate } from '../actions/generators'

// React-grid-layout for layout
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Material-UI
import RaisedButton from 'material-ui/RaisedButton';
import Title from 'react-title-component';
import Container from '../components/materialDesign/Container';
import IconButton from 'material-ui/IconButton';
import CodeIcon from 'material-ui/svg-icons/action/code';
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator } from 'material-ui/Toolbar';

import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import { TextField, SelectField } from 'material-ui';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

// Icons
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import Download from 'material-ui/svg-icons/file/file-download';


// Plugin types to select field
const pluginTypes = [
  <MenuItem key={1} value="核心插件" primaryText="核心插件" />,
  <MenuItem key={2} value="显示插件" primaryText="显示插件" />,
  <MenuItem key={3} value="通信插件" primaryText="通信插件" />,
  <MenuItem key={4} value="辅助插件" primaryText="辅助插件" />,
];

/**
 * Styles for React component
 */
var styles = {
	stepper: {
		// marginTop: 15
	},
	stepperLabel: {
		fontSize: 16,
	},
	subhead: {
		fontSize: 16,
		marginLeft: -10
	},
	checkbox: {
		fontSize: 15,
	},

}

// let validateOptions = {
// 	highlight: function (element) {
// 		$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
// 	},
// 	unhighlight: function (element) {
// 		$(element).closest('.form-group').removeClass('has-error').addClass('has-success');
// 	},
// 	errorElement: 'span',
// 	errorClass: 'help-block'
// };

class PluginCodeGenerator extends Component {

	static propTypes = {
    generators: PropTypes.object,
		dispatch: PropTypes.func
  };

	constructor(props) {
		super(props);

		// Function called from events (e.g. 'click', 'submit'...) must be bound to 'this' class,
		// Otherwise fields in 'this.props' is NOT avaiable
		// this.onDownloadPlugin = this.onDownloadPlugin.bind(this);
		// this.onChangePluginName = this.onChangePluginName.bind(this);
		// this.onCurruntStepChange = this.onCurruntStepChange.bind(this);

		// Initialize variables
		this.dataToServer = {};

		// Initialize react state variables
    this.state = {
      // pluginname: '',
			pluginName: '',
			pluginType: null,
			loading: false,
			finished: false,
			stepIndex: 0,
    };
	}

	componentDidMount() {

	}

	// Deconstructor
	componentWillUnmount() {

	}

	// onDownloadPlugin(data) {
	// 	// TODO: Download from server

	// 	// const { dispatch } = this.props;
	// 	// dispatch(generatePluginWithTemplate(data));
	// 	// console.log('wizard submit stuff', data);

	// 	let pluginsymblicname = ReactDOM.findDOMNode(this.refs.pluginsymblicname).value;
	// 	let url = '/pluginCodeGenerator/download/' + pluginsymblicname;
  //   window.location = url;
  //   window.open(url, '_self');

	// 	// console.log('/<------ Compress files into zip file ------>/');
	// 	// var JSZip = require("jszip");
	// 	// var zip = new JSZip();
	// 	// zip.file("Hello.txt", "Hello World\n");
	// 	// // var img = zip.folder("images");
	// 	// // img.file("smile.gif", imgData, { base64: true });
	// 	// zip.generateAsync({ type: "blob" })
	// 	// 	.then(function (content) {
	// 	// 		// see FileSaver.js
	// 	// 		saveAs(content, "example.zip");
	// 	// 	});

	// }

	// onCurruntStepChange(step) {
	// 	// this.currentStep = step;
	// 	const { dispatch } = this.props;

	// 	// Before download step, send data to server-side to generate downloadable plugin code
	// 	if (step === 3) {
	// 		dispatch(generatePluginWithTemplate({
	// 			pluginauthor: ReactDOM.findDOMNode(this.refs.pluginauthor).value,
	// 			pluginintrod: ReactDOM.findDOMNode(this.refs.pluginintrod).value,
	// 			pluginname: ReactDOM.findDOMNode(this.refs.pluginname).value,
	// 			pluginsymblicname: ReactDOM.findDOMNode(this.refs.pluginsymblicname).value,
	// 			plugintype: ReactDOM.findDOMNode(this.refs.plugintype).value,
	// 			pluginversion: ReactDOM.findDOMNode(this.refs.pluginversion).value,
	// 			pluginwebsite: ReactDOM.findDOMNode(this.refs.pluginwebsite).value,
	// 		}));
	// 	}
	// }

	// onChangePluginName(event) {
	// 	this.setState({
	// 		pluginname: event.currentTarget.value
	// 	});
	// }

	stepperDataProcess(stepIndex) {
		const { dispatch } = this.props;

		switch (stepIndex) {
			case 0:
				this.dataToServer = {
					pluginauthor: this.refs.pluginAuthor.getValue(),
					pluginintrod: this.refs.pluginDescription.getValue(),
					pluginname: this.refs.pluginName.getValue(),
					pluginsymblicname: this.refs.pluginSymblicName.getValue(),
					plugintype: this.state.pluginType,
					pluginversion: this.refs.pluginVersion.getValue(),
					pluginwebsite: this.refs.pluginWebsite.getValue(),
				}
				break;

			// Send plugin info to server in 2nd. step to prepare download file 
			case 1:
				dispatch(generatePluginWithTemplate(this.dataToServer));
				break;

			default:
				break;
		}
	}

	dummyAsync = (cb) => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
    const {stepIndex} = this.state;

    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }

		// Process data in every step 
		this.stepperDataProcess(stepIndex);
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

	 handlePluginTypeChange = (event, index, value) => {
    this.setState({ pluginType: value });
  }

	handlePluginNameChange = (event) => {
    this.setState({ pluginName: event.target.value });
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
					<ResponsiveReactGridLayout className="layout_pcg" isDraggable={false} isResizable={false}
						rowHeight={50}
						breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
						cols={{ lg: 6, md: 4, sm: 2, xs: 1, xxs: 1 }}
						>
						<div key="pcg-1" _grid={{ x: 0, y: 0, w: 1, h: 1 }}>
							<TextField
								ref="pluginName"
								onChange={this.handlePluginNameChange}
								hintText="Radar3D"
								floatingLabelText="英文名称"
								/>
						</div>

						<div key="pcg-2" _grid={{ x: 1, y: 0, w: 1, h: 1 }}>
							<TextField
								disabled={true}
								value={'com.plugins.' + this.state.pluginName}
								// onChange={this.handlePluginSymblicNameChange}
								ref="pluginSymblicName"
								hintText="com.plugins.Radar3D"
								floatingLabelText="标识"
								/>
						</div>

						<div key="pcg-3" _grid={{ x: 2, y: 0, w: 1, h: 1 }}>
							<TextField
								defaultValue="1.0.0"
								ref="pluginVersion"
								hintText="1.0.0"
								floatingLabelText="版本号"
								/>
						</div>

						<div key="pcg-4" _grid={{ x: 0, y: 1, w: 1, h: 1 }}>
							<SelectField
								ref="pluginType"
								value={this.state.pluginType}
								onChange={this.handlePluginTypeChange}
								floatingLabelText="类型"
								floatingLabelFixed={true}
								>
								{pluginTypes}
							</SelectField>
						</div>

						<div key="pcg-5" _grid={{ x: 1, y: 1, w: 1, h: 1 }}>
							<TextField
								ref="pluginAuthor"
								hintText="姓名"
								floatingLabelText="作者"
								/>
						</div>

						<div key="pcg-6" _grid={{ x: 2, y: 1, w: 1, h: 1 }}>
							<TextField
								defaultValue="http://localhost:3000/"
								ref="pluginWebsite"
								hintText="http://localhost:3000/"
								floatingLabelText="访问地址"
								/>
						</div>

						<div key="pcg-7" _grid={{ x: 0, y: 2, w: 3, h: 1 }}>
							<TextField
								ref="pluginDescription"
								fullWidth={true}
								floatingLabelText="简介"
								multiLine={true}
								rows={2}
								rowsMax={4}
								/>
						</div>
					</ResponsiveReactGridLayout>

        );
      case 1:
        return (
					<ResponsiveReactGridLayout className="layout_pcg" isDraggable={false} isResizable={false}
						rowHeight={50}
						breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
						cols={{ lg: 6, md: 4, sm: 2, xs: 1, xxs: 1 }}
						>

						<div key="pcg-9" _grid={{ x: 0, y: 0, w: 4, h: 1 }}>
							<Subheader style={styles.subhead}>插件生成设置</Subheader>
							<Divider />
						</div>

						<div key="pcg-10" _grid={{ x: 0, y: 1, w: 1, h: 1 }}>
							<Checkbox labelStyle={styles.checkbox} label="插件框架" />
						</div>

						<div key="pcg-11" _grid={{ x: 1, y: 1, w: 1, h: 1 }}>
							<Checkbox labelStyle={styles.checkbox} label="核心插件" />
						</div>

						<div key="pcg-12" _grid={{ x: 2, y: 1, w: 1, h: 1 }}>
							<Checkbox labelStyle={styles.checkbox} label="数据通信插件" />
						</div>

						<div key="pcg-13" _grid={{ x: 3, y: 1, w: 1, h: 1 }}>
							<Checkbox labelStyle={styles.checkbox} label="数据通信插件" />
						</div>

						<div key="pcg-14" _grid={{ x: 0, y: 2, w: 4, h: 1 }}>
							<Subheader style={styles.subhead}>第三方库依赖</Subheader>
							<Divider />
						</div>

						<div key="pcg-15" _grid={{ x: 0, y: 3, w: 1, h: 1 }}>
							<Checkbox labelStyle={styles.checkbox} label="QWT" />
						</div>

						<div key="pcg-16" _grid={{ x: 1, y: 3, w: 1, h: 1 }}>
							<Checkbox labelStyle={styles.checkbox} label="Boost" />
						</div>

						<div key="pcg-17" _grid={{ x: 2, y: 3, w: 1, h: 1 }}>
							<Checkbox labelStyle={styles.checkbox} label="GDAL" />
						</div>

						<div key="pcg-18" _grid={{ x: 3, y: 3, w: 1, h: 1 }}>
							<Checkbox labelStyle={styles.checkbox} label="OpenGL" />
						</div>

					</ResponsiveReactGridLayout>

        );
      case 2:
        return (
          <p style={{ fontSize: 16 }}>
						完成插件代码生成，请点击下载按钮下载插件。
          </p>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = { margin: '0 16px', overflow: 'hidden' };

		// Process data to download when finished
    if (finished) {

			let pluginsymblicname = this.dataToServer.pluginsymblicname;
			let url = '/pluginCodeGenerator/download/' + pluginsymblicname;
			window.location = url;
			window.open(url, '_self');

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
              点击这里
            </a> 重置插件生成向导。
          </p>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{ this.getStepContent(stepIndex) }</div>

				<div style={{ marginTop: 50, marginBottom: 12 }}>
					<FlatButton
						label="上一步"
						disabled={stepIndex === 0}
						onTouchTap={this.handlePrev}
						style={{ marginRight: 12 }}
						/>
					<RaisedButton
						label={stepIndex === 2 ? '下载' : '下一步'}
						primary={true}
						onTouchTap={this.handleNext}
						/>
				</div>
      </div>
    );
  }

	render() {
		const {loading, stepIndex} = this.state;
		// const toolBarMenu = (
    //   <ToolbarGroup >
    //     <ToolbarTitle text="操作" />
    //     <FontIcon className="muidocs-icon-custom-sort" />
    //     <ToolbarSeparator />

    //     <IconMenu
    //       iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
    //       onChange={this.handleChangeSingle}
    //       value={this.state.valueSingle}
    //       >
    //       <MenuItem value="1" primaryText="Refresh" />
    //       <MenuItem value="2" primaryText="Send feedback" />
    //       <MenuItem value="3" primaryText="Settings" />
    //       <MenuItem value="4" primaryText="Help" />
    //       <MenuItem value="5" primaryText="Sign out" />
    //     </IconMenu>

    //   </ToolbarGroup>);

		return (
			<div id="content">
				<div>
					<Title render={'插件代码生成工具'} />

					<Container
						title="插件代码生成流程"
						// menu={toolBarMenu}
						>
						<div style={{ width: '100%', maxWidth: 1200, margin: 'auto' }}>
							<Stepper style={styles.stepper} activeStep={stepIndex} >
								<Step>
									<StepLabel style={styles.stepperLabel}>基本信息</StepLabel>
								</Step>
								<Step>
									<StepLabel style={styles.stepperLabel}>插件依赖</StepLabel>
								</Step>
								<Step>
									<StepLabel style={styles.stepperLabel}>插件下载</StepLabel>
								</Step>
							</Stepper>
							<ExpandTransition loading={loading} open={true}>
								{this.renderContent() }
							</ExpandTransition>
						</div>
					</Container>

				</div>
			</div>
		)
		}
}

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


/************** Backup code ******************/
// <Container title="插件代码生成流程" menu={toolBarMenu} >

// 	<div>
// 		{/* widget content */}
// 		<div className="widget-body">

// 			<div className="row">
// 				<UiValidate options={validateOptions}>
// 					<form noValidate="novalidate">
// 						<Wizard className="col-sm-12" ref="generatorwizard"  onCurruntStepChange={this.onCurruntStepChange} onComplete={this.onDownloadPlugin}>
// 							<div className="form-bootstrapWizard clearfix">
// 								<ul className="bootstrapWizard">
// 									<li data-smart-wizard-tab="1">
// 										<a href="#"> <span className="step">1</span> <span
// 											className="title">基本信息</span>
// 										</a>
// 									</li>
// 									<li data-smart-wizard-tab="2">
// 										<a href="#"> <span className="step">2</span> <span
// 											className="title">插件依赖库配置</span> </a>
// 									</li>
// 									<li data-smart-wizard-tab="3">
// 										<a href="#"> <span className="step">3</span> <span
// 											className="title">插件下载</span> </a>
// 									</li>
// 								</ul>
// 							</div>

// 							<div className="tab-content">
// 								<div className="tab-pane" data-smart-wizard-pane="1">
// 									<br/>
// 									<h3><strong> 步骤 1 </strong> - 基本信息 </h3>

// 									<div className="row">
// 										<div className="col-sm-12">
// 											<legend style={styles.legendFont}> 插件生成设置 </legend>
// 											<div className="col-sm-6">
// 												<fieldset>
// 													<div className="form-group">
// 														<div className="input-group">
// 															<span className="input-group-addon"><i className="fa fa-info fa-fw"/></span>
// 															<input className="form-control"
// 																placeholder="插件简称" type="text" ref="pluginname"
// 																data-smart-validate-input="" data-required=""
// 																data-message="请填写插件简称" onChange={this.onChangePluginName}/>
// 														</div>
// 													</div>
// 												</fieldset>
// 											</div>
// 											<div className="col-sm-6">
// 												<fieldset>
// 													<div className="form-group">
// 														<div className="input-group">
// 															<span className="input-group-addon"><i className="fa fa-file fa-fw"/></span>
// 															<select className="form-control"
// 																data-smart-validate-input="" data-required=""
// 																ref="plugintype" defaultValue={"插件类型"} data-message="请选择插件类型">
// 																<option defaultValue="插件类型" disabled={true}> 插件类型 </option>
// 																<option defaultValue="核心插件">核心插件</option>
// 																<option defaultValue="显示插件">显示插件</option>
// 																<option defaultValue="通信插件">通信插件</option>
// 																<option defaultValue="辅助插件">辅助插件</option>
// 															</select>
// 														</div>
// 													</div>
// 												</fieldset>
// 											</div>
// 										</div>
// 									</div>

// 									<div className="row">
// 										<div className="col-sm-12">
// 											<legend style={styles.legendFont}> 插件信息 </legend>
// 											<div className="col-sm-3">
// 												<fieldset>
// 													<div className="form-group">
// 														<div className="input-group">
// 															<span className="input-group-addon"><i className="fa fa-tag fa-fw"/></span>
// 															<input className="form-control"
// 																placeholder="插件全称" type="text" ref="pluginsymblicname"
// 																data-smart-validate-input="" data-required="" readOnly={true}
// 																data-message="请填写插件简称" value={'com.plugins.' + this.state.pluginname}/>
// 														</div>
// 													</div>
// 												</fieldset>
// 											</div>
// 											<div className="col-sm-3">
// 												<fieldset>
// 													<div className="form-group">
// 														<div className="input-group">
// 															<span className="input-group-addon"><i className="fa fa-file-excel-o fa-fw"/></span>
// 															<input className="form-control"
// 																placeholder="插件版本" type="text" ref="pluginversion"
// 																data-smart-validate-input="" data-required=""
// 																defaultValue="0.0.1" data-message="请填写插件版本"/>
// 														</div>
// 													</div>
// 												</fieldset>
// 											</div>
// 											<div className="col-sm-3">
// 												<fieldset>
// 													<div className="form-group">
// 														<div className="input-group">
// 															<span className="input-group-addon"><i className="fa fa-user fa-fw"/></span>
// 															<input className="form-control"
// 																placeholder="插件作者" type="text" ref="pluginauthor"
// 																data-smart-validate-input="" data-required=""
// 																defaultValue="许昀" data-message="请填写插件作者"/>
// 														</div>
// 													</div>
// 												</fieldset>
// 											</div>
// 											<div className="col-sm-3">
// 												<fieldset>
// 													<div className="form-group">
// 														<div className="input-group">
// 															<span className="input-group-addon"><i className="fa fa-wordpress fa-fw"/></span>
// 															<input className="form-control"
// 																placeholder="插件网站" type="text" ref="pluginwebsite"
// 																data-smart-validate-input="" data-required=""
// 																defaultValue="http://localhost:3000/" data-message="请填写插件网站"/>
// 														</div>
// 													</div>
// 												</fieldset>
// 											</div>
// 											<div className="col-sm-12">
// 												<fieldset>
// 													<div className="form-group">
// 														<div className="input-group">
// 															<span className="input-group-addon"><i className="fa fa-comment fa-fw"/></span>
// 															<textarea rows="2" className="form-control"
// 																placeholder="插件简介" type="text" ref="pluginintrod"
// 																data-smart-validate-input="" data-required=""
// 																defaultValue="该插件由插件模板创建" data-message="请填写插件简介"/>
// 														</div>
// 													</div>
// 												</fieldset>
// 											</div>
// 										</div>
// 									</div>

// 								</div>
// 								<div className="tab-pane" data-smart-wizard-pane="2">
// 									<br/>

// 									<h3><strong> 步骤 2 </strong> - 插件依赖配置 </h3>

// 									<div className="row">
// 										<div className="col-sm-12">
// 											<legend style={styles.legendFont}> 插件依赖 </legend>
// 											<fieldset>
// 												<div className="form-group">
// 													<div className="col-sm-3">
// 														<div className="checkbox">
// 															<label style={{ fontSize: 15 }}> <input style={{ width: 15, height: 15 }}
// 																type="checkbox" ref="pluginframework"  defaultValue="插件框架"/> 插件框架 </label>
// 														</div>
// 													</div>
// 													<div className="col-sm-3">
// 														<div className="checkbox">
// 															<label style={{ fontSize: 15 }}> <input style={{ width: 15, height: 15 }}
// 																type="checkbox" ref="plugincore" defaultValue="核心插件"/> 核心插件 </label>
// 														</div>
// 													</div>
// 													<div className="col-sm-3">
// 														<div className="checkbox">
// 															<label style={{ fontSize: 15 }}> <input style={{ width: 15, height: 15 }}
// 																type="checkbox" ref="plugincomm" defaultValue="数据通信插件"/> 数据通信插件 </label>
// 														</div>
// 													</div>
// 													<div className="col-sm-3">
// 														<div className="checkbox">
// 															<label style={{ fontSize: 15 }}> <input style={{ width: 15, height: 15 }}
// 																type="checkbox" ref="plugindatabase" defaultValue="数据库管理插件"/> 数据库管理插件 </label>
// 														</div>
// 													</div>
// 												</div>
// 											</fieldset>
// 										</div>
// 									</div>

// 									<div className="row">
// 										<div className="col-sm-12">
// 											<legend style={styles.legendFont}> 第三方库依赖 </legend>
// 											<fieldset>
// 												<div className="form-group">
// 													<div className="col-sm-3">
// 														<div className="checkbox">
// 															<label style={{ fontSize: 15 }}> <input style={{ width: 15, height: 15 }}
// 																type="checkbox" ref="libqwt" defaultValue="QWT"/> QWT </label>
// 														</div>
// 													</div>
// 													<div className="col-sm-3">
// 														<div className="checkbox">
// 															<label style={{ fontSize: 15 }}> <input style={{ width: 15, height: 15 }}
// 																type="checkbox" ref="libboost" defaultValue="Boost"/> Boost </label>
// 														</div>
// 													</div>
// 													<div className="col-sm-3">
// 														<div className="checkbox">
// 															<label style={{ fontSize: 15 }}> <input style={{ width: 15, height: 15 }}
// 																type="checkbox" ref="libgdal" defaultValue="GDAL"/> GDAL </label>
// 														</div>
// 													</div>
// 													<div className="col-sm-3">
// 														<div className="checkbox">
// 															<label style={{ fontSize: 15 }}> <input style={{ width: 15, height: 15 }}
// 																type="checkbox" ref="libopengl" defaultValue="OpenGL"/> OpenGL </label>
// 														</div>
// 													</div>
// 												</div>

// 											</fieldset>
// 										</div>
// 									</div>
// 								</div>

// 								<div className="tab-pane" data-smart-wizard-pane="3">
// 									<br/>

// 									<h3><strong> 步骤 3 </strong> - 插件下载 </h3>
// 									<br/>

// 									<h1 className="text-center text-success"><strong><i
// 										className="fa fa-check fa-lg"/> 完成！</strong></h1>
// 									<h4 className="text-center"> 点击 “下一步” 下载插件 </h4>
// 									<br/>
// 									<br/>
// 								</div>

// 								<div className="form-actions">
// 									<div className="row">
// 										<div className="col-sm-12">
// 											<ul className="pager wizard no-margin">
// 												<li className="previous" data-smart-wizard-prev="">
// 													<a href="#" className="btn btn-sm btn-default">
// 														上一步 </a>
// 												</li>
// 												<li className="next" data-smart-wizard-next="">
// 													<a href="#" className="btn btn-sm txt-color-darken">
// 														下一步 </a>
// 												</li>
// 											</ul>
// 										</div>
// 									</div>
// 								</div>

// 							</div>
// 						</Wizard>
// 					</form>
// 				</UiValidate>
// 			</div>
// 		</div>
// 	</div>
// </Container>