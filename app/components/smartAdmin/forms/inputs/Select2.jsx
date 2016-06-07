import React from 'react'
import ReactDOM from 'react-dom'
import ScriptLoader from '../../utils/mixins/ScriptLoader.jsx'
import ElementHolder from '../../utils/mixins/ElementHolder.jsx'

let Select2 = React.createClass({
    mixins: [ScriptLoader, ElementHolder],
    componentDidMount: function () {
        this.loadScript('/vendor.ui.js').then(function () {
            this._select2()
        }.bind(this))
    },

    componentWillUnmount: function () {
        $(this.getHold()).select2('destroy');
    },

    _select2: function () {
        var element = $(this.getHold());

        var _select2;
        _select2 = element.select2( this.props.options );

        // Invoke call back to retrieve select2 events
        const { onDependenciesSelect, onDependenciesUnselect } = this.props;
        _select2.on('select2:select', function (evt) {
            onDependenciesSelect(evt);
        });
         _select2.on('select2:unselect', function (evt) {
            onDependenciesUnselect(evt);
        });
    },


    render: function () {
        let {children, ...props} = this.props;

return (
    <select {...props}>
        {children}
    </select>
)
    }

});

export default Select2