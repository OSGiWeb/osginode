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

import { togglePrivateRepositoryMode, createPlugin, fetchPlugins } from '../actions/plugins';


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


class PluginsRepository extends Component {

  //TODO: Data that needs to be called before rendering the component This is used for server-side rending
  // via the fetchComponentDataBeforeRender() method
  // static need = [
  //   fetchPlugins
  // ]

  constructor(props) {
    super(props);

    // Function called from events (e.g. 'click', 'submit'...) must be bound to 'this' class
    this.toggleMode = this.toggleMode.bind(this);
    this.onAddNewPluginSubmit = this.onAddNewPluginSubmit.bind(this);
    this.showSmartNotification = this.showSmartNotification.bind(this);

    // no server-side rendering, just get plugins info here
    const {dispatch} = this.props;
    dispatch(fetchPlugins());
  }

  toggleMode() {
    const {dispatch} = this.props;
    dispatch(togglePrivateRepositoryMode());
  }

  addNewPlugin() {

  }

  showSmartNotification() {
    // $.smallBox({
    //   title: "插件添加成功！",
    //   content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
    //   color: "#296191",
    //   iconSmall: "fa fa-thumbs-up bounce animated",
    //   timeout: 4000
    // });
    $.bigBox({
      title: "插件添加成功！",
      content: "插件名：高度窗；提交人：许昀",
      color: "#739E73",
      timeout: 2000,
      icon: "fa fa-check",
      // number: "4"
    });
  }

  onAddNewPluginSubmit() {

    // TODO: send data to server

    const {dispatch} = this.props;
    const id = 'NOT_DEFINED'; // Used to add md5 identifier later
    const pluginname = ReactDOM.findDOMNode(this.refs.pluginname).value;
    const category = ReactDOM.findDOMNode(this.refs.category).value;
    const version = ReactDOM.findDOMNode(this.refs.version).value;
    const author = '许昀'; // TODO: get authore name from user
    const releasedate = ReactDOM.findDOMNode(this.refs.releasedate).value;
    const description = ReactDOM.findDOMNode(this.refs.description).value;

    dispatch(createPlugin({
      id: id,
      pluginname: pluginname,
      category: category,
      version: version,
      author: author,
      releasedate: releasedate,
      description: description
    }));

    // If success
    this.showSmartNotification();
  }

  renderDataTableHeader(_isPrivate) {
    return (
      <header>
        <span className="widget-icon"> <i className="fa fa-table"/> </span>
        <h2>{classnames({'私有插件列表': _isPrivate, '公共插件列表': !_isPrivate})}</h2>
        <div className="widget-toolbar">
          <button className={classnames(["btn btn-xs btn-primary"])} onClick={this.toggleMode}>
            <i className={classnames({ 'fa fa-archive': _isPrivate, 'fa fa-cloud': !_isPrivate })}/>
            &nbsp;&nbsp; 切换仓库
          </button>
          &nbsp;&nbsp;
          <button className={classnames(["btn btn-xs btn-primary"])} onClick={this.addNewPlugin} data-toggle="modal"
                  data-target="#repoControlModal">
            <i className={classnames({ 'fa fa-plus': _isPrivate, 'fa  fa-upload': !_isPrivate })}/>
            &nbsp;&nbsp; {classnames({'添加新插件': _isPrivate, '提交插件': !_isPrivate})}
          </button>
        </div>
      </header>
    )
  }

  renderAddPluginForm() {
    return (
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
                    <label className="select">
                      <select name="category" ref="category" defaultValue={"0"}>
                        <option value="0" disabled={true}>类别</option>
                        <option value="1">核心插件</option>
                        <option value="2">显示插件</option>
                        <option value="3">通信插件</option>
                        <option value="4">辅助插件</option>
                      </select> <i/> </label>
                  </section>
                </div>

                <div className="row">
                  <section className="col col-6">
                    <label className="input"> <i className="icon-append fa fa-file-excel-o"/>
                      <input type="text" name="version" ref="version" placeholder="版本号"/>
                    </label>
                  </section>
                  <section className="col col-6">
                    <label className="input"> <i className="icon-append fa fa-user"/>
                      <input type="text" name="author" ref="author" placeholder="作者"/>
                    </label>
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
                    <textarea rows="5" name="description" ref="description" placeholder="插件描述"/>
                  </label>
                </section>
              </fieldset>
            </form>
          </UiValidate>
        </div>
      </div>
    )
  }

