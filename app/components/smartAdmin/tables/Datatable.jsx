import React from 'react'
import _ from 'lodash'

import ScriptLoader from '../utils/mixins/ScriptLoader.jsx'
import ElementHolder from '../utils/mixins/ElementHolder.jsx'

import AjaxActions from '../actions/AjaxActions'

let Datatable = React.createClass({
  mixins: [ScriptLoader, ElementHolder],

  componentDidMount: function () {
    this.loadScript('/vendor.datatables.js').then(function () {
      this._datatable();
    }.bind(this))
  },

  componentDidUpdate: function(){

    // Only update Datatable when it is initialized
    if (this.initialized === true) {
      const { newPlugin } = this.props;

      // When new added plugin is avaialbe
      if (_.trim(newPlugin).length > 0) {
        // Add new row when react UI component updated
        var element = $(this.getHold());
        var _dataTable = element.DataTable();
        _dataTable.row.add(newPlugin).draw();
      }

      // _dataTable
      //   .clear()
      //   .draw();
    }

  },

  _datatable: function () {

    var element = $(this.getHold());
    var options = this.props.options || {}

    let toolbar = '';
    if (options.buttons)
      toolbar += 'B';
    if (this.props.paginationLength)
      toolbar += 'l';
    if (this.props.columnsHide)
      toolbar += 'C';

    if(typeof options.ajax === 'string'){
      let url = options.ajax;
      options.ajax = {
        url: url,
        complete: function(xhr){
          AjaxActions.contentLoaded(xhr)
        }
      }
    }

    options = _.extend(options, {

      "dom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs text-right'" + toolbar + ">r>" +
      "t" +
      "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
      "language": {
        "sProcessing":   "处理中...",
        "sLengthMenu":   "显示 _MENU_ 项结果",
        "sZeroRecords":  "没有匹配结果",
        "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix":  "",
        "sSearch":       "<span class='input-group-addon input-sm'><i class='glyphicon glyphicon-search'></i></span> ",
        "sUrl":          "",
        "sEmptyTable":     "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands":  ",",
        "oPaginate": {
          "sFirst":    "首页",
          "sPrevious": "上页",
          "sNext":     "下页",
          "sLast":     "末页"
        },
        "oAria": {
          "sSortAscending":  ": 以升序排列此列",
          "sSortDescending": ": 以降序排列此列"
        }
      },
      "autoWidth": false,
      retrieve: true,
      responsive: true,
    });

    var _dataTable;
    _dataTable = element.DataTable(options);

    if (this.props.filter) {
      // Apply the filter
      element.on('keyup change', 'thead th input[type=text]', function () {
        _dataTable
          .column($(this).parent().index() + ':visible')
          .search(this.value)
          .draw();

      });
    }

    if (!toolbar) {
      element.parent().find(".dt-toolbar").append('<div class="text-right"><img src="styles/img/logo.png" alt="SmartAdmin" style="width: 111px; margin-top: 3px; margin-right: 10px;"></div>');
    }

    if(this.props.detailsFormat){
      let format = this.props.detailsFormat;
      element.on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = _dataTable.row( tr );
        if ( row.child.isShown() ) {
          row.child.hide();
          tr.removeClass('shown');
        }
        else {
          row.child( format(row.data()) ).show();
          tr.addClass('shown');
        }
      })
    }

    // Set Datatable component is initialized othewise caused '_dataTable' not funound
    // error in function 'componentDidUpdate()' at startup process
    this.initialized = true;
  },

  render: function () {
    let {children, ...props} = this.props;

    return (
      <table {...props}>
        {children}
      </table>
    )
  }
});

export default Datatable


// import React from 'react';
// import ReactDOM from 'react-dom';
//
// import $ from 'jquery'; // eslint-disable-line
// import 'bootstrap';
// import 'datatables';
// import 'datatables-tabletools';
// import 'datatables-colreorder';
// import 'datatables-scroller';
// import 'datatables-bootstrap';
//
// import language from './locale';
//
// $.fn.dataTable.ext.errMode = function handleError(e, settings, techNote, message) { // eslint-disable-line
//   console.error(arguments);
// };
//
// class Datatable extends React.Component {
//
//   static propTypes = {
//     children: React.PropTypes.node,
//     columns: React.PropTypes.array,
//     order: React.PropTypes.array,
//     dataSource: React.PropTypes.func,
//   };
//
//   static defaultProps = {};
//
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//
//   componentDidMount() {
//     const options = Object.assign({
//       language: language,          // 国际化语言设置
//       ajax: this.props.dataSource,
//     }, this.props);
//     $(this.getTableDomNode()).DataTable(options); // eslint-disable-line new-cap
//   }
//
//   componentWillUnmount() {
//     const table = $(this.getTableDomNode()).DataTable(); // eslint-disable-line new-cap
//     table.destroy();
//   }
//
//   getTableDomNode() {
//     return ReactDOM.findDOMNode(this);
//   }
//
//   render() {
//     const {columns, data, ajax, children} = this.props;
//
//     if (!columns && !data && !ajax && children) {
//       return children;
//     }
//
//     return (
//       <table className="table table-striped table-hover">
//         {this.props.children}
//       </table>
//     );
//   }
// }
//
// export default Datatable;