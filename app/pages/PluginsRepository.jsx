import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import classnames from 'classnames'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import SubHeader from './layout/SubHeader.jsx'
import BigBreadcrumbs from '../components/smartAdmin/layout/navigation/components/BigBreadcrumbs.jsx'
import WidgetGrid from '../components/smartAdmin/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../components/smartAdmin/layout/widgets/JarvisWidget.jsx'
import Datatable from '../components/smartAdmin/tables/Datatable.jsx'

import { togglePrivateRepositoryMode } from '../actions/plugins';

class PluginsRepository extends Component {
  constructor(props) {
    super(props);
    this.toggleMode = this.toggleMode.bind(this);
  }

  toggleMode() {
    const { dispatch } = this.props;
    dispatch(togglePrivateRepositoryMode());
  }

  renderDataTableHeader(_isPrivate) {
    return(
      <header>
        <span className="widget-icon"> <i className="fa fa-table"/> </span>
        <h2>{classnames({ '私有插件列表': _isPrivate, '公共插件列表': !_isPrivate })}</h2>
        <div className="widget-toolbar">
          <button className={classnames(["btn btn-xs btn-primary"])} onClick={this.toggleMode}>
            <i className={classnames({ 'fa fa-archive': _isPrivate, 'fa fa-cloud': !_isPrivate })}/>
            &nbsp;&nbsp; 切换仓库
          </button>
        </div>
      </header>
    )
  }

  renderDataTable(_isPrivate) {

    if (_isPrivate) {
      return (
        <JarvisWidget editbutton={false} color="blueDark">
          {this.renderDataTableHeader(_isPrivate)}
          <div>
            <div className="widget-body no-padding">
              <Datatable
                options={{
                      ajax: 'api/tables/datatables.filters.json',
                      columns: [
                        {data: "name"}, {data: "position"}, {data: "office"},
                        {data: "age"}, {data: "date"}, {data: "salary"} ],
                      buttons: ['excel', 'pdf']
                      }}
                className="table table-striped table-bordered table-hover"
                width="100%">
                <thead>
                <tr>
                  <th data-class="expand">ID</th>
                  <th data-class="expand">名称</th>
                  <th data-class="expand">类别</th>
                  <th data-class="expand">版本</th>
                  <th data-class="expand"><i className="fa fa-fw fa-calendar txt-color-blue hidden-md hidden-sm hidden-xs"/>
                    &nbsp;&nbsp; 发布时间</th>
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
        <Datatable
          options={{
                      ajax: 'api/tables/datatables.standard.json',
                      columns: [
                        {data: "id"}, {data: "name"},
                        {data: "phone"}, {data: "company"},
                        {data: "zip"}, {data: "city"},
                        {data: "date"}],
                      buttons: ['excel', 'pdf']
                      }}
          className="table table-striped table-bordered table-hover"
          width="100%">
          <thead>
          <tr>
            <th data-class="expand">ID</th>
            <th data-class="expand">名称</th>
            <th data-class="expand">类别</th>
            <th data-class="expand">版本</th>
            <th data-class="expand"><i
              className="fa fa-fw fa-calendar txt-color-blue hidden-md hidden-sm hidden-xs"/>
              &nbsp;&nbsp; 发布时间</th>
            <th data-class="expand">发布人</th>
            <th data-class="expand">描述</th>
          </tr>
          </thead>
        </Datatable>
      </JarvisWidget>
    )
  }

  render() {
    const { isPrivate } = this.props.plugin;

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
              {this.renderDataTable(isPrivate)}
            </article>
          </div>

        </WidgetGrid>

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
