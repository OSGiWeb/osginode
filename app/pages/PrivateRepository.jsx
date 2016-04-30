import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import classnames from 'classnames'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import UiValidate from '../components/smartAdmin/forms/validation/UiValidate.jsx'
import UiDatepicker from '../components/smartAdmin/forms/inputs/UiDatepicker.jsx'
import SubHeader from './layout/SubHeader.jsx'
import BigBreadcrumbs from '../components/smartAdmin/layout/navigation/components/BigBreadcrumbs.jsx'
import WidgetGrid from '../components/smartAdmin/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../components/smartAdmin/layout/widgets/JarvisWidget.jsx'
import Datatable from '../components/smartAdmin/tables/Datatable.jsx'
import { Dropdown, MenuItem } from 'react-bootstrap'

import { toggleStatus, createPlugin, fetchPlugins,
  showNotificationDone, setDatatableSelectedData, updatePlugin, deletePlguin } from '../actions/plugins';


// TODO: Modify validation fields
let validationOptions = {
  // Rules for form validation
  rules : {
    name : {
      required : true
    },
    email : {
      required : true,
      email : true
    },
    phone : {
      required : true
    },
    interested : {
      required : true
    },
    budget : {
      required : true
    }
  },

  // Messages for form validation
  messages : {
    name : {
      required : 'Please enter your name'
    },
    email : {
      required : 'Please enter your email address',
      email : 'Please enter a VALID email address'
    },
    phone : {
      required : 'Please enter your phone number'
    },
    interested : {
      required : 'Please select interested service'
    },
    budget : {
      required : 'Please select your budget'
    }
  }
};


class PrivateRepository extends Component {

  //TODO: Data that needs to be called before rendering the component This is used for server-side rending
  // via the fetchComponentDataBeforeRender() method
  // static need = [
  //   fetchPlugins
  // ]

  constructor(props) {
    super(props);

    // Function called from events (e.g. 'click', 'submit'...) must be bound to 'this' class,
    // Otherwise fields in 'this.props' is NOT avaiable
    this.onToggleStatus = this.onToggleStatus.bind(this);
    this.onAddPluginSubmit = this.onAddPluginSubmit.bind(this);
    this.onEditPluginSubmit = this.onEditPluginSubmit.bind(this);
    this.showSmartNotification = this.showSmartNotification.bind(this);
    this.onDatatableRowSelected = this.onDatatableRowSelected.bind(this);
    this.onDeletePluginSubmit = this.onDeletePluginSubmit.bind(this);

    // no server-side rendering, just get plugins info here
    // const {dispatch} = this.props;
    // dispatch(fetchPlugins());
  }

  // Set plugin as private plugin or public plugin
  // true: private / false: public plugin
  onToggleStatus() {
    const {dispatch} = this.props;
    const { selectedData } = this.props.plugin;

    status = ( !selectedData.isprivate );
    dispatch(toggleStatus(selectedData.id, selectedData.index, status));
  }

  showSmartNotification() {
    const {dispatch} = this.props;
    const { isCreated, isUpdated, isDeleted } = this.props.plugin;

    // TODO: Add waiting icon to show the plugin adding process
    // TODO: Show valid plugin infomation on message boxes
    if (isCreated !== undefined || isUpdated !== undefined || isDeleted !== undefined) {
      if (isCreated === true) {
        $.bigBox({
          title: "插件添加成功！",
          content: "插件名：高度窗；提交人：许昀",
          color: "#739E73",
          timeout: 2000,
          icon: "fa fa-check",
          // number: "4"
        });
      } else if (isCreated === false) {
        $.bigBox({
          title: "插件添加失败！",
          content: "插件名：高度窗；提交人：许昀",
          color: "#296191",
          timeout: 2000,
          icon: "fa fa-check",
          // number: "4"
        });
      }

      // if (isUpdated === true) {
      //   $.bigBox({
      //     title: "插件更新成功！",
      //     content: "插件名：高度窗；提交人：许昀",
      //     color: "#739E73",
      //     timeout: 2000,
      //     icon: "fa fa-check",
      //     // number: "4"
      //   });
      // } else if (isUpdated === false){
      //   $.bigBox({
      //     title: "插件更新失败！",
      //     content: "插件名：高度窗；提交人：许昀",
      //     color: "#296191",
      //     timeout: 2000,
      //     icon: "fa fa-check",
      //     // number: "4"
      //   });
      // }
      // Notification is shown, set related state to default value to avoid render notification again
      dispatch(showNotificationDone());
    }

    // $.smallBox({
    //   title: "插件添加成功！",
    //   content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
    //   color: "#296191",
    //   iconSmall: "fa fa-thumbs-up bounce animated",
    //   timeout: 4000
    // });
  }

