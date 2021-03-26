import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import memoryUtil from "../../utils/memoryUtil";

/*
    管理路由组件
*/
export default class Admin extends Component {

    render() {
        const user = memoryUtil.user;
        if (!user._id) {
            return <Redirect to="/login" />
        }
        return (
            <div>
                { "hello" + user.username}
            </div>
        )
    }
}
