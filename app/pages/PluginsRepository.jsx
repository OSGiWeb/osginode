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

  renderDataTable() {
    const { isPrivate } = this.props.plugin;

    if (isPrivate) {
      return (
            <Datatable
              options={{
                      ajax: 'api/tables/datatables.standard.json',
                      columns: [
                        {data: "id"},
                        {data: "name"},
                        {data: "phone"},
                        {data: "company"},
                        {data: "zip"},
                        {data: "city"},
                        {data: "date"}],
                      buttons: ['copy', 'excel', 'pdf']
                      }}
              className="table table-striped table-bordered table-hover"
              width="100%">
              <thead>
              <tr>
                <th data-class="expand">ID</th>
                <th data-class="expand">名称</th>
                <th data-class="expand">类别</th>
                <th data-class="expand">版本</th>
                <th data-class="expand">Zip</th>
                <th data-class="expand">City</th>
                <th data-class="expand">Date</th>
              </tr>
              </thead>
            </Datatable>
      )
    }

    return (
          <Datatable
            options={{
                      ajax: 'api/tables/datatables.standard.json',
                      columns: [
                        {data: "id"},
                        {data: "name"},
                        {data: "phone"},
                        {data: "company"},
                        {data: "zip"},
                        {data: "city"},
                        {data: "date"}],
                      buttons: ['copy', 'excel', 'pdf']
                      }}
            className="table table-striped table-bordered table-hover"
            width="100%">
            <thead>
            <tr>
              <th data-hide="mobile-p">ID</th>
              <th data-class="expand">公共插件名称</th>
              <th>Phone</th>
              <th data-hide="mobile-p">Company</th>
              <th data-hide="mobile-p,tablet-p">Zip</th>
              <th data-hide="mobile-p,tablet-p">City</th>
              <th data-hide="mobile-p,tablet-p">Date</th>
            </tr>
            </thead>
          </Datatable>
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
              <JarvisWidget editbutton={false} color="blueDark">
                <header>
                  <span className="widget-icon"> <i className="fa fa-table"/> </span>
                  <h2>{classnames({ '私有插件列表': isPrivate, '公共插件列表': !isPrivate })}</h2>
                  <div className="widget-toolbar">
                    <button className={classnames(["btn btn-xs btn-default"])} onClick={this.toggleMode}>
                      <i className={classnames({ 'fa fa-archive': isPrivate, 'fa fa-cloud': !isPrivate })}/>
                      &nbsp;&nbsp; 切换仓库
                    </button>
                  </div>
                </header>
                <div>
                  <div className="widget-body no-padding">
                    {this.renderDataTable()}
                  </div>
                </div>
              </JarvisWidget>
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
