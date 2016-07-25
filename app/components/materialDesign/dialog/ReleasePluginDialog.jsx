import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash"
import Select2 from '../../smartAdmin/forms/inputs/Select2.jsx'

// Material-UI component
import { Dialog, FlatButton, TextField, DatePicker } from 'material-ui';
import { SelectField, MenuItem }from 'material-ui';

// Material-UI
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';


// React-Grid-Layout
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Icons
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';

var styles = {
  stepper: {
    // marginTop: 15
  },
  stepperLabel: {
    fontSize: 16,
  },
  subhead: {
    fontSize: 16,
    marginLeft: -10,
    marginBottom: -10
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
const fileTypes = [
  <MenuItem key={1} value="库文件" primaryText="库文件" />,
  <MenuItem key={2} value="文档文件" primaryText="文档文件" />,
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
      fileType: '库文件',
      loading: false,
      finished: false,
      stepIndex: 0,
      inputFileName: '',
      filesTable: [],
    };

    // Initialize variables used in class
    this.dependencies = [];
    this.uploadFiles = {
      libs: [],
      docs: []
    }
    this.selectedRows = [];
  }

  processSubmitData = () => {
    const { onSubmit } = this.props;

    // Set submit data to callback function
    // onSubmit({
    //   pluginname: this.refs.pluginName.getValue(),
    //   symbolicname: this.refs.pluginSymblicName.getValue(),
    //   category: this.state.pluginType,
    //   version: this.refs.pluginVersion.getValue(),
    //   date: this.state.date,
    //   inputfile: this.refs.fileUpload.files[0],
    //   description: this.refs.pluginDescription.getValue()
    // });
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
        finished: stepIndex >= 3,
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

  handlePluginNameChange = (event) => {
    this.setState({ pluginName: event.target.value });
  }

  handleFileTypeChange = (event, index, value) => {
    this.setState({ fileType: value });
  }

  // handleFileChange = (event) => {
  //   let file = event.target.files[0];
  //   if (file !== undefined)
  //     this.setState({ inputFileName: file.name });
  // };

  openFileDialog = () => {
    let filesUploadDom = ReactDOM.findDOMNode(this.refs.filesUpload);
    filesUploadDom.click();
  };

  handleSelectUploadFiles = (event) => {
    let filesName = [];
    let files = [];
    let len = ReactDOM.findDOMNode(this.refs.filesUpload).files.length;
    let fileType = this.state.fileType;
    let tableContent = this.state.filesTable;

    // Store uploaded files name in array based on file type 
    for (let i = 0; i < len; i++) {
      let fileName = ReactDOM.findDOMNode(this.refs.filesUpload).files[i].name;

      // Adding files only when not be added to table yet
      if (_.some(tableContent, { 'name': fileName}))
        continue;


      // Push files name in array to display on UI 
      if (fileType === '库文件') { // Plugin libraries
        this.uploadFiles.libs.push(ReactDOM.findDOMNode(this.refs.filesUpload).files[i]);
      } else if (fileType === '文档文件') { // Plugin documents
        this.uploadFiles.docs.push(ReactDOM.findDOMNode(this.refs.filesUpload).files[i]);
      }

      // Push file type and name to file table content
      tableContent.push({
        type: fileType,
        name: fileName
      });
    }

    // Set files table state to display uploading files in table
    this.setState({ filesTable: tableContent });

    // Update react state and files array
    // TODO: DELETE->Do sorting work at last step before sending to server, data sourced from 'this.state.filesTable'
    // Only store all uploading files here and will be processed later 


    // if (fileType === '库文件') { // Plugin libraries
    //   this.uploadFiles.libs.push(files);
    // } else if (fileType === '文档文件') { // Plugin documents
    //   this.uploadFiles.docs.push(files);
    // }
  }

  /* Triggered when dependencies select changed (incl. selected / unselected) */
  handleDependenciesSelect = (event) => {
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

  handleDependenciesUnselect = (event) => {
    _.remove(this.dependencies, function (n) {
      return n.id === event.params.data.id;
    });
  }

  // SelectAll->'all', SelectNone->'none', Select->{row index}  
  handleRowSelection = (rows) => {
    this.selectedRows = rows;
  }

  handleRowsDelete = (event) => {
    const { filesTable } = this.state;

    // Find and store deleting file name according to row index
    let rows = this.selectedRows;
    let deleteNames = [];
    _(rows).forEach(function (row) {
      deleteNames.push(filesTable[row].name);
    });

    // Delete files in table based on deleting file name
    // TODO: handle "all" selected
    let tableTemp = filesTable;
    _(deleteNames).forEach(function (name) {
      // console.log("delete name:", name);
      _.remove(tableTemp, function (n) {
        return n.name === name;
      });
    });
    this.setState({ filesTable: tableTemp });

    // Delete files in upload array
    let files = this.uploadFiles;
    _(deleteNames).forEach(function (name) {
      _.forEach(files, function (value, key) {
        // _.forEach(value, function (file) {
        // console.log("delete name:", name);
        if (value.length > 0) {
          _.remove(value, function (file) {
            return file.name === name;
          });
        }
        // });
      });
    });
    this.uploadFiles = files;



    // TODO: DELETE->Do sorting work at last step before sending to server, data sourced from 'this.state.filesTable'

  }

  getStepContent(stepIndex, data, select2Options) {
    const { filesTable } = this.state;

    switch (stepIndex) {
      case 0:
        return (
          <ResponsiveReactGridLayout className="layout_rpd" isDraggable={false} isResizable={false}
            rowHeight={70}
            breakpoints={{ lg: 996, md: 768, sm: 480, xs: 240, xxs: 0 }}
            cols={{ lg: 2, md: 2, sm: 1, xs: 1, xxs: 1 }}
            >

            <div key="rpd-1" _grid={{ x: 0, y: 0, w: 2, h: 1 }}>
              <TextField
                ref="introduction"
                fullWidth={true}
                floatingLabelText="插件介绍"
                multiLine={true}
                rows={2}
                rowsMax={2}
                />
            </div>

            <div key="rpd-2" _grid={{ x: 0, y: 1, w: 1, h: 2 }}>
              <TextField
                ref="installManual"
                fullWidth={true}
                floatingLabelText="安装指南"
                multiLine={true}
                rows={4}
                rowsMax={4}
                />
            </div>

            <div key="rpd-3" _grid={{ x: 1, y: 1, w: 1, h: 2 }}>
              <TextField
                ref="compileManual"
                fullWidth={true}
                floatingLabelText="编译指南"
                multiLine={true}
                rows={4}
                rowsMax={4}
                />
            </div>

          </ResponsiveReactGridLayout>

        );
      case 1:
        return (
          <ResponsiveReactGridLayout className="layout_rpd" isDraggable={false} isResizable={false}
            rowHeight={70}
            breakpoints={{ lg: 996, md: 768, sm: 480, xs: 240, xxs: 0 }}
            cols={{ lg: 6, md: 3, sm: 2, xs: 1, xxs: 1 }}
            >

            <div key="rpd-4" _grid={{ x: 0, y: 0, w: 1, h: 1 }}>
              <TextField
                ref="pluginName"
                disabled={true}
                defaultValue={data.symbolicname}
                floatingLabelText="插件名"
                />
            </div>

            <div key="rpd-5" _grid={{ x: 1, y: 0, w: 1, h: 1 }}>
              <TextField
                ref="pluginVersion"
                disabled={true}
                value={data.version}
                floatingLabelText="插件版本"
                />
            </div>

            <div key="rpd-6" _grid={{ x: 0, y: 1, w: 3, h: 1 }}>
              <Select2 multiple="multiple" style={{ width: '100%' }} options={ select2Options }
                className="select2" ref="dependenciesSelect"
                onDependenciesSelect={this.handleDependenciesSelect} onDependenciesUnselect={this.handleDependenciesUnselect}>
              </Select2>
            </div>
          </ResponsiveReactGridLayout>
        );
      case 2:
        return (
          <ResponsiveReactGridLayout className="layout_rpd" isDraggable={false} isResizable={false}
            rowHeight={70}
            breakpoints={{ lg: 996, md: 768, sm: 480, xs: 240, xxs: 0 }}
            cols={{ lg: 6, md: 3, sm: 2, xs: 1, xxs: 1 }}
            >

            <div key="rpd-7" _grid={{ x: 0, y: 0, w: 1, h: 1 }}>
              <SelectField
                ref="fileType"
                value={this.state.fileType}
                onChange={this.handleFileTypeChange}
                floatingLabelText="类型"
                floatingLabelFixed={true}
                >
                {fileTypes}
              </SelectField>
            </div>

            <div key="rpd-8" _grid={{ x: 1, y: 0, w: 1, h: 1 }}>
              <TextField
                floatingLabelText="选择文件"
                value={this.state.inputFileName}
                onTouchTap={this.openFileDialog}
                />
              <input ref="filesUpload" type="file" multiple="multiple" style={{ display: "none" }} onChange={this.handleSelectUploadFiles}/>
            </div>

            <div key="rpd-9" _grid={{ x: 0, y: 0, w: 3, h: 5 }}>
              <Table height='300px' multiSelectable={true} onRowSelection={this.handleRowSelection} >
                <TableHeader displaySelectAll={true} enableSelectAll={true}>
                  <TableRow>
                    <TableHeaderColumn style={{ width: 50 }}>
                      <IconButton style={{ marginLeft: -10 }} tooltip="删除" onTouchTap={this.handleRowsDelete}>
                        <ActionDeleteForever />
                      </IconButton>
                    </TableHeaderColumn>
                    <TableHeaderColumn style={{ width: 50 }}>ID</TableHeaderColumn>
                    <TableHeaderColumn style={{ width: 300 }}>文件名称</TableHeaderColumn>
                    <TableHeaderColumn style={{ width: 100 }}>类型</TableHeaderColumn>

                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={true} showRowHover={true}>

                  { filesTable.map(function (row, index) {
                    if (filesTable.length > 0)
                      return (
                        <TableRow key={index}>
                          <TableRowColumn style={{ width: 50 }}>{ index + 1 }</TableRowColumn>
                          <TableRowColumn style={{ width: 300 }}>{ row.name }</TableRowColumn>
                          <TableRowColumn style={{ width: 100 }}>{ row.type }</TableRowColumn>
                        </TableRow>
                      )
                  }) }

                </TableBody>
              </Table>
            </div>

          </ResponsiveReactGridLayout >
        );

      case 3:
        return (
          <p style={{ fontSize: 16 }}>
            完成插件代码生成，请点击下载按钮下载插件。
          </p>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent(data, select2Options) {
    const {finished, stepIndex} = this.state;
    const stepperStyle = { margin: '0 16px', overflow: 'hidden' };

    // Process data to download when finished
    if (finished) {

      // let pluginsymblicname = this.dataToServer.pluginsymblicname;
      // let url = '/pluginCodeGenerator/download/' + pluginsymblicname;
      // window.location = url;
      // window.open(url, '_self');

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
            </a> 重置插件发布向导。
          </p>
        </div>
      );
    }

    return (
      <div style={stepperStyle}>
        <div>{ this.getStepContent(stepIndex, data, select2Options) }</div>
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

    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={onCancel}
        />,
      <FlatButton
        label="上一步"
        disabled={stepIndex === 0}
        onTouchTap={this.handlePrev}
        style={{ marginRight: 12 }}
        />,
      <RaisedButton
        label={stepIndex === 3 ? '下载' : '下一步'}
        primary={true}
        onTouchTap={this.handleNext}
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
        // autoScrollBodyContent={true}
        // autoDetectWindowHeightt={false}
        >

        <div style={{ width: '100%', height: '100%', maxWidth: 996, margin: 'auto' }}>
          <Stepper style={styles.stepper} activeStep={stepIndex} >
            <Step>
              <StepLabel style={styles.stepperLabel}>基本信息</StepLabel>
            </Step>
            <Step>
              <StepLabel style={styles.stepperLabel}>版本依赖</StepLabel>
            </Step>
            <Step>
              <StepLabel style={styles.stepperLabel}>附件上传</StepLabel>
            </Step>
            <Step>
              <StepLabel style={styles.stepperLabel}>保存表单</StepLabel>
            </Step>
          </Stepper>
          <ExpandTransition loading={loading} open={true}>
            {this.renderContent(defaultInfo, options) }
          </ExpandTransition>
        </div>

      </Dialog>
    );
  }
}

export default ReleasePluginDialog;


{/*
        <div style={{ marginTop: 70, marginBottom: 12 }}>
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
        */}