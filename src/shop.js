import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Header1 from './component/header.js'

export default class Shop extends Component {
    render() {
        return (
            <div>
                <Header1></Header1>
      </div>
        )
    }
}

ReactDOM.render(<Shop />, document.getElementById('root'))
