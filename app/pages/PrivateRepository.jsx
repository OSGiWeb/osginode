import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

// Datatable 
import Datatable from '../components/smartAdmin/tables/Datatable.jsx'

// Material-UI
import Title from 'react-title-component';
import { RaisedButton, IconButton } from 'material-ui';
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator } from 'material-ui/Toolbar';
import { IconMenu, MenuItem } from 'material-ui';
import Snackbar from 'material-ui/Snackbar';
import Menu from 'material-ui/Menu';

// Material-UI Icons
import ContentAdd from 'material-ui/svg-icons/content/add';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Delete from 'material-ui/svg-icons/action/delete';

// Material-UI Colors
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

// Import user defined modules
import Container from '../components/materialDesign/Container';
import ProgressDialog from '../components/materialDesign/dialog/ProgressDialog'
import BasicPluginInfo from '../components/materialDesign/dialog/BasicPluginInfo'
import ReleasePluginDialog from '../components/materialDesign/dialog/ReleasePluginDialog'
import ConfirmDialog from '../components/materialDesign/dialog/ConfirmDialog'

// Layout
var WidthProvider = require('react-grid-layout').WidthProvider;
var ReactGridLayout = require('react-grid-layout');
ReactGridLayout = WidthProvider(ReactGridLayout);

import {createPlugin, fetchPlugins, showNotificationDone, downloadPluginPkg,
  resetStoreStates, setDatatableSelectedData, updatePlugin, updatePluginWithSourcecode,
  deletePlguin, createPluginAttachments } from '../actions/plugins';
import { setRepoWizardExpand } from '../actions/processes'

// TODO: Modify validation fields for form by using material-ui-formy

// Customize styles 
var styles = {
  opMenuStyle: {
    fontSize: 16,
    marginTop: -8,
    marginBottom: -8,
  },
  opIconMenu: {
    // position: 'absolute',
    // margin:-5
    // top: '5%',
    // transform: 'translate(-50%, 0)'  
    // width:120
  },
  opMenuicon: {
    width: 20,
    height: 20,
    // color: blue500
    //  marginLeft: 30,
  },
  opRaiseButtonLabel: {
    fontSize: 16,
  }

}

class PrivateRepository extends Component {

  static propTypes = {
    plugin: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func
  };

  constructor(props) {
    super(props);

    // Initialize react state variables
    this.state = {
      showAddPluginDialog: false,
      showEditPluginDialog: false,
      showProcessProgress: false,
      showReleasePluginDialog: false,
      showDeletePluginDialog: false,
      showSnackbar: false,
    };
  }

