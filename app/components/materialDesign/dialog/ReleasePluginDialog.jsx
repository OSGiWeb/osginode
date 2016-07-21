import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

// Material-UI component
import { Dialog, FlatButton, TextField, DatePicker } from 'material-ui';
import { SelectField, MenuItem }from 'material-ui';

// Material-UI
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

// React-Grid-Layout
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Icons
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload';




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
  dialogTitle: {
    fontSize: 20,
    fontFamily: 'Roboto, Microsoft YaHei',
  },
  dialogStyle: {
    // marginTop: '-20%',
    // marginLeft: '20%'
  },
  contentStyle: {
    // position: 'fixed',
    position: 'relative',
    // position: 'absolute',
    width: '100%',
    height: 900,
    maxHeight: 'none',
    maxWidth: 996,
    // marginTop: '-10%',

  }
}



// Plugin types to select field
const pluginTypes = [
  <MenuItem key={1} value="核心插件" primaryText="核心插件" />,
  <MenuItem key={2} value="显示插件" primaryText="显示插件" />,
  <MenuItem key={3} value="通信插件" primaryText="通信插件" />,
  <MenuItem key={4} value="辅助插件" primaryText="辅助插件" />,
];

/**
 * Inform data/action process progress situation.
 */
class ReleasePluginDialog extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    defaultInfo: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      finished: false,
      stepIndex: 0,
    };
  }

  componentWillReceiveProps() {

  }

  processSubmitData = () => {
    const { onSubmit } = this.props;

    // Set submit data to callback function
    onSubmit({
      pluginname: this.refs.pluginName.getValue(),
      symbolicname: this.refs.pluginSymblicName.getValue(),
      category: this.state.pluginType,
      version: this.refs.pluginVersion.getValue(),
      date: this.state.date,
      inputfile: this.refs.fileUpload.files[0],
      description: this.refs.pluginDescription.getValue()
    });
  }

  stepperDataProcess(stepIndex) {
    const { dispatch } = this.props;

    switch (stepIndex) {
      case 0:
        // this.dataToServer = {
        //   pluginauthor: this.refs.pluginAuthor.getValue(),
        //   pluginintrod: this.refs.pluginDescription.getValue(),
        //   pluginname: this.refs.pluginName.getValue(),
        //   pluginsymblicname: this.refs.pluginSymblicName.getValue(),
        //   plugintype: this.state.pluginType,
        //   pluginversion: this.refs.pluginVersion.getValue(),
        //   pluginwebsite: this.refs.pluginWebsite.getValue(),
        // }
        break;

      // Send plugin info to server in 2nd. step to prepare download file 
      case 1:
        // dispatch(generatePluginWithTemplate(this.dataToServer));
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
    // this.setState({
    //   stepIndex: stepIndex + 1,
    //   finished: stepIndex >= 2,
    // });

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
    // if (stepIndex > 0) {
    //   this.setState({ stepIndex: stepIndex - 1 });
    // }
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
          <ResponsiveReactGridLayout className="layout_rpd" isDraggable={false} isResizable={false}
            rowHeight={50}
            breakpoints={{ lg: 996, md: 768, sm: 480, xs: 240, xxs: 0 }}
            cols={{ lg: 6, md: 3, sm: 2, xs: 1, xxs: 1 }}
            >
            <div key="0-1" _grid={{ x: 0, y: 0, w: 1, h: 1 }}>
              <TextField
                ref="pluginName"
                onChange={this.handlePluginNameChange}
                hintText="Radar3D"
                floatingLabelText="英文名称"
                />
            </div>

            <div key="0-2" _grid={{ x: 1, y: 0, w: 1, h: 1 }}>
              <TextField
                disabled={true}
                value={'com.plugins.' + this.state.pluginName}
                // onChange={this.handlePluginSymblicNameChange}
                ref="pluginSymblicName"
                hintText="com.plugins.Radar3D"
                floatingLabelText="标识"
                />
            </div>


            <div key="0-3" _grid={{ x: 0, y: 1, w: 1, h: 1 }}>
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

            <div key="0-4" _grid={{ x: 1, y: 1, w: 1, h: 1 }}>
              <TextField
                ref="pluginAuthor"
                hintText="姓名"
                floatingLabelText="作者"
                />
            </div>

            <div key="0-5" _grid={{ x: 0, y: 2, w: 3, h: 1 }}>
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
          <ResponsiveReactGridLayout className="layout_rpd" isDraggable={false} isResizable={false}
            rowHeight={50}
            breakpoints={{ lg: 996, md: 768, sm: 480, xs: 240, xxs: 0 }}
            cols={{ lg: 6, md: 3, sm: 2, xs: 1, xxs: 1 }}
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
    const stepperStyle = { margin: '0 16px', overflow: 'hidden' };

    // Process data to download when finished
    if (finished) {

      let pluginsymblicname = this.dataToServer.pluginsymblicname;
      let url = '/pluginCodeGenerator/download/' + pluginsymblicname;
      window.location = url;
      window.open(url, '_self');

      return (
        <div style={stepperStyle}>
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
      <div style={stepperStyle}>
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

    const {
      title,
      open,
      onCancel,
      defaultInfo
    } = this.props;

    const { loading, stepIndex } = this.state;

    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={onCancel}
        />,
      <FlatButton
        label="提交"
        primary={true}
        // disabled={true}
        onTouchTap={this.processSubmitData}
        />
    ];

    return (
      <Dialog
        title={title}
        style={styles.dialogStyle}
        titleStyle={styles.dialogTitle}
        contentStyle={styles.contentStyle}
        actions={actions}
        modal={true}
        open={open}
        onRequestClose={this.handleClose}
        >

        <div style={{ width: '100%', height: 400, maxWidth: 996, margin: 'auto' }}>
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

      </Dialog>
    );
  }
}

export default ReleasePluginDialog;