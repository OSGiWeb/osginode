import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ShopElement from './ShopElement'
import ShopElementList from './ShopElementList'

const ShopElementGroup = ({itemCollection}) => {
  const shopElementGroups = itemCollection.map((itemList, key) => {
    return (
      <div className="row well well-light">
        <div className="col-sm-12">
          <h1> { itemList.category } <small> 共 { itemList.children.length } 种 </small></h1> <br/>
            <ShopElementList itemList={ itemList.children } />
        </div>
      </div>
    );
  });

  return (
    <ul>
      { shopElementGroups }
    </ul>
  );
};

ShopElementGroup.propTypes = {
  itemCollection: PropTypes.array.isRequired
};

export default ShopElementGroup;