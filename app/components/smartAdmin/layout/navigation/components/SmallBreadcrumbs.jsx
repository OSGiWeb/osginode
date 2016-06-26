import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'

import NavigationStore from '../stores/NavigationStore'

let SmallBreadcrumbs = React.createClass({
    mixins: [Reflux.listenTo(NavigationStore, 'onNavigationChange')],
    getInitialState: function () {
        return {
            items: this.props.items || []
        }
    },
    componentWillMount: function(){
        if(!this.props.items && NavigationStore.getData().item){
            this.onNavigationChange({
                item: NavigationStore.getData().item
            })
        }
    },

    onNavigationChange: function (data) {
        let item = data.item;
        if(item.route) {
            this.state.items = [];
            this._addCrumb(item);
            this.forceUpdate()
        }

    },
    _addCrumb: function(item){
        this.state.items.unshift(item.title)
        if(item.parent)
            this._addCrumb(item.parent)
    },

    // Format navigation content in formatted string structure
    formatContents (contents) {
        var resContents = [];
        const maxContentLevel = 6;
        let str = 'item.parent';

        // Find parent and its child
        for (let i = 0; i < maxContentLevel; i++) {
            let parent = _.get(contents, str);
            if ( parent !== undefined) {
                resContents.push(parent.title);
                str += '.parent';
            } else { break; }
        }

        // Reverse in 'parent->child'([0]->[1]) and push current content string
        _.reverse(resContents);
        resContents.push(contents.item.title);
        // Format content as string in 'parent->child' structure
        return _.join(resContents, ' / ');
    },

    render: function () {
        const { naviContents } = this.props;

        return (
            <ol className="breadcrumb">
                <li style={{fontSize:13}}> { this.formatContents(naviContents) } </li>
                {this.state.items.map(function(item, idx){
                    return <li key={idx}>{item}</li>
                })}
            </ol>
        )
    }
});

export default SmallBreadcrumbs