import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import {Link} from 'react-router'
import classnames from 'classnames'
import Msg from '../../../i18n/Msg.jsx'
import SmartMenuList from './SmartMenuList.jsx'

let config = window.SMARTADMIN_GLOBALS;
export default class SmartMenuItem extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    let item = this.props.item;
    const { data, onMenuItemClick } = this.props;
    // call back 'onMenuItemClick(item)' from upper/root component 'Navigation'
    onMenuItemClick(item);

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

  open(){
    let item = this.props.item;
    const { onMenuItemOpen } = this.props;
    onMenuItemOpen(item);
    this.getChildrenListNode().slideDown(config.menu_speed || 200);
  }

  close(){
    let item = this.props.item;
    const { onMenuItemClose } = this.props;
    onMenuItemClose(item);
    this.getChildrenListNode().slideUp(config.menu_speed || 200);
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

    let link = item.route ? <Link to={item.route} title={item.title} onClick={this.onClick}>
      {icon} {title} {badge}
    </Link> : <a href={item.href || '#'} onClick={this.onClick} title={item.title}>
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
  dispatch: PropTypes.func,
  onMenuItemClick: PropTypes.func,
  onMenuItemOpen: PropTypes.func,
  onMenuItemClose: PropTypes.func
};