  onAddPluginSubmit() {

    const { userFullname } = this.props.user;

    // Sending plugin data to node and saving to database
    const { dispatch } = this.props;

    // TEST plugin dependencies
    let dependencies = [];
    dependencies[0] = {'name':'PluginA', 'version':'0.0.1'};
    dependencies[1] = {'name':'PluginB', 'version':'0.0.2'};

    let name = dependencies[0].name;
    let version = dependencies[0].version;
    // TEST plugin dependencies

    dispatch(createPlugin({
      pluginname: ReactDOM.findDOMNode(this.refs.pluginname).value,
      symbolicname: ReactDOM.findDOMNode(this.refs.symbolicname).value,
      category: ReactDOM.findDOMNode(this.refs.category).value,
      version: ReactDOM.findDOMNode(this.refs.version).value,
      author: userFullname,
      releasedate: ReactDOM.findDOMNode(this.refs.releasedate).value,
      description: ReactDOM.findDOMNode(this.refs.description).value,
      dependencies: dependencies,
      isprivate: true
    }));
  }

  onDatatableRowSelected(rowData, isSelected) {
    // Single row selection
    var data = rowData[0];

    const {dispatch} = this.props;
    dispatch(setDatatableSelectedData(data, isSelected));
  }

  onEditPluginSubmit() {
    const { dispatch } = this.props;
    const { selectedData } = this.props.plugin;
    const { userFullname } = this.props.user

    dispatch(updatePlugin({
      id: selectedData.id,
      index: selectedData.index,
      pluginname: ReactDOM.findDOMNode(this.refs.editpluginname).value,
      symbolicname: ReactDOM.findDOMNode(this.refs.editsymbolicname).value,
      category: ReactDOM.findDOMNode(this.refs.editcategory).value,
      version: ReactDOM.findDOMNode(this.refs.editversion).value,
      author: userFullname,
      releasedate: ReactDOM.findDOMNode(this.refs.editreleasedate).value,
      description: ReactDOM.findDOMNode(this.refs.editdescription).value
    }))
  }

  onDeletePluginSubmit() {
    const { dispatch } = this.props;
    const { selectedData } = this.props.plugin;
    dispatch(deletePlguin(selectedData.id, selectedData.index));
  }

