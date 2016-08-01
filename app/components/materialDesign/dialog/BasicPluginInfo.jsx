import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';


// Material-UI component
import { Dialog, FlatButton, TextField, DatePicker }from 'material-ui';
import { SelectField, MenuItem }from 'material-ui';

// React-grid-layout for layout
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Icons
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload';

// Localise date time
let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
import areIntlLocalesSupported from 'intl-locales-supported';
if (areIntlLocalesSupported(['zh'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/zh');
}

var styles = {
  dialogTitle: {
    fontSize: 20,
    // textAlign: 'center',
    fontFamily: 'Roboto, Microsoft YaHei',
  },
  progress: {
    marginLeft: '47%'
  },
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
class BasicPluginInfo extends Component {

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
      pluginType: null,
      date: new Date(),
      inputFileName: '',
    };
  }

  componentWillReceiveProps() {
    const { defaultInfo } = this.props;
    this.setState({ pluginType: defaultInfo.category });
    this.setState({ inputFileName: defaultInfo.sourcecodeName });
  }

  handlePluginTypeChange = (event, index, value) => {
    this.setState({ pluginType: value });
  }

  handleFileChange = (event) => {
    let file = event.target.files[0];
    if (file !== undefined)
      this.setState({ inputFileName: file.name });
  };

  handleDateChange = (event, date) => {
    this.setState({
      date: date,
    });
  };

  openFileDialog = () => {
    let fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  };

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

  render() {

    const {
      title,
      open,
      onCancel,
      defaultInfo
    } = this.props;

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
        titleStyle={styles.dialogTitle}
        actions={actions}
        modal={true}
        open={open}
        onRequestClose={this.handleClose}
        >

        <ResponsiveReactGridLayout className="layout" isDraggable={false} isResizable={false}
          rowHeight={60}
          breakpoints={{ lg: 400, md: 332, sm: 256, xs: 160, xxs: 0 }}
          cols={{ lg: 2, md: 1, sm: 1, xs: 1, xxs: 1 }}
          >

          <div key="1" _grid={{ x: 0, y: 0, w: 1, h: 1 }}>
            <TextField
              ref="pluginName"
              defaultValue={defaultInfo.pluginname}
              hintText="三维显示"
              floatingLabelText="名称"
              />
          </div>

          <div key="2" _grid={{ x: 1, y: 0, w: 1, h: 1 }}>
            <TextField
              ref="pluginSymblicName"
              defaultValue={defaultInfo.symbolicname}
              hintText="com.plugins.Radar3D"
              floatingLabelText="标识"
              />
          </div>

          <div key="3" _grid={{ x: 0, y: 1, w: 1, h: 1 }}>
            <TextField
              ref="pluginVersion"
              defaultValue={defaultInfo.version}
              hintText="1.0.0"
              floatingLabelText="版本号"
              />
          </div>

          <div key="4" _grid={{ x: 1, y: 1, w: 1, h: 1 }}>
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

          <div key="5" _grid={{ x: 0, y: 2, w: 1, h: 1 }}>
            <DatePicker
              ref="date"
              defaultDate={new Date(defaultInfo.date) }
              floatingLabelText="创建日期"
              autoOk={true}
              DateTimeFormat={DateTimeFormat}
              locale="zh"
              okLabel="确定"
              cancelLabel="取消"
              onChange={this.handleDateChange}
              />
          </div>

          <div key="6" _grid={{ x: 2, y: 2, w: 1, h: 1 }}>
            <TextField
              floatingLabelText="选择文件"
              value={this.state.inputFileName}
              onTouchTap={this.openFileDialog}
              />
            <input ref="fileUpload" type="file" style={{ display: "none" }} onChange={this.handleFileChange}/>
          </div>

          <div key="7" _grid={{ x: 0, y: 3, w: 2, h: 2 }}>
            <TextField
              ref="pluginDescription"
              defaultValue={defaultInfo.description}
              fullWidth={true}
              floatingLabelText="简介"
              multiLine={true}
              rows={2}
              rowsMax={4}
              />
          </div>

        </ResponsiveReactGridLayout>

      </Dialog>
    );
  }
}

export default BasicPluginInfo;

// <TextField
//   hintText="Hint Text"
//   floatingLabelText="Fixed Floating Label Text"
//   floatingLabelFixed={true}
//   />
//   <TextField
//     hintText="Hint Text"
//     floatingLabelText="Floating Label Text"
//   />