/**
 * Created by griga on 12/1/15.
 */

import React from 'react'
import _ from 'lodash'
import classnames from 'classnames'


let JarvisWidget = React.createClass({
  getDefaultProps: function() {
    return {
      colorbutton: true,
      editbutton: true,
      togglebutton: true,
      deletebutton: true,
      fullscreenbutton: true,
      custombutton: false,
      collapsed: false,
      sortable: true,
      hidden: false,
      color: false,
      load: false,
      refresh: false
    };
  },

  render: function(){
    var colorClass = this.props.color ? 'jarviswidget-color-' + this.props.color : ''
    var classes = classnames('jarviswidget', colorClass, {
      'jarviswidget-sortable': this.props.sortable == true
    });

    var widgetProps = {};

    this.widgetId = _.uniqueId('jarviswidget-');
    // this.prevIsCollapsed = undefined; // previous javis widget collapsed state

    ['colorbutton', 'editbutton', 'togglebutton', 'deletebutton',
      'fullscreenbutton', 'custombutton', 'sortable'].forEach(function(option){
      if(!this.props[option])
        widgetProps['data-widget-'+option] = false
    }.bind(this));

    ['hidden'].forEach(function(option){
      if(this.props[option])
        widgetProps['data-widget-'+option] = true
    }.bind(this));


    const { setExpand } = this.props;
    ['collapsed'].forEach(function(option){
      if(this.props[option]) {
        widgetProps['data-widget-'+option] = true
      } else {
        widgetProps['data-widget-'+option] = false
      }

      if (setExpand === true || setExpand === false)
        $(".jarviswidget-toggle-btn" ).click();

      // if (this.prevIsCollapsed !== widgetProps['data-widget-'+option])
      //   $(".jarviswidget-toggle-btn" ).click();
      // this.prevIsCollapsed = widgetProps['data-widget-'+option];


      // if (setExpand === true && widgetProps['data-widget-'+option] === true) {
      //   $(".jarviswidget-toggle-btn" ).click();
      //   widgetProps['data-widget-'+option] =false;
      // } else if (setExpand === false && widgetProps['data-widget-'+option] === false) {
      //   $(".jarviswidget-toggle-btn" ).click();
      //   widgetProps['data-widget-'+option] =true;
      // }
    }.bind(this));

    ['refresh', 'load'].forEach(function(option){
      if(this.props[option])
        widgetProps['data-widget-'+option] = this.props[option]
    }.bind(this));


    // $(("#"+this.widgetId).toString()).removeClass("data-widget-collapsed");
    // $(("#"+this.widgetId).toString()+ ' a.data-widget-togglebutton').trigger('click');
    // $(this.refs[this.widgetId]).find('.data-widget-togglebutton').trigger('click');


    return (
      <div className={classes} id={this.widgetId} ref={this.widgetId}
        {...widgetProps}
      >{this.props.children}</div>
    )
  },
  componentDidMount: function(){
    $(this.refs[this.widgetId]).find('.widget-body').prepend('<div class="jarviswidget-editbox"><input class="form-control" type="text"></div>');
  }
});

JarvisWidget.Body = React.createClass({
  render: function(){
    let {children, props} = {...this.props};
    return (
      <div {...props}>
        <div className="widget-body">
          {children}
        </div>
      </div>
    )
  }
});

export default JarvisWidget

