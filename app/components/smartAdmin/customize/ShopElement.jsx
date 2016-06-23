import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Styles for React component
 */
var styles = {
  itemList: {
    // fontWeight: 'bold',
    // fontSize: 15,
    // paddingBottom:2,
    // paddingTop: 4,
    height: 180,
  },
}

class ShopElement extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props; 

    return (
      <div class="row">
        <div className="col-xs-12 col-sm-4 col-md-2">
          <div className="panel panel-primary pricing-big">
            <img src="styles/img/ribbon.png" className="ribbon" alt=""/>
            <div className="panel-heading">
              <h3 className="panel-title"> { item.pluginname } </h3>
            </div>
            <div className="panel-body no-padding text-align-center" style={styles.itemList}>
              <div className="price-features">
                <ul className="list-unstyled text-left">
                  <li><i className="fa fa-user"></i> <strong> 开发者： </strong> { item.author } </li>
                  <li><i className="fa fa-file-excel-o"></i> <strong> 最新版本： </strong> { item.version } </li>
                  <li><i className="fa fa-calendar"></i> <strong> 更新日期： </strong> { item.releasedate }  </li>
                  <li><i className="fa fa-download"></i> <strong> 下载次数： </strong> 84 </li>
                  <li><i className="fa fa-star-half-full"></i> <strong> 星级： </strong>
                    <i className="fa fa-star text-primary"></i>
                    <i className="fa fa-star text-primary"></i>
                    <i className="fa fa-star text-primary"></i>
                    <i className="fa fa-star text-primary"></i>
                    <i className="fa fa-star text-muted"></i>
                    <span className="fa font-sm"> (109) 评分 </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="panel-footer text-align-center" >
              <a href-void="" className="btn btn-primary btn-block" role="button" href="#"> 下载 </a>
              <div> <a className="font-sm" href-void="" href="#"> 详情 </a>
                或 <a className="font-sm" href-void="" href="#"> 评分 </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }
}

export default ShopElement;