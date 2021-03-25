import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

import "./index.css";
import logo from './img/logo.png'
// 登陆路由组件
export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo" />
                    <h2>后台管理系统</h2>
                </div>
                <div className="login-body">
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>

                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>


                </div>
            </div>
        )
    }
}