  // Deconstructor
  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch(resetStoreStates());
  }

  onDownloadPluginPkg = () => {
    const { selectedData } = this.props.plugin;
    let url = '/pluginRepository/download/' + selectedData.filemeta.sourcecode.id;
    window.location = url;
    window.open(url, '_self');
  }

  /**
   * onDatatableRowSelected()
   * @param rowData
   * @param isSelected
   */
  onDatatableRowSelected = (rowData, isSelected) => {
    // Single row selection
    var data = rowData[0];
    const {dispatch} = this.props;

    // Set selected data and states
    dispatch(setDatatableSelectedData(data, isSelected));
  }

  /* Dialog Open / Submit / Cancel Action Functions */
  // Add plugin dialog 
  handleAddPluginDialogOpen = () => {
    this.setState({ showAddPluginDialog: true });
  }

  handleAddPluginDialogSubmit = (data) => {
    const { userFullname } = this.props.user;

    // Sending plugin data to node and saving to database
    const { dispatch } = this.props;

    // Get uploaded file instance in create plugin form
    let file = data.inputfile;
    // Create form data to let server know the request source is from a form
    let uploadFile = new FormData();
    uploadFile.append('pluginfile', file);

    // Dispath create plugin action
    dispatch(createPlugin({
      pluginname: data.pluginname,
      symbolicname: data.symbolicname,
      category: data.category,
      version: data.version,
      author: userFullname,
      date: data.date,
      description: data.description,
      dependencies: [],
      isprivate: true,
      filemeta: {
        sourcecode: { id: '', name: file.name }
      },
      statusIcon: "<span class='label label-danger'>私有</span>"
    }, uploadFile, '')); // upload data info and upload config as parameter

    // Close Add plugin modal
    this.setState({ showAddPluginDialog: false });
  }

  handleAddPluginDialogCancel = () => {
    this.setState({ showAddPluginDialog: false });
  }

  // Edit plugin dialog 
  handleEditPluginDialogOpen = () => {
    this.setState({ showEditPluginDialog: true });
  }

  handleEditPluginDialogSubmit = (data) => {
    const { dispatch } = this.props;
    const { selectedData } = this.props.plugin;
    const { userFullname } = this.props.user

    selectedData.pluginname = data.pluginname;
    selectedData.symbolicname = data.symbolicname;
    selectedData.category = data.category;
    selectedData.version = data.version;
    selectedData.author = userFullname;
    selectedData.date = data.date;
    selectedData.description = data.description;

    let file = data.inputfile;
    // Update plugin with new uploading file
    if (file !== undefined) {
      // Create form data to let server know the request source is from a form
      let uploadFile = new FormData();
      uploadFile.append('editpluginfile', file);

      // Dispatch update plugin with uploaded files
      selectedData.filemeta.sourcecode.name = file.name;
      dispatch(updatePluginWithSourcecode(selectedData, uploadFile, ''));
    } else { // If no upload file selected, update only plugin info in database
      dispatch(updatePlugin(selectedData));
    }

    // Close edit plugin modal 
    this.setState({ showEditPluginDialog: false });
  }

  handleEditPluginDialogCancel = () => {
    this.setState({ showEditPluginDialog: false });
  }

  // Release plugin dialog
  handleReleasePluginDialogOpen = () => {
    this.setState({ showReleasePluginDialog: true });
  }

  handleReleasePluginDialogSubmit = (data) => {
    const { dispatch } = this.props;
    const { selectedData } = this.props.plugin;

    // Private/Public control
    selectedData.isprivate = !selectedData.isprivate;
    selectedData.statusIcon = selectedData.isprivate ? "<span class='label label-danger'>私有</span>" :
      "<span class='label label-success'>公共</span>";

    // Add properties for plugin plugins
    selectedData.pluginintrod = data.pluginintrod;
    selectedData.installmanual = data.installmanual;
    selectedData.compilemanual = data.compilemanual;

    // Add plugin dependencies
    selectedData.dependencies = data.dependencies;

    // Create form data to let server know the request source is from a form
    let attachments = new FormData();

    // Attach files to upload 
    _.forEach(data.uploadFiles, function (value, key) {
      _.forEach(value, function (file) {
        attachments.append(key, file);
      });
    });

    var config = { // Callback to send upload progress back from request
      // progress: function (progressEvent) {
      //   var percentCompleted = (progressEvent.loaded / progressEvent.total) * 100;
      //   g_uploadPercent = parseFloat(percentCompleted.toFixed(2));
      // }
    };

    // Update plugin with attachments
    dispatch(createPluginAttachments(selectedData, attachments, config));

    // When the private->public of repo filled completed, close the form
    this.setState({ showReleasePluginDialog: false });
  }

  handleReleasePluginDialogCancel = () => {
    this.setState({ showReleasePluginDialog: false });
  }

  // Delete plugin dialog
  handleDeletePluginDialogOpen = () => {
    this.setState({ showDeletePluginDialog: true });
  }

  handleDeletePluginDialogSubmit = () => {
    const { dispatch } = this.props;
    const { selectedData } = this.props.plugin;

    // Dispatch delete plugin action
    dispatch(deletePlguin(selectedData.id, selectedData.filemeta.sourcecode.id));
    // Close delete confirm dialog
    this.handleDeletePluginDialogCancel();
  }

  handleDeletePluginDialogCancel = () => {
    this.setState({ showDeletePluginDialog: false });
  }

  /* Snackbar control */
  handleSnackbarClose = () => {
    const { dispatch } = this.props;
    dispatch(showNotificationDone());
  }

  /* Plugin opertation icon menu control */
  onIconMenuItemClick = (event, child) => {
    switch (child.ref) {
      case 'edit':
        this.handleEditPluginDialogOpen();
        break;
      case 'release':
        this.handleReleasePluginDialogOpen();
        break;
      case 'download':
        this.onDownloadPluginPkg();
        break;
      case 'delete':
        this.handleDeletePluginDialogOpen();
        break;
      case 'test':
      default:
        break;
    }
  }

  renderPrivateDataTable() {
    // TODO: Only render the plugin datatable when the data is arrived in store (temp. solution for debugging this page)
    // if (_isFetched) {
    const { isPrivate, newPlugin, updatedPlugin, isDeleted } = this.props.plugin;

    // Datatable options
    let options = {
      // data: plugins, // DONOT use manual request to database, use ajax request instead
      ajax: {
        url: '/pluginRepository',
        dataSrc: function (json) { // data preprocess when retrieved data from databases
          let formatData = [];

          // Format data which will be saved in store
          for (let i = 0; i < json.length; i++) {
            formatData[i] = _.omit(json[i], '_id', '__v'); // Delete unused plugin info
            formatData[i].index = i + 1; // Add plugin numeric index

            // Format date string 
            formatData[i].date = _.split(formatData[i].date, 'T')[0];

            // Set status icon based on plugin status (private / public)
            formatData[i].statusIcon = formatData[i].isprivate ? "<span class='label label-danger'>私有</span>" :
              "<span class='label label-success'>公共</span>";
          }
          return formatData;
        }
      },
      select: {
        style: 'single',
        info: false
      },
      stateSave: true,
      columns: [
        { data: "index" }, { data: "pluginname" }, { data: "symbolicname" }, { data: "category" },
        { data: "version" }, { data: "author" }, 
        { data: "date", render: function (data) {
          let date = new Date(data);
          let month = date.getMonth() + 1;
          return (month.length>1?month:"0"+month)+"/"+date.getDate()+"/"+date.getFullYear();
        }}, 
        { data: "description" }, { data: "statusIcon" }]
    }

    return (
      <div>
        <div className="widget-body no-padding">
          <Datatable
            options={ options }
            newPlugin={ newPlugin }
            updatedPlugin = { updatedPlugin }
            isDeleted = { isDeleted }
            onDatatableRowSelected={ this.onDatatableRowSelected }
            paginationLength={ true }
            className="table table-striped table-bordered table-hover" width="100%">
            <thead>
              <tr>
                <th data-class="expand">ID</th>
                <th data-class="expand">名称</th>
                <th data-class="expand">标识</th>
                <th data-class="expand">类别</th>
                <th data-class="expand">版本</th>
                <th data-class="expand">作者</th>
                <th data-class="expand"><i
                  className="fa fa-fw fa-calendar txt-color-blue hidden-md hidden-sm hidden-xs"/>
                  &nbsp; &nbsp; 发布时间
                </th>
                <th data-class="expand">描述</th>
                <th data-class="expand">状态</th>
              </tr>
            </thead>
          </Datatable>
        </div>
      </div>
    )
    // }
  }

  renderSnackbar() {
    const { isCreated, isUpdated, isDeleted } = this.props.plugin;

    let message = '';
    if (isCreated === true)
      message = "插件创建成功";
    else if (isUpdated === true)
      message = "插件更新成功";
    else if (isDeleted === true)
      message = "插件删除成功";

    return (
      <Snackbar
        open={isCreated || isUpdated || isDeleted}
        bodyStyle={{ textAlign: 'center' }}
        message={message}
        // action="undo"
        autoHideDuration={2000}
        // onActionTouchTap={this.handleActionTouchTap}
        onRequestClose={this.handleSnackbarClose}
        />
    );
  }

  /**
   * Main reder function of PluginRepository Compoment
   * @returns {XML}
   */
  render() {
    const { isSelected, selectedData, isProcessing } = this.props.plugin;

    const toolBarMenu = (
      <ToolbarGroup >
        <ToolbarTitle text="操作" />

        <ToolbarSeparator />
        <RaisedButton
          labelStyle={styles.opRaiseButtonLabel}
          label="添加插件"
          primary={true}
          icon={<ContentAdd />}
          onTouchTap={this.handleAddPluginDialogOpen}
          />

        <IconMenu
          menuStyle={styles.opIconMenu}
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onItemTouchTap={this.onIconMenuItemClick}
          >
          <MenuItem disabled={ !isSelected } ref="edit" style={styles.opMenuStyle} primaryText="编辑"
            leftIcon={ <PersonAdd style={styles.opMenuicon}  /> }/>
          <MenuItem disabled={ !isSelected || !selectedData.isprivate } ref="release" style={styles.opMenuStyle} primaryText="发布"
            leftIcon={ <RemoveRedEye style={styles.opMenuicon} /> }/>
          <MenuItem disabled={ !isSelected } ref="download" style={styles.opMenuStyle} primaryText="下载"
            leftIcon={ <ContentLink style={styles.opMenuicon} /> }/>
          <MenuItem disabled={ !isSelected } ref="delete" style={styles.opMenuStyle} primaryText="删除"
            leftIcon={ <Delete style={styles.opMenuicon} /> }/>
          <MenuItem disabled={ !isSelected } ref="test" style={styles.opMenuStyle} primaryText="测试"
            leftIcon={ <Delete style={styles.opMenuicon} /> }/>
        </IconMenu>
      </ToolbarGroup>
    );

    return (
      <div id="content">
        <div>
          <Title render={'私有插件仓库'} />

          <Container title="私有仓库" menu={toolBarMenu} >
            { this.renderPrivateDataTable() }
          </Container>

          { this.renderSnackbar() }

          <ProgressDialog open={isProcessing}/>

          <BasicPluginInfo
            title="添加插件"
            open={this.state.showAddPluginDialog}
            onSubmit={this.handleAddPluginDialogSubmit}
            onCancel={this.handleAddPluginDialogCancel}
            defaultInfo={{
              pluginname: '',
              symbolicname: '',
              category: '显示插件',
              version: '',
              date: new Date(),
              description: '',
              sourcecodeName: ''
            }}
            />

          <ConfirmDialog
            title=""
            open={this.state.showDeletePluginDialog}
            onSubmit={this.handleDeletePluginDialogSubmit}
            onCancel={this.handleDeletePluginDialogCancel}
            defaultInfo={{
              text: "将从数据库中删除该插件的所有信息，确认？"
            }}
            />

          { isSelected === true ?
            <ReleasePluginDialog
              title="发布插件"
              open={this.state.showReleasePluginDialog}
              onSubmit={this.handleReleasePluginDialogSubmit}
              onCancel={this.handleReleasePluginDialogCancel}
              defaultInfo={{
                pluginname: selectedData.pluginname,
                symbolicname: selectedData.symbolicname,
                category: selectedData.category,
                version: selectedData.version,
                date: selectedData.date,
                description: selectedData.description,
                sourcecodeName: selectedData.filemeta.sourcecode.name
              }}
              /> : <div></div>
          }
          { isSelected === true ?
            <BasicPluginInfo
              title="编辑插件"
              open={this.state.showEditPluginDialog}
              onSubmit={this.handleEditPluginDialogSubmit}
              onCancel={this.handleEditPluginDialogCancel}
              defaultInfo={{
                pluginname: selectedData.pluginname,
                symbolicname: selectedData.symbolicname,
                category: selectedData.category,
                version: selectedData.version,
                date: selectedData.date,
                description: selectedData.description,
                sourcecodeName: selectedData.filemeta.sourcecode.name
              }}
              /> : <div></div>
          }
        </div>

      </div>
    )
  }
}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    plugin: state.plugin,
    user: state.user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(PrivateRepository);


/**
 * Backup code
 */