  renderModalTable(_isPrivate) {

    if (_isPrivate) {
      return (
        <div className="modal fade" id="repoControlModal" tabIndex="-1" role="dialog"
             aria-labelledby="repoControlModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h2 className="row-seperator-header" id="repoControlModalLabel">
                  <i className="fa fa-reorder"/> 添加插件 </h2>
              </div>
              <div className="modal-body">

                {this.renderAddPluginForm()}

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">
                  取消
                </button>
                <button type="button" className="btn btn-primary" data-dismiss="modal"
                        onClick={this.onAddNewPluginSubmit}>
                  添加插件
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="modal fade" id="repoControlModal" tabIndex="-1" role="dialog"
           aria-labelledby="repoControlModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
              <h4 className="modal-title" id="repoControlModalLabel">插件提交</h4>
            </div>
            <div className="modal-body">

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Title" required/>
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" placeholder="Content" rows="5" required/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="category"> Category</label>
                    <select className="form-control" id="category">
                      <option>Articles</option>
                      <option>Tutorials</option>
                      <option>Freebies</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="tags"> Tags</label>
                    <input type="text" className="form-control" id="tags" placeholder="Tags"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="well well-sm well-primary">
                    <form className="form form-inline " role="form">
                      <div className="form-group">
                        <input type="text" className="form-control" value="" placeholder="Date" required/>
                      </div>
                      <div className="form-group">
                        <select className="form-control">
                          <option>Draft</option>
                          <option>Published</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn btn-success btn-sm">
                          <span className="glyphicon glyphicon-floppy-disk"/> Save
                        </button>
                        <button type="button" className="btn btn-default btn-sm">
                          <span className="glyphicon glyphicon-eye-open"/> Preview
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-primary">
                Post Article
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderDataTable(_isPrivate, _isFetched, _plugins) {
    // TODO: workaround for data not realtime arriving! Use server-side rendering instead!
    // TODO: considering when first use database and the plugin data is null!
    if (_isFetched) {

      // TODO: can't reload data and rerender table when added new plugin, JarvisWidget or Header problem?
      if (_isPrivate) {
        return (
          <JarvisWidget editbutton={false} color="blueDark">
            {this.renderDataTableHeader(_isPrivate)}
            <div>
              <div className="widget-body no-padding">
                <Datatable
                  options={{
                      data: _plugins,
                      columns: [
                        {data: "_id"}, {data: "id"}, {data: "pluginname"}, {data: "category"},
                        {data: "version"}, {data: "author"}, {data: "__v"}, {data: "releasedate"}, {data: "description"} ],
                }}
                  paginationLength={true} className="table table-striped table-bordered table-hover"
                  width="100%">
                  <thead>
                  <tr>
                    <th data-class="expand">_ID</th>
                    <th data-class="expand">ID</th>
                    <th data-class="expand">名称</th>
                    <th data-class="expand">类别</th>
                    <th data-class="expand">版本</th>
                    <th data-class="expand">作者</th>
                    <th data-class="expand">未知</th>
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
          </JarvisWidget>
        )
      }

      return (
        <JarvisWidget editbutton={false} color="blueDark">
          {this.renderDataTableHeader(_isPrivate)}
          <div>
            <div className="widget-body no-padding">
              <Datatable
                options={{
              ajax: 'api/tables/datatables.standard.json',
              columns: [
                {data: "id"}, {data: "name"},
                {data: "phone"}, {data: "company"},
                {data: "zip"}, {data: "city"},
                {data: "date"}]
              }}
                paginationLength={true} className="table table-striped table-bordered table-hover"
                width="100%">
                <thead>
                <tr>
                  <th data-class="expand">ID</th>
                  <th data-class="expand">名称</th>
                  <th data-class="expand">类别</th>
                  <th data-class="expand">版本</th>
                  <th data-class="expand"><i
                    className="fa fa-fw fa-calendar txt-color-blue hidden-md hidden-sm hidden-xs"/>
                    &nbsp;&nbsp; 发布时间
                  </th>
                  <th data-class="expand">发布人</th>
                  <th data-class="expand">描述</th>
                </tr>
                </thead>
              </Datatable>
            </div>
          </div>
        </JarvisWidget>
      )
    }
  }

  render() {
    const { isPrivate, isFetched, plugins } = this.props.plugin;


    return (
      <div id="content">
        <div className="row">
          <BigBreadcrumbs items={['插件开发', '插件仓库']} icon="table"
                          className="col-xs-12 col-sm-7 col-md-7 col-lg-4"/>
          <SubHeader />
        </div>

        <WidgetGrid>

          <div className="row">
            <article className="col-sm-12">
              {this.renderDataTable(isPrivate, isFetched, plugins)}
            </article>
          </div>

        </WidgetGrid>

        {this.renderModalTable(isPrivate)}
      </div>
    )
  }

}

PluginsRepository.propTypes = {
  plugin: PropTypes.object,
  dispatch: PropTypes.func
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    plugin: state.plugin
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(PluginsRepository);
