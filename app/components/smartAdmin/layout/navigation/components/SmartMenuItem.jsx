import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
// import ReactDOM from 'react-dom'
// import Reflux from 'reflux'
import { connect } from 'react-redux';
import { setActiveNavigationItem, toggleMenuItemOpenClose } from '../../../../../actions/navigations'; // TODO: change path
import {Link} from 'react-router'
import classnames from 'classnames'
import Msg from '../../../i18n/Msg.jsx'
import SmartMenuList from './SmartMenuList.jsx'
// import NavigationActions from './../actions/NavigationActions.js'
// import NavigationStore from '../stores/NavigationStore.js'

let config = window.SMARTADMIN_GLOBALS;
class SmartMenuItem extends Component {

  constructor(props) {
    super(props);
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  // getDefaultProps() {
  //   return {
  //     menuSpeed: config.menu_speed || 200
  //   }
  // }

  // shouldComponentUpdate(){
  //   return false
  // }

  onHandleNavigation() {
    const { data } = this.props.navigation;

    let item = this.props.item;
    item.updateActive();
    if(data.item._id == item._id){
      if(item.isOpen){
        this.close()
      } else {
        this.open()
      }
    } else if (!item.isParentOf(data.item) || item.isSibling(data.item)){
      this.close()
    }
  }

  onHandleClick(e) {
    e.preventDefault();
    let item = this.props.item;

    const { dispatch } = this.props;
    dispatch(setActiveNavigationItem(item));

    this.onHandleNavigation();
  }

  open(){
    let item = this.props.item;
    const { dispatch } = this.props;
    dispatch(toggleMenuItemOpenClose(item, true));

    this.getChildrenListNode().slideDown(config.menu_speed || 200);

    // setTimeout(function(){
    //   this.forceUpdate() // TODO:dispatch event
    // }.bind(this), config.menu_speed || 200)
  }
  close(){
    let item = this.props.item;
    const { dispatch } = this.props;
    dispatch(toggleMenuItemOpenClose(item, false));

    this.getChildrenListNode().slideUp(config.menu_speed || 200);

    // setTimeout(function(){
    //   this.forceUpdate() // TODO:dispatch event
    // }.bind(this), config.menu_speed || 200)
  }
  getChildrenListNode(){
    return $(findDOMNode(this)).find('>ul')
  }
  render() {
    var item = this.props.item;

    var title = !item.parent ? <span className="menu-item-parent"><Msg phrase={item.title} /></span> : <Msg phrase={item.title} />;
    var badge = item.badge ? <span className={item.badge.class}>{item.badge.label || ''}</span> : null;
    var childItems = item.items ? <SmartMenuList style={{
        display: (item.isOpen ? 'block' : 'none')
        }} isTop={false} items={item.items}/> : null;

    var icon = item.icon ? (
      item.counter ? <i className={item.icon}><em>{item.counter}</em></i> : <i className={item.icon}/>
    ) : null;

    var collapseSign = item.items ? (
      item.isOpen ? <b className="collapse-sign"><em className="fa fa-minus-square-o"/></b> : <b className="collapse-sign"><em className="fa fa-plus-square-o"/></b>
    ) : null;

    let link = item.route ? <Link to={item.route} title={item.title} onClick={this.onHandleClick}>
      {icon} {title} {badge}
    </Link> : <a href={item.href || '#'} onClick={this.onHandleClick} title={item.title}>
      {icon} {title} {badge}{collapseSign}
    </a>;

    let itemClasses = classnames({
      open: item.isOpen,
      active: item.isActive
    });

    return <li className={itemClasses}>{link}{childItems}</li>
  }

}

// export default SmartMenuItem
SmartMenuItem.propTypes = {
  navigation: PropTypes.object,
  dispatch: PropTypes.func
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    navigation: state.navigation
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(SmartMenuItem);



// let config = window.SMARTADMIN_GLOBALS;
//
// let SmartMenuItem = React.createClass({
//   getDefaultProps: function(){
//     return {
//       menuSpeed: config.menu_speed || 200
//     }
//   },
//   // mixins: [Reflux.listenTo(NavigationStore, '_handleNav')],
//   shouldComponentUpdate: function(){
//     return false
//   },
//   _handleNav: function(){ // data
//     const { data } = this.props.navigation;
//
//     let item = this.props.item;
//     item.updateActive();
//     if(data.item._id == item._id){
//       if(item.isOpen){
//         this._close()
//       } else {
//         this._open()
//       }
//     } else if (!item.isParentOf(data.item) || item.isSibling(data.item)){
//       this._close()
//     }
//   },
//   _handleClick: function (e) {
//     e.preventDefault();
//     let item = this.props.item;
//
//     const { dispatch } = this.props;
//     dispatch(setActiveNavigationItem(item));
//
//     this._handleNav();
//
//     // NavigationActions.activate(item); // trigger 'onActivate()' in 'NavigationStore.js'
//
//   },
//   _open: function(){
//     let item = this.props.item;
//     const { dispatch } = this.props;
//     dispatch(toggleMenuItemOpenClose(item, true));
//
//     this._getChildrenListNode().slideDown(this.props.menuSpeed);
//     setTimeout(function(){
//       this.forceUpdate()
//     }.bind(this), this.props.menuSpeed)
//   },
//   _close: function(){
//     let item = this.props.item;
//     const { dispatch } = this.props;
//     dispatch(toggleMenuItemOpenClose(item, false));
//
//     this._getChildrenListNode().slideUp(this.props.menuSpeed);
//     setTimeout(function(){
//       this.forceUpdate()
//     }.bind(this), this.props.menuSpeed)
//   },
//   _getChildrenListNode: function(){
//     return $(findDOMNode(this)).find('>ul')
//   },
//   render: function () {
//
//     var item = this.props.item;
//
//     var title = !item.parent ? <span className="menu-item-parent"><Msg phrase={item.title} /></span> : <Msg phrase={item.title} />;
//     var badge = item.badge ? <span className={item.badge.class}>{item.badge.label || ''}</span> : null;
//     var childItems = item.items ? <SmartMenuList style={{
//         display: (item.isOpen ? 'block' : 'none')
//         }} isTop={false} items={item.items}/> : null;
//
//     var icon = item.icon ? (
//       item.counter ? <i className={item.icon}><em>{item.counter}</em></i> : <i className={item.icon}/>
//     ) : null;
//
//     var collapseSign = item.items ? (
//       item.isOpen ? <b className="collapse-sign"><em className="fa fa-minus-square-o"/></b> : <b className="collapse-sign"><em className="fa fa-plus-square-o"/></b>
//     ) : null;
//
//     let link = item.route ? <Link to={item.route} title={item.title} onClick={this._handleClick}>
//       {icon} {title} {badge}
//     </Link> : <a href={item.href || '#'} onClick={this._handleClick} title={item.title}>
//       {icon} {title} {badge}{collapseSign}
//     </a>;
//
//     let itemClasses = classnames({
//       open: item.isOpen,
//       active: item.isActive
//     });
//
//     return <li className={itemClasses}>{link}{childItems}</li>
//   }
// });

