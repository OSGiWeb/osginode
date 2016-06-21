import React, {Component, PropTypes} from 'react'
import SmartMenuItem from './SmartMenuItem.jsx'


// Local variables
let dataTemp = undefined;
let onMenuItemClickTemp = undefined;
let onMenuItemOpenTemp = undefined;
let onMenuItemCloseTemp = undefined;

const SmartMenuList = ({ data, items, onMenuItemClick, onMenuItemOpen, onMenuItemClose, ...props }) => {
  const menuItems = items.map((item) => {
    // Workaround: For component tree structure, to avoid 'data' and functions(e.g.: 'onMenuItemClick') not available
    // in sub component and only work in root component
    if (data !== undefined) {
      dataTemp = data;
      onMenuItemClickTemp = onMenuItemClick;
      onMenuItemOpenTemp = onMenuItemOpen;
      onMenuItemCloseTemp = onMenuItemClose;
    }

    return (
      <SmartMenuItem data={dataTemp} item={item} key={item._id}
                     onMenuItemClick={onMenuItemClickTemp}
                     onMenuItemOpen={onMenuItemOpenTemp}
                     onMenuItemClose={onMenuItemCloseTemp}
      />);
  });

  return (
    <ul {...props}>
      { menuItems }
    </ul>
  )
};

SmartMenuList.propTypes = {
  onMenuItemClick: PropTypes.func,
  onMenuItemOpen: PropTypes.func,
  onMenuItemClose: PropTypes.func
};

export default SmartMenuList;