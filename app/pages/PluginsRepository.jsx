import React, { Component } from 'react'
import _ from 'lodash'

import SubHeader from './layout/SubHeader.jsx'
import BigBreadcrumbs from '../components/smartAdmin/layout/navigation/components/BigBreadcrumbs.jsx'
import WidgetGrid from '../components/smartAdmin/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../components/smartAdmin/layout/widgets/JarvisWidget.jsx'
import Datatable from '../components/smartAdmin/tables/Datatable.jsx'

class PluginsRepository extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
                  <h2>私有插件列表</h2>
                </header>
                <div>
                  <div className="widget-body no-padding">

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
                        <th data-class="expand">Name</th>
                        <th>Phone</th>
                        <th data-hide="mobile-p">Company</th>
                        <th data-hide="mobile-p,tablet-p">Zip</th>
                        <th data-hide="mobile-p,tablet-p">City</th>
                        <th data-hide="mobile-p,tablet-p">Date</th>
                      </tr>
                      </thead>
                    </Datatable>

                  </div>
                </div>
              </JarvisWidget>
            </article>
          </div>

          <div className="row">
            <article className="col-sm-12">
              <JarvisWidget editbutton={false} color="blueDark">
                <header>
                  <span className="widget-icon"> <i className="fa fa-table"/> </span>
                  <h2>公有插件列表</h2>
                </header>
                <div>
                  <div className="widget-body no-padding">

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
                        <th data-class="expand">Name</th>
                        <th>Phone</th>
                        <th data-hide="mobile-p">Company</th>
                        <th data-hide="mobile-p,tablet-p">Zip</th>
                        <th data-hide="mobile-p,tablet-p">City</th>
                        <th data-hide="mobile-p,tablet-p">Date</th>
                      </tr>
                      </thead>
                    </Datatable>

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

//
// let PrivateRepository = React.createClass({
//   render: function () {
//
//   }
// });

export default PluginsRepository