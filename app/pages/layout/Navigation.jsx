/**
 * Created by griga on 11/24/15.
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { initRawItems, setActiveNavigationItem, toggleMenuItemOpenClose } from '../../actions/navigations'; // TODO: change path
import SmartMenuList from '../../components/smartAdmin/layout/navigation/components/SmartMenuList.jsx'
import MinifyMenu from '../../components/smartAdmin/layout/actions/MinifyMenu.jsx'
import LoginInfo from '../../components/smartAdmin/user/components/LoginInfo.jsx'

// Must add parameter "route" otherwise not works for SmartMenu
// (fixed: add validation in 'MenuItem' component)
const rawItems = {
  "items": [
    {
      "title": "主页",
      "icon": "fa fa-lg fa-fw fa-home",
      "items": [
        {
          "icon": "fa fa-user",
          "title": "用户管理",
          "route": "/home"
        },
        {
          "icon": "fa fa-file-text-o",
          "title": "项目管理",
          "route": "/home"
        },
        {
          "icon": "fa fa-gear",
          "title": "配置管理",
          "items": [
            {
              "icon": "fa fa-lg fa-fw fa-cloud",
              "title": "基本配置",
              "route": "/home"
            },
            {
              "icon": "fa fa-suitcase",
              "title": "插件配置",
              "route": "/home"
            }
          ]
        }
      ]
    },
    {
      "title": "插件仓库",
      "icon": "fa fa-lg fa-fw fa-puzzle-piece",
      "items": [
        {
          "icon": "fa fa-lg fa-fw fa-cloud",
          "title": "公有仓库",
          "route": "/home"
        },
        {
          "icon": "fa fa-suitcase",
          "title": "私有仓库",
          "route": "/datatables"
        },
        {
          "icon": "fa fa-group",
          "title": "应用配置向导",
          "route": "/home"
        },
        {
          "icon": "fa fa-comments",
          "title": "开发文档",
          "items": [
            {
              "icon": "fa fa-picture-o",
              "title": "开发流程",
              "route": "/home"
            },
            {
              "icon": "fa fa-picture-o",
              "title": "代码规范",
              "route": "/home"
            },
            {
              "icon": "fa fa-picture-o",
              "title": "Post View",
              "route": "/home"
            }
          ]
        },
        {
          "icon": "fa fa-clock-o",
          "title": "插件代码生成工具",
          "route": "/home"
        }
      ]
    },
    {
      "title": "管理工具",
      "icon": "fa fa-lg fa-fw fa-home",
      "items": [
        {
          "icon": "fa fa-user",
          "title": "插件审核",
          "route": "/home"
        },
        {
          "icon": "fa fa-file-text-o",
          "title": "项目管理",
          "route": "/home"
        },
        {
          "icon": "fa fa-gear",
          "title": "配置管理",
          "route": "/home"
        }
      ]
    }
  ]
};


class Navigation extends Component {
  constructor(props) {
    super(props);
    // Event handlers for SmartMenu component
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.onMenuItemOpen = this.onMenuItemOpen.bind(this);
    this.onMenuItemClose = this.onMenuItemClose.bind(this);

    // Initialize raw item to MenuItem structure format
    this.initialize();
  }

  initialize() {
    const { dispatch } = this.props;
    if(rawItems){
      dispatch(initRawItems(rawItems.items));
    }
  }

  /*
   Event handlers for SmartMenu component
   */
  onMenuItemClick(item) {
    const { dispatch } = this.props;
    dispatch(setActiveNavigationItem(item));
  }

  onMenuItemOpen(item) {
    const { dispatch } = this.props;
    dispatch(toggleMenuItemOpenClose(item, true));
  }

  onMenuItemClose(item) {
    const { dispatch } = this.props;
    dispatch(toggleMenuItemOpenClose(item, false));
  }

  render() {
    const { data } = this.props.navigation;
    const { userFullname } = this.props.user;

    return (
      <aside id="left-panel">
        <LoginInfo userFullname={userFullname}/>
        <nav>
          <SmartMenuList data={data} items={data.items}
                         onMenuItemClick={this.onMenuItemClick}
                         onMenuItemOpen={this.onMenuItemOpen}
                         onMenuItemClose={this.onMenuItemClose}
          />
        </nav>
        <MinifyMenu />
      </aside>
    )
  }
}

Navigation.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object,
  dispatch: PropTypes.func
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    user: state.user,
    navigation: state.navigation
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(Navigation);
