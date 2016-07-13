import React, {PropTypes} from 'react';
import IconButton from 'material-ui/IconButton';
import CodeIcon from 'material-ui/svg-icons/action/code';
import {Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import { RaisedButton, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

const BlockTitle = (props) => (
  <Toolbar>
    <ToolbarGroup>
      <ToolbarTitle text={props.title || '缺省'} />
    </ToolbarGroup>
    { props.menu }

  </Toolbar>
);

BlockTitle.propTypes = {
  title: PropTypes.string,
};

export default BlockTitle;

  // <Toolbar>
  //   <ToolbarGroup>
  //     <ToolbarTitle text={props.title || '缺省'} />
  //     <RaisedButton
  //       label="添加插件"
  //       primary={true}
  //       icon={<ContentAdd />}
  //       />


  //   </ToolbarGroup>
  //   { props.menu }

  // </Toolbar>
