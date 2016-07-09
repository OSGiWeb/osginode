import React, {PropTypes} from 'react';
import IconButton from 'material-ui/IconButton';
import CodeIcon from 'material-ui/svg-icons/action/code';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

const BlockTitle = (props) => (
  <Toolbar>
    <ToolbarGroup>
      <ToolbarTitle text={props.title || 'Example'} />
    </ToolbarGroup>
    <ToolbarGroup>
      <IconButton touch={true} tooltip={props.tooltip}>
        <CodeIcon />
      </IconButton>
    </ToolbarGroup>
  </Toolbar>
);

BlockTitle.propTypes = {
  title: PropTypes.string,
  // tooltip: PropTypes.string,
};

export default BlockTitle;
