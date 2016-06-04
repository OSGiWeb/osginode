import React from 'react'
import ReactDOM from 'react-dom'
import ScriptLoader from '../../utils/mixins/ScriptLoader.jsx'
import ElementHolder from '../../utils/mixins/ElementHolder.jsx'

// var testdata = [{ id: 0, text: 'enhancement' }, { id: 1, text: 'bug' }, { id: 2, text: 'duplicate' }, { id: 3, text: 'invalid' }, { id: 4, text: 'wontfix' }];

let Select2 = React.createClass({
    mixins: [ScriptLoader, ElementHolder],
    componentDidMount: function () {
        this.loadScript('/vendor.ui.js').then(function(){
            this._select2()
        }.bind(this))
    },
    
    componentWillUnmount: function () {
        $(this.getHold()).select2('destroy');
    },
    
    _select2: function () {

        var element = $(this.getHold());
        var testdata = this.props.data;
        
        var _select2;
        _select2 = element.select2({ data: testdata });
    },
    
    render: function () {
        let {children, ...props} = this.props;
        
        // if (data !== undefined) {
        //     var element = $(this.getHold());
        //     var _select2 = element.select2({ data: this.props.data });
        // }
        
        return (
            <select {...props}>
                {children}
            </select>
        )
    }

});

export default Select2