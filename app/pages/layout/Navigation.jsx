/**
 * Created by griga on 11/24/15.
 */

import React from 'react'

import SmartMenu from '../../components/smartAdmin/layout/navigation/components/SmartMenu.jsx'

import MinifyMenu from '../../components/smartAdmin/layout/actions/MinifyMenu.jsx'

import LoginInfo from '../../components/smartAdmin/user/components/LoginInfo.jsx'

let rawItems = require('json!../../config/menu-items.json').items;

let Navigation = React.createClass({
    render: function () {
        return (
            <aside id="left-panel">
                <LoginInfo />
                <nav>
                    <SmartMenu rawItems={rawItems} />
                </nav>
                <MinifyMenu />
            </aside>
        )
    }
});


export default Navigation