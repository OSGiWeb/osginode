import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import classnames from 'classnames'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import UiValidate from '../components/smartAdmin/forms/validation/UiValidate.jsx'
import UiDatepicker from '../components/smartAdmin/forms/inputs/UiDatepicker.jsx'
import SubHeader from '../layout/SubHeader.jsx'
import BigBreadcrumbs from '../components/smartAdmin/layout/navigation/components/BigBreadcrumbs.jsx'
import WidgetGrid from '../components/smartAdmin/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../components/smartAdmin/layout/widgets/JarvisWidget.jsx'
import Datatable from '../components/smartAdmin/tables/Datatable.jsx'
import { Dropdown, MenuItem } from 'react-bootstrap'

import { toggleStatus, createPlugin, fetchPlugins, showNotificationDone,
  resetStoreStates, setDatatableSelectedData, updatePlugin, deletePlguin } from '../actions/plugins';


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


class PublicRepository extends Component {

  //TODO: Data that needs to be called before rendering the component This is used for server-side rending
  // via the fetchComponentDataBeforeRender() method
  // static need = [
  //   fetchPlugins
  // ]

  constructor(props) {
    super(props);

    // Function called from events (e.g. 'click', 'submit'...) must be bound to 'this' class,
    // Otherwise fields in 'this.props' is NOT avaiable
    // this.onToggleStatus = this.onToggleStatus.bind(this);
    // this.onAddPluginSubmit = this.onAddPluginSubmit.bind(this);
    // this.onEditPluginSubmit = this.onEditPluginSubmit.bind(this);
    // this.showSmartNotification = this.showSmartNotification.bind(this);
    this.onDatatableRowSelected = this.onDatatableRowSelected.bind(this);
    // this.onDeletePluginSubmit = this.onDeletePluginSubmit.bind(this);

    // no server-side rendering, just get plugins info here
    // const {dispatch} = this.props;
    // dispatch(fetchPlugins());
  }

  componentDidMount() {
  }

  // Deconstructor
  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch(resetStoreStates());
  }

  // showSmartNotification() {
  //   const {dispatch} = this.props;
  //   const { isCreated, isUpdated, isDeleted } = this.props.plugin;
  //
  //   // TODO: Add waiting icon to show the plugin adding process
  //   // TODO: Show valid plugin infomation on message boxes
  //   if (isCreated !== undefined || isUpdated !== undefined || isDeleted !== undefined) {
  //     if (isCreated === true) {
  //       $.bigBox({
  //         title: "插件添加成功！",
  //         content: "插件名：高度窗；提交人：许昀",
  //         color: "#739E73",
  //         timeout: 2000,
  //         icon: "fa fa-check",
  //         // number: "4"
  //       });
  //     } else if (isCreated === false) {
  //       $.bigBox({
  //         title: "插件添加失败！",
  //         content: "插件名：高度窗；提交人：许昀",
  //         color: "#296191",
  //         timeout: 2000,
  //         icon: "fa fa-check",
  //         // number: "4"
  //       });
  //     }
  //
  //     // if (isUpdated === true) {
  //     //   $.bigBox({
  //     //     title: "插件更新成功！",
  //     //     content: "插件名：高度窗；提交人：许昀",
  //     //     color: "#739E73",
  //     //     timeout: 2000,
  //     //     icon: "fa fa-check",
  //     //     // number: "4"
  //     //   });
  //     // } else if (isUpdated === false){
  //     //   $.bigBox({
  //     //     title: "插件更新失败！",
  //     //     content: "插件名：高度窗；提交人：许昀",
  //     //     color: "#296191",
  //     //     timeout: 2000,
  //     //     icon: "fa fa-check",
  //     //     // number: "4"
  //     //   });
  //     // }
  //     // Notification is shown, set related state to default value to avoid render notification again
  //     dispatch(showNotificationDone());
  //   }
  //
  //   // $.smallBox({
  //   //   title: "插件添加成功！",
  //   //   content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
  //   //   color: "#296191",
  //   //   iconSmall: "fa fa-thumbs-up bounce animated",
  //   //   timeout: 4000
  //   // });
  // }
  //
  // onAddPluginSubmit() {
  //
  //   const { userFullname } = this.props.user;
  //
  //   // Sending plugin data to node and saving to database
  //   const { dispatch } = this.props;
  //
  //   // TEST plugin dependencies
  //   let dependencies = [];
  //   dependencies[0] = {'name':'PluginA', 'version':'0.0.1'};
  //   dependencies[1] = {'name':'PluginB', 'version':'0.0.2'};
  //
  //   let name = dependencies[0].name;
  //   let version = dependencies[0].version;
  //   // TEST plugin dependencies
  //
  //   dispatch(createPlugin({
  //     pluginname: ReactDOM.findDOMNode(this.refs.pluginname).value,
  //     symbolicname: ReactDOM.findDOMNode(this.refs.symbolicname).value,
  //     category: ReactDOM.findDOMNode(this.refs.category).value,
  //     version: ReactDOM.findDOMNode(this.refs.version).value,
  //     author: userFullname,
  //     date: ReactDOM.findDOMNode(this.refs.date).value,
  //     description: ReactDOM.findDOMNode(this.refs.description).value,
  //     dependencies: dependencies,
  //     isprivate: true,
  //     statusIcon: "<span class='label label-danger'>私有</span>"
  //   }));
  // }

  onDatatableRowSelected(rowData, isSelected) {
    // Single row selection
    var data = rowData[0];

    const {dispatch} = this.props;
    dispatch(setDatatableSelectedData(data, isSelected));
  }

  // // Set plugin as private plugin or public plugin
  // // true: private / false: public plugin
  // onToggleStatus() {
  //   // const {dispatch} = this.props;
  //   // const { selectedData } = this.props.plugin;
  //   //
  //   // status = ( !selectedData.isprivate );
  //   // dispatch(toggleStatus(selectedData.id, selectedData.index, status));
  //
  //
  //   // TODO: use update plugin to change 'isprivate' prop, and delete all params which used to change 'plugins[]' in store
  //   const { dispatch } = this.props;
  //   const { selectedData } = this.props.plugin;
  //
  //   selectedData.isprivate = !selectedData.isprivate;
  //   selectedData.statusIcon = selectedData.isprivate ? "<span class='label label-danger'>私有</span>" :
  //     "<span class='label label-success'>公共</span>";
  //
  //   // Dispatch action
  //   dispatch(updatePlugin(selectedData));
  // }
  //
  // onEditPluginSubmit() {
  //   const { dispatch } = this.props;
  //   const { selectedData } = this.props.plugin;
  //   const { userFullname } = this.props.user
  //
  //   selectedData.pluginname = ReactDOM.findDOMNode(this.refs.editpluginname).value;
  //   selectedData.symbolicname = ReactDOM.findDOMNode(this.refs.editsymbolicname).value;
  //   selectedData.category = ReactDOM.findDOMNode(this.refs.editcategory).value;
  //   selectedData.version = ReactDOM.findDOMNode(this.refs.editversion).value;
  //   selectedData.author = userFullname;
  //   selectedData.date = ReactDOM.findDOMNode(this.refs.editdate).value;
  //   selectedData.description = ReactDOM.findDOMNode(this.refs.editdescription).value;
  //
  //   dispatch(updatePlugin(selectedData));
  // }
  //
  // onDeletePluginSubmit() {
  //   const { dispatch } = this.props;
  //   const { selectedData } = this.props.plugin;
  //   dispatch(deletePlguin(selectedData.id, selectedData.index));
  // }

  /**
   * renderAddPluginModal
   * @returns {XML}
   */
  // renderAddPluginModal() {
  //
  //   return (
  //     <div className="modal fade" id="addPluginModal" tabIndex="-1" role="dialog"
  //          aria-labelledby="addPluginModalLabel" aria-hidden="true">
  //       <div className="modal-dialog">
  //         <div className="modal-content">
  //           <div className="modal-header">
  //             <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
  //               &times;
  //             </button>
  //             <h2 className="row-seperator-header" id="addPluginModalLabel">
  //               <i className="fa fa-reorder"/> 添加插件 </h2>
  //           </div>
  //           <div className="modal-body">
  //
  //             <div>
  //               <div className="widget-body no-padding">
  //                 <UiValidate options={validationOptions}>
  //                   <form id="addplugin-form" className="smart-form" noValidate="novalidate">
  //                     <fieldset>
  //                       <div className="row">
  //                         <section className="col col-6">
  //                           <label className="input"> <i className="icon-append fa fa-puzzle-piece"/>
  //                             <input type="text" name="pluginname" ref="pluginname" placeholder="名称"/>
  //                           </label>
  //                         </section>
  //                         <section className="col col-6">
  //                           <label className="input"> <i className="icon-append fa fa-user"/>
  //                             <input type="text" disabled="disabled" name="symbolicname" ref="symbolicname" placeholder="标识" value="com.plugins.test"/>
  //                           </label>
  //                         </section>
  //                       </div>
  //
  //                       <div className="row">
  //                         <section className="col col-6">
  //                           <label className="input"> <i className="icon-append fa fa-file-excel-o"/>
  //                             <input type="text" disabled="disabled" name="version" ref="version" placeholder="版本号" value="0.0.1" />
  //                           </label>
  //                         </section>
  //                         <section className="col col-6">
  //                           <label className="select">
  //                             <select name="category" ref="category" defaultValue={"类别"}>
  //                               <option value="类别" disabled={true}>类别</option>
  //                               <option value="核心插件">核心插件</option>
  //                               <option value="显示插件">显示插件</option>
  //                               <option value="通信插件">通信插件</option>
  //                               <option value="辅助插件">辅助插件</option>
  //                             </select> <i/> </label>
  //                         </section>
  //                       </div>
  //
  //                       <div className="row">
  //                         <section className="col col-6">
  //                           <label className="input"> <i className="icon-append fa fa-calendar"/>
  //                             <UiDatepicker type="text" name="date" ref="date" id="date"
  //                                           placeholder="发布时间"/>
  //                           </label>
  //                         </section>
  //                       </div>
  //                     </fieldset>
  //
  //                     <fieldset>
  //                       <section>
  //                         <div className="input input-file">
  //                     <span className="button"><input id="file2" type="file" name="pluginfile"
  //                                                     onchange="this.parentNode.nextSibling.value = this.value"/>
  //                       上传插件</span>
  //                           <input type="text" placeholder="上传插件包" readOnly={true}/>
  //                         </div>
  //                       </section>
  //
  //                       <section>
  //                         <label className="textarea"> <i className="icon-append fa fa-comment"/>
  //                           <textarea rows="5" disabled="disabled" name="description" ref="description" placeholder="插件描述" value="测试插件，部分域不可被输入信息。"/>
  //                         </label>
  //                       </section>
  //                     </fieldset>
  //                   </form>
  //                 </UiValidate>
  //               </div>
  //             </div>
  //
  //           </div>
  //           <div className="modal-footer">
  //             <button type="button" className="btn btn-default" data-dismiss="modal">
  //               取消
  //             </button>
  //             <button type="button" className="btn btn-primary" data-dismiss="modal"
  //                     onClick={this.onAddPluginSubmit}>
  //               添加插件
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  /**
   * renderEditPluginModal
   * @returns {XML}
   */
  // renderEditPluginModal() {
  //
  //   const { isSelected, selectedData } = this.props.plugin;
  //
  //   if (isSelected) {
  //     return (
  //       <div className="modal fade" id="editPluginModal" tabIndex="-1" role="dialog"
  //            aria-labelledby="editPluginModalLabel" aria-hidden="true">
  //         <div className="modal-dialog">
  //           <div className="modal-content">
  //             <div className="modal-header">
  //               <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
  //                 &times;
  //               </button>
  //               <h2 className="row-seperator-header" id="editPluginModalLabel" >
  //                 <i className="fa fa-reorder"/> 编辑插件 </h2>
  //             </div>
  //             <div className="modal-body">
  //
  //               <div>
  //                 <div className="widget-body no-padding">
  //                   <UiValidate options={validationOptions}>
  //                     <form id="editplugin-form" className="smart-form" noValidate="novalidate">
  //                       <fieldset>
  //                         <div className="row">
  //                           <section className="col col-6">
  //                             <label className="input"> <i className="icon-append fa fa-puzzle-piece"/>
  //                               <input type="text" name="editpluginname" ref="editpluginname" placeholder="名称" defaultValue={selectedData.pluginname}/>
  //                             </label>
  //                           </section>
  //                           <section className="col col-6">
  //                             <label className="input"> <i className="icon-append fa fa-user"/>
  //                               <input type="text" name="editsymbolicname" ref="editsymbolicname" placeholder="标识" defaultValue={selectedData.symbolicname}/>
  //                             </label>
  //                           </section>
  //                         </div>
  //
  //                         <div className="row">
  //                           <section className="col col-6">
  //                             <label className="input"> <i className="icon-append fa fa-file-excel-o"/>
  //                               <input type="text" name="editversion" ref="editversion" placeholder="版本号" defaultValue={selectedData.version}/>
  //                             </label>
  //                           </section>
  //                           <section className="col col-6">
  //                             <label className="select">
  //                               <select name="editcategory" ref="editcategory" defaultValue={selectedData.category}>
  //                                 <option value="类别" disabled={true}>类别</option>
  //                                 <option value="核心插件">核心插件</option>
  //                                 <option value="显示插件">显示插件</option>
  //                                 <option value="通信插件">通信插件</option>
  //                                 <option value="辅助插件">辅助插件</option>
  //                               </select> <i/> </label>
  //                           </section>
  //                         </div>
  //
  //                         <div className="row">
  //                           <section className="col col-6">
  //                             <label className="input"> <i className="icon-append fa fa-calendar"/>
  //                               <UiDatepicker type="text" name="editdate" ref="editdate" id="editdate"
  //                                             placeholder="发布时间" defaultValue={selectedData.date}/>
  //                             </label>
  //                           </section>
  //                         </div>
  //                       </fieldset>
  //
  //                       <fieldset>
  //                         <section>
  //                           <div className="input input-file">
  //                     <span className="button"><input id="editfile2" type="editfile" name="editpluginfile"
  //                                                     onchange="this.parentNode.nextSibling.value = this.value"/>
  //                       上传插件</span>
  //                             <input type="text" placeholder="上传插件包" readOnly={true}/>
  //                           </div>
  //                         </section>
  //                         <section>
  //                           <label className="textarea"> <i className="icon-append fa fa-comment"/>
  //                             <textarea rows="5" name="editdescription" ref="editdescription" placeholder="插件描述" defaultValue={selectedData.description}/>
  //                           </label>
  //                         </section>
  //                       </fieldset>
  //                     </form>
  //                   </UiValidate>
  //                 </div>
  //               </div>
  //
  //             </div>
  //             <div className="modal-footer">
  //               <button type="button" className="btn btn-default" data-dismiss="modal">
  //                 取消
  //               </button>
  //               <button type="button" className="btn btn-primary" data-dismiss="modal"
  //                       onClick={this.onEditPluginSubmit}>
  //                 更新插件
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   }
  // }

  renderPublicRepository() {
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
                {/*data-toggle="modal" data-target="#addPluginModal"*/}
                <button className={classnames(["btn btn-xs btn-primary"])} >
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
                    <MenuItem >
                      <i className="fa fa-cloud-upload"/>&nbsp;提交
                    </MenuItem>
                    <MenuItem >
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

            { this.renderPublicDataTable() }

          </JarvisWidget>
        </article>
      </div>
    )
  }

  renderPublicDataTable() {
    // TODO: Only render the plugin datatable when the data is arrived in store (temp. solution for debugging this page)
    // if (_isFetched) {
    const { isPrivate, plugins, newPlugin, updatedPlugin, isDeleted } = this.props.plugin;

    // Datatable options
    let options = {
      // data: plugins, // DONOT use manual request to database, use ajax request instead
      ajax: {
        url: '/pluginRepository',
        dataSrc: function ( json ) {

          // Delete private plugin in json data from database
          var publicPlugins = _.remove(json, function(obj) {
            return obj.isprivate == false;
          });

          // Format data which will be saved in store
          let formatData = [];
          for (let i = 0; i < publicPlugins.length; i++) {
            formatData[i] = _.omit(publicPlugins[i], '_id', '__v'); // Delete unused plugin info
            formatData[i].index = i + 1; // Add plugin numeric index

            // Set status icon based on plugin status (private / public)
            formatData[i].statusIcon = formatData[i].isprivate ? "<span class='label label-danger'>私有</span>" :
              "<span class='label label-success'>公共</span>"
            ;
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
        {data: "version"}, {data: "author"}, {data: "date"}, {data: "description"},
        {data: "statusIcon"}]
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
              <th data-class="expand">状态</th>
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
        <WidgetGrid>
          { this.renderPublicRepository() }
        </WidgetGrid>

        {/*this.renderAddPluginModal()*/}
        {/*this.renderEditPluginModal()*/}
        {/*this.showSmartNotification()*/}

      </div>
    )
  }
}

PublicRepository.propTypes = {
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
export default connect(mapStateToProps)(PublicRepository);


