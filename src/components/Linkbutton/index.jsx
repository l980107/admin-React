import React, { Component } from 'react'
import "./index.css"

export default class Linkbutton extends Component {
    render() {
        return (
            <button onClick={this.props.onClick} className="link_button">{this.props.children}</button>
        )
    }
}