  /**
   * renderAddPluginModal
   * @returns {XML}
   */
  renderAddPluginModal() {

    return (
      <div className="modal fade" id="addPluginModal" tabIndex="-1" role="dialog"
           aria-labelledby="addPluginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
              <h2 className="row-seperator-header" id="addPluginModalLabel">
                <i className="fa fa-reorder"/> 添加插件 </h2>
            </div>
            <div className="modal-body">

              <div>
                <div className="widget-body no-padding">
                  <UiValidate options={validationOptions}>
                    <form id="addplugin-form" className="smart-form" noValidate="novalidate">
                      <fieldset>
                        <div className="row">
                          <section className="col col-6">
                            <label className="input"> <i className="icon-append fa fa-puzzle-piece"/>
                              <input type="text" name="pluginname" ref="pluginname" placeholder="名称"/>
                            </label>
                          </section>
                          <section className="col col-6">
                            <label className="input"> <i className="icon-append fa fa-user"/>
                              <input type="text" disabled="disabled" name="symbolicname" ref="symbolicname" placeholder="标识" value="com.plugins.test"/>
                            </label>
                          </section>
                        </div>

                        <div className="row">
                          <section className="col col-6">
                            <label className="input"> <i className="icon-append fa fa-file-excel-o"/>
                              <input type="text" disabled="disabled" name="version" ref="version" placeholder="版本号" value="0.0.1" />
                            </label>
                          </section>
                          <section className="col col-6">
                            <label className="select">
                              <select name="category" ref="category" defaultValue={"类别"}>
                                <option value="类别" disabled={true}>类别</option>
                                <option value="核心插件">核心插件</option>
                                <option value="显示插件">显示插件</option>
                                <option value="通信插件">通信插件</option>
                                <option value="辅助插件">辅助插件</option>
                              </select> <i/> </label>
                          </section>
                        </div>

                        <div className="row">
                          <section className="col col-6">
                            <label className="input"> <i className="icon-append fa fa-calendar"/>
                              <UiDatepicker type="text" name="releasedate" ref="releasedate" id="releasedate"
                                            placeholder="发布时间"/>
                            </label>
                          </section>
                        </div>
                      </fieldset>

                      <fieldset>
                        <section>
                          <div className="input input-file">
                      <span className="button"><input id="file2" type="file" name="pluginfile"
                                                      onchange="this.parentNode.nextSibling.value = this.value"/>
                        上传插件</span>
                            <input type="text" placeholder="上传插件包" readOnly={true}/>
                          </div>
                        </section>

                        <section>
                          <label className="textarea"> <i className="icon-append fa fa-comment"/>
                            <textarea rows="5" disabled="disabled" name="description" ref="description" placeholder="插件描述" value="测试插件，部分域不可被输入信息。"/>
                          </label>
                        </section>
                      </fieldset>
                    </form>
                  </UiValidate>
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">
                取消
              </button>
              <button type="button" className="btn btn-primary" data-dismiss="modal"
                      onClick={this.onAddPluginSubmit}>
                添加插件
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /**
   * renderEditPluginModal
   * @returns {XML}
   */
  renderEditPluginModal() {

    const { isSelected, selectedData } = this.props.plugin;

    if (isSelected) {
      return (
        <div className="modal fade" id="editPluginModal" tabIndex="-1" role="dialog"
             aria-labelledby="editPluginModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h2 className="row-seperator-header" id="editPluginModalLabel" >
                  <i className="fa fa-reorder"/> 编辑插件 </h2>
              </div>
              <div className="modal-body">

                <div>
                  <div className="widget-body no-padding">
                    <UiValidate options={validationOptions}>
                      <form id="editplugin-form" className="smart-form" noValidate="novalidate">
                        <fieldset>
                          <div className="row">
                            <section className="col col-6">
                              <label className="input"> <i className="icon-append fa fa-puzzle-piece"/>
                                <input type="text" name="editpluginname" ref="editpluginname" placeholder="名称" defaultValue={selectedData.pluginname}/>
                              </label>
                            </section>
                            <section className="col col-6">
                              <label className="input"> <i className="icon-append fa fa-user"/>
                                <input type="text" name="editsymbolicname" ref="editsymbolicname" placeholder="标识" defaultValue={selectedData.symbolicname}/>
                              </label>
                            </section>
                          </div>

                          <div className="row">
                            <section className="col col-6">
                              <label className="input"> <i className="icon-append fa fa-file-excel-o"/>
                                <input type="text" name="editversion" ref="editversion" placeholder="版本号" defaultValue={selectedData.version}/>
                              </label>
                            </section>
                            <section className="col col-6">
                              <label className="select">
                                <select name="editcategory" ref="editcategory" defaultValue={selectedData.category}>
                                  <option value="类别" disabled={true}>类别</option>
                                  <option value="核心插件">核心插件</option>
                                  <option value="显示插件">显示插件</option>
                                  <option value="通信插件">通信插件</option>
                                  <option value="辅助插件">辅助插件</option>
                                </select> <i/> </label>
                            </section>
                          </div>

                          <div className="row">
                            <section className="col col-6">
                              <label className="input"> <i className="icon-append fa fa-calendar"/>
                                <UiDatepicker type="text" name="editreleasedate" ref="editreleasedate" id="editreleasedate"
                                              placeholder="发布时间" defaultValue={selectedData.releasedate}/>
                              </label>
                            </section>
                          </div>
                        </fieldset>

                        <fieldset>
                          <section>
                            <div className="input input-file">
                      <span className="button"><input id="editfile2" type="editfile" name="editpluginfile"
                                                      onchange="this.parentNode.nextSibling.value = this.value"/>
                        上传插件</span>
                              <input type="text" placeholder="上传插件包" readOnly={true}/>
                            </div>
                          </section>
                          <section>
                            <label className="textarea"> <i className="icon-append fa fa-comment"/>
                              <textarea rows="5" name="editdescription" ref="editdescription" placeholder="插件描述" defaultValue={selectedData.description}/>
                            </label>
                          </section>
                        </fieldset>
                      </form>
                    </UiValidate>
                  </div>
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">
                  取消
                </button>
                <button type="button" className="btn btn-primary" data-dismiss="modal"
                        onClick={this.onEditPluginSubmit}>
                  更新插件
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  renderPrivateRepository() {
    // Check if row in datatable is selected
    const { isSelected, selectedData } = this.props.plugin;

    return (
      <div className="row">
        <article className="col-sm-12">
          <JarvisWidget editbutton={false} color="blueDark">
            <header>
              <span className="widget-icon"> <i className="fa fa-table"/> </span>
              <h2>私有插件仓库</h2>
              <div className="widget-toolbar">
                <button className={classnames(["btn btn-xs btn-primary"])} data-toggle="modal"
                        data-target="#addPluginModal">
                  <i className="fa fa-plus-square"/>
                  &nbsp;&nbsp; 添加新插件
                </button>
                &nbsp;&nbsp;
                <Dropdown className="btn-group" id="widget-demo-dropdown" >
                  <Dropdown.Toggle className="btn btn-xs dropdown-toggle btn-primary" disabled={ !isSelected }>
                    <i className="fa fa-wrench"/>&nbsp;&nbsp; 插件操作
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu pull-right">
                    <MenuItem data-toggle="modal" data-target="#editPluginModal">
                      <i className="fa fa-edit"/>&nbsp;编辑
                    </MenuItem>
                    {/*disabled={ !selectedData.isprivate }*/}
                    <MenuItem onClick={this.onToggleStatus} >
                      <i className="fa fa-cloud-upload"/>&nbsp;提交
                    </MenuItem>
                    <MenuItem onClick={this.onDeletePluginSubmit}>
                      <i className="fa fa-minus-square"/>&nbsp;删除
                    </MenuItem>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="widget-toolbar">
                <div className="progress progress-striped active" data-tooltip="55%"
                     data-tooltip-placement="bottom">
                  <div className="progress-bar progress-bar-success" role="progressbar"
                       style={{width: '55%'}}>55 %
                  </div>
                </div>
              </div>
            </header>

            { this.renderPrivateDataTable() }

          </JarvisWidget>
        </article>
      </div>
    )
  }

  renderPrivateDataTable() {
    // TODO: Only render the plugin datatable when the data is arrived in store (temp. solution for debugging this page)
    // if (_isFetched) {
    const { isPrivate, plugins, newPlugin, updatedPlugin, isDeleted } = this.props.plugin;

    // Datatable options
    let options = {
      // data: plugins, // DONOT use manual request to database, use ajax request instead
      ajax: {
        url: '/privateRepository',
        dataSrc: function ( json ) {

          // let statusIcon = '';
          // if (_isPrivate)
          //   statusIcon = "<span class='label label-success'>Private</span>";
          // else
          //   statusIcon = "<span class='label label-danger'>Public</span>";

          let formatData = [];
          // TODO: Maybe we need to keep the md5 id field which will be used to update plugin info!

          // Format data which will be saved in store
          for (let i = 0; i < json.length; i++) {
            formatData[i] = _.omit(json[i], '_id', '__v'); // Delete unused plugin info
            formatData[i].index = i + 1; // Add plugin numeric index
          }
          return formatData;
        }
      },
      select: {
        style: 'single',
        info: false
      },
      columns: [
        {data: "index"}, {data: "pluginname"}, {data: "symbolicname"}, {data: "category"},
        {data: "version"}, {data: "author"}, {data: "releasedate"}, {data: "description"}]
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
                &nbsp;&nbsp; 发布时间
              </th>
              <th data-class="expand">描述</th>
            </tr>
            </thead>
          </Datatable>
        </div>
      </div>
    )
    // }
  }

  /**
   * Main reder function of PluginRepository Compoment
   * @returns {XML}
   */
  render() {

    return (
      <div id="content">
        <div className="row">
          <BigBreadcrumbs items={['插件开发', '插件仓库']} icon="table"
                          className="col-xs-12 col-sm-7 col-md-7 col-lg-4"/>
          <SubHeader />
        </div>

        <WidgetGrid>
          { this.renderPrivateRepository() }
        </WidgetGrid>

        { this.renderAddPluginModal() }
        { this.renderEditPluginModal() }
        { this.showSmartNotification() }

      </div>
    )
  }
}

PrivateRepository.propTypes = {
  plugin: PropTypes.object,
  user: PropTypes.object,
  dispatch: PropTypes.func
};

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

// renderDataTableHeader(_isPrivate) {
//   return (
//     <header>
//       <span className="widget-icon"> <i className="fa fa-table"/> </span>
//       <h2>{classnames({'私有插件列表': _isPrivate, '公共插件列表': !_isPrivate})}</h2>
//       <div className="widget-toolbar">
//         <button className={classnames(["btn btn-xs btn-primary"])} onClick={this.toggleMode} >
//           <i className={classnames({ 'fa fa-archive': _isPrivate, 'fa fa-cloud': !_isPrivate })}/>
//           &nbsp;&nbsp; 切换仓库
//         </button>
//         &nbsp;&nbsp;
//         <button className={classnames(["btn btn-xs btn-primary"])} onClick={this.addNewPlugin} data-toggle="modal"
//                 data-target="#repoControlModal">
//           <i className={classnames({ 'fa fa-plus-square': _isPrivate, 'fa  fa-upload': !_isPrivate })}/>
//           &nbsp;&nbsp; {classnames({'添加新插件': _isPrivate, '提交插件': !_isPrivate})}
//         </button>
//         &nbsp;&nbsp;
//         <Dropdown className="btn-group" id="widget-demo-dropdown">
//           <Dropdown.Toggle className="btn btn-xs dropdown-toggle btn-primary">
//             <i className="fa fa-wrench"/>&nbsp;&nbsp; 插件操作
//           </Dropdown.Toggle>
//           <Dropdown.Menu className="dropdown-menu pull-right">
//             <MenuItem data-toggle="modal" data-target="#repoControlModal" >
//               <i className="fa fa-edit"/>&nbsp;编辑
//             </MenuItem>
//             <MenuItem>
//               <i className="fa fa-cloud-upload"/>&nbsp;提交
//             </MenuItem>
//             <MenuItem>
//               <i className="fa fa-minus-square"/>&nbsp;删除
//             </MenuItem>
//           </Dropdown.Menu>
//         </Dropdown>
//
//       </div>
//       <div className="widget-toolbar">
//         <div className="progress progress-striped active" data-tooltip="55%"
//              data-tooltip-placement="bottom">
//           <div className="progress-bar progress-bar-success" role="progressbar"
//                style={{width: '55%'}}>55 %
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }
//
// renderDataTable(_isPrivate, _isFetched, _plugins, _newPlugin) {
//
//   if (_isFetched) { // Only render the plugin datatable when the data is arrived in store
//
//     // _isPrivate = false;
//
//     if (_isPrivate) { // Check repository type
//
//       // Datatable options
//       let options = {
//         data: _plugins,
//         // select: true,
//         select: {
//           style: 'single',
//           info: false
//         },
//         columns: [
//           {data: "index"}, {data: "pluginname"}, {data: "category"},
//           {data: "version"}, {data: "author"}, {data: "releasedate"}, {data: "description"}]
//       }
//
//       return (
//         <JarvisWidget editbutton={false} color="blueDark">
//           {this.renderDataTableHeader(_isPrivate)}
//           <div>
//             <div className="widget-body no-padding">
//               <Datatable
//                 options={ options }
//                 newPlugin={ _newPlugin }
//                 paginationLength={true} className="table table-striped table-bordered table-hover"
//                 width="100%">
//                 <thead>
//                 <tr>
//                   <th data-class="expand">ID</th>
//                   <th data-class="expand">名称</th>
//                   <th data-class="expand">类别</th>
//                   <th data-class="expand">版本</th>
//                   <th data-class="expand">作者</th>
//                   <th data-class="expand"><i
//                     className="fa fa-fw fa-calendar txt-color-blue hidden-md hidden-sm hidden-xs"/>
//                     &nbsp;&nbsp; 发布时间</th>
//                   <th data-class="expand">描述</th>
//                 </tr>
//                 </thead>
//               </Datatable>
//             </div>
//           </div>
//           { this.showSmartNotification() }
//         </JarvisWidget>
//       )
//     }
//
//     return (
//       <JarvisWidget editbutton={false} color="darken">
//         <header><span className="widget-icon"> <i className="fa fa-table"/> </span> <h2>Standard
//           Data Tables</h2></header>
//         <div>
//           <div className="widget-body no-padding"><Datatable
//             options={{
//                                         ajax: 'api/tables/datatables.standard.json',
//                                         columns: [ {data: "id"}, {data: "name"}, {data: "phone"}, {data: "company"}, {data: "zip"}, {data: "city"}, {data: "date"} ] }}
//             paginationLength={true} className="table table-striped table-bordered table-hover"
//             width="100%">
//             <thead>
//             <tr>
//               <th data-hide="phone">ID</th>
//               <th data-class="expand"><i
//                 className="fa fa-fw fa-user text-muted hidden-md hidden-sm hidden-xs"/>
//                 Name
//               </th>
//               <th data-hide="phone"><i
//                 className="fa fa-fw fa-phone text-muted hidden-md hidden-sm hidden-xs"/>
//                 Phone
//               </th>
//               <th>Company</th>
//               <th data-hide="phone,tablet"><i
//                 className="fa fa-fw fa-map-marker txt-color-blue hidden-md hidden-sm hidden-xs"/>
//                 Zip
//               </th>
//               <th data-hide="phone,tablet">City</th>
//               <th data-hide="phone,tablet"><i
//                 className="fa fa-fw fa-calendar txt-color-blue hidden-md hidden-sm hidden-xs"/>
//                 Date
//               </th>
//             </tr>
//             </thead>
//           </Datatable></div>
//         </div>
//       </JarvisWidget>
//     )
//   }
// }










// detailsFormat(d){
//
//   return `<table cellPadding="5" cellSpacing="0" border="0" class="table table-hover table-condensed">
//             <tbody>
//             <tr>
//                 <td style="width:100px">名称：</td>
//                 <td><input type="text" id="row-43-age" name="row-43-age" value="${d.pluginname}"></td>
//             </tr>
//             <tr>
//                 <td>类别：</td>
//                 <td><select name="category" ref="category" defaultValue={"类别"}>
//                         <option value="类别" disabled={true}>类别</option>
//                         <option value="核心插件">核心插件</option>
//                         <option value="显示插件">显示插件</option>
//                         <option value="通信插件">通信插件</option>
//                         <option value="辅助插件">辅助插件</option>
//                 </select></td>
//             </tr>
//             <tr>
//                 <td>版本：</td>
//                 <td><input type="text" id="row-43-age" name="row-43-age" value="${d.version}"></td>
//             </tr>
//             <tr>
//                 <td>作者：</td>
//                 <td><input type="text" id="row-43-age" name="row-43-age" value="${d.author}"></td>
//             </tr>
//             <tr>
//                 <td>发布时间：</td>
//                 <td><input type="text" id="row-43-age" name="row-43-age" value="${d.releasedate}"></td>
//             </tr>
//             <tr>
//                 <td>描述：</td>
//                 <td><input type="text" id="row-43-age" name="row-43-age" value="${d.description}"></td>
//             </tr>
//             <tr>
//                 <td>操作:</td>
//                 <td>
//                   <button class='btn btn-xs btn-success'>保存修改</button>
//                   <button class='btn btn-xs btn-danger' style='margin-left:5px'>删除插件</button>
//                 </td>
//             </tr>
//             </tbody>
//         </table>`
// }


