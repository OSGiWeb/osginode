import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ShopElement from './ShopElement'

const ShopElementList = ({itemList}) => {
  const shopElements = itemList.map((item, key) => {
    return (
      <ShopElement item={item} />);
  });

  return (
    <ul>
      { shopElements }
    </ul>
  );
};

ShopElementList.propTypes = {
  itemList: PropTypes.array.isRequired
};

export default ShopElementList;