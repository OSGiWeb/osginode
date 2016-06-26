import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap'
import JarvisWidget from '../layout/widgets/JarvisWidget.jsx'

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

    // Initialize local storage for class 
    this.state = {
      showModal: false,
    };

    // Binding functions to class
    this.onModalShow = this.onModalShow.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  onModalShow() {
    this.setState({ showModal: true });
  }

  onModalClose() {
    this.setState({ showModal: false });
  }

  renderModal(item) {
    return (
      <Modal show={this.state.showModal} onHide={this.onModalClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 'bold' }} > <i className="fa fa-puzzle-piece"/> { item.pluginname } </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JarvisWidget colorbutton={false} editbutton={false} togglebutton={false}
            deletebutton={false} fullscreenbutton={false}
            custombutton={false} sortable={false}>
            <header>
              <span className="widget-icon"> <i className="fa fa-list-alt"/> </span>
              <h2> 基本信息 </h2>
            </header>
            <div>
              <div className="widget-body">
                <div className="tabs-left">
                  <ul className="nav nav-tabs tabs-left" id="demo-pill-nav">
                    <li className="active">
                      <a href="#tab-r1" data-toggle="tab"><i className="fa fa-info fa-fw"/> 插件介绍 </a>
                    </li>
                    <li>
                      <a href="#tab-r2" data-toggle="tab"><i className="fa fa-gavel fa-fw"/> 安装指南</a>
                    </li>
                    <li>
                      <a href="#tab-r3" data-toggle="tab"><i className="fa fa-tasks fa-fw"/> 编译指南</a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane active" id="tab-r1">
                      { item.pluginintrod }
                    </div>
                    <div className="tab-pane" id="tab-r2">
                      { item.installmanual }
                    </div>
                    <div className="tab-pane" id="tab-r3">
                      { item.compilemanual }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </JarvisWidget>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onModalClose}>关闭</Button>
        </Modal.Footer>
      </Modal>
    );
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
              <div> <a className="font-sm" onClick={this.onModalShow} > 详情 </a>
                或 <a className="font-sm" href-void="" href="#"> 评分 </a>
              </div>
            </div>
          </div>
        </div>
        { this.renderModal(item) }
      </div>
    )

  }
}

export default ShopElement;

// onMouseOver={this.onShowDetailClick}

   // const { item } = this.state;

    // return (
    //   <div className="modal fade" id="showDetailModal" tabIndex="-1" role="dialog"
    //     aria-labelledby="showDetailModalLabel" aria-hidden="true">
    //     <div className="modal-dialog">
    //       <div className="modal-content">
    //         <div className="modal-header">
    //           <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
    //             &times;
    //           </button>
    //           <h2 className="row-seperator-header" id="showDetailModalLabel" style={{ fontWeight: 'bold' }}>
    //             <i className="fa fa-puzzle-piece"/> { item.pluginname } </h2>
    //         </div>

    //         <div className="modal-body">
    //           <JarvisWidget colorbutton={false} editbutton={false} togglebutton={false}
    //             deletebutton={false} fullscreenbutton={false}
    //             custombutton={false} sortable={false}>
    //             <header>
    //               <span className="widget-icon"> <i className="fa fa-list-alt"/> </span>
    //               <h2> 基本信息 </h2>
    //             </header>
    //             <div>

    //               <div className="widget-body">                  
    //                 <div className="tabs-left">
    //                   <ul className="nav nav-tabs tabs-left" id="demo-pill-nav">
    //                     <li className="active">
    //                       <a href="#tab-r1" data-toggle="tab"><i className="fa fa-info fa-fw"/> 插件介绍 </a>
    //                     </li>
    //                     <li>
    //                       <a href="#tab-r2" data-toggle="tab"><i className="fa fa-gavel fa-fw"/> 安装指南</a>
    //                     </li>
    //                     <li>
    //                       <a href="#tab-r3" data-toggle="tab"><i className="fa fa-tasks fa-fw"/> 编译指南</a>
    //                     </li>
    //                   </ul>
    //                   <div className="tab-content">
    //                     <div className="tab-pane active" id="tab-r1">
    //                       { item.pluginintrod }
    //                     </div>
    //                     <div className="tab-pane" id="tab-r2">
    //                       { item.installmanual }
    //                     </div>
    //                     <div className="tab-pane" id="tab-r3">
    //                       { item.compilemanual }
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </JarvisWidget>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // )

  //   return (
  //     <div className="modal fade" id="showDetailModal" tabIndex="-1" role="dialog"
  //       aria-labelledby="showDetailModalLabel" aria-hidden="true">
  //       <div className="modal-dialog">
  //         <div className="modal-content">
  //           <div className="modal-header">
  //             <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
  //               &times;
  //             </button>
  //             <h2 className="row-seperator-header" id="showDetailModalLabel" >
  //               <i className="fa fa-reorder"/> 编辑插件 </h2>
  //           </div>
  //           <div className="modal-body">

  //             <div>
  //               <div className="widget-body no-padding">

  //                 <form id="editplugin-form" className="smart-form" noValidate="novalidate">
  //                   <fieldset>
  //                     <div className="row">
  //                       <section className="col col-6">
  //                         <label className="input"> <i className="icon-append fa fa-puzzle-piece"/>
  //                           <input type="text" name="editpluginname" ref="editpluginname" placeholder="名称" defaultValue={g_item.pluginname}/>
  //                         </label>
  //                       </section>
  //                     </div>
  //                   </fieldset>


  //                 </form>

  //               </div>
  //             </div>

  //           </div>
  //           <div className="modal-footer">
  //             <button type="button" className="btn btn-default" data-dismiss="modal">
  //               取消
  //             </button>
  //             <button type="button" className="btn btn-primary" data-dismiss="modal"
  //               onClick={this.onEditPluginSubmit}>
  //               更新插件
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )