/**
 * Created by griga on 11/24/15.
 */

import React from 'react'

import SmartMenu from '../../components/smartAdmin/layout/navigation/components/SmartMenu.jsx'

import MinifyMenu from '../../components/smartAdmin/layout/actions/MinifyMenu.jsx'

import LoginInfo from '../../components/smartAdmin/user/components/LoginInfo.jsx'

// let rawItems = require('../../config/menu-items.json').items;

const rawItems = {
  "items": [
  {
    "title": "Blank",
    "icon": "fa fa-lg fa-fw fa-home",
    "route": "/home"
  }
]
};

let Navigation = React.createClass({
    render: function () {
        return (
            <aside id="left-panel">
                <LoginInfo />
                <nav>
                    <SmartMenu rawItems={rawItems.items} />
                </nav>
                <MinifyMenu />
            </aside>
        )
    }
});


export default Navigation