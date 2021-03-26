import React, { Component } from 'react';


import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


import "./index.css";
import logo from './img/logo3.png'
import { reqLogin } from '../../api'
import memoryUtil from "../../utils/memoryUtil"
import localUtil from "../../utils/localUtil"
import { Redirect } from 'react-router';
// 登陆路由组件
export default class Login extends Component {

    /*
        async await 
        作用： 简化promise异步编程 用同步编码方式写代码
        await： 写在返回promise表达式的左侧 ： 直接拿到response
        async： 写在await所在函数定义的左侧
    */
    onFinish = async (value) => {
        //解构
        const { username, password } = value;
        //发送请求
        const result = await reqLogin(username, password)
        if (result.status === 0) {
            message.success("登陆成功");
            memoryUtil.user = result.data;
            localUtil.saveUser(result.data);
            this.props.history.replace("/");


        } else {
            message.error(result.msg);
        }
    }

    render() {

        const user = memoryUtil.user;
        if (user && user._id) {
            return <Redirect to="/" />
        }

        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo" />
                    <h2>后台管理系统</h2>
                </div>
                <div className="login-body">
                    <h2>欢迎使用</h2>
                    <Form
                        // ref={this.formRef}
                        name="normal_login"
                        className="login-form"
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, whitespace: true, message: '用户名不能为空' },
                                { min: 4, message: "用户名至少4位" },
                                { max: 12, message: "用户名不符合长度" },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须由数字、字母、下划线组成" }
                            ]}
                            initialValue="admin"
                        >

                            <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="用户名" />

                        </Form.Item>


                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, whitespace: true, message: '密码不能为空' },
                                { min: 4, message: "密码至少4位" },
                                { max: 12, message: "密码不符合长度" },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: "密码错误" }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <a className="login-form-forgot" href="">
                                忘记密码
                            </a>
                        </Form.Item>



                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </div >
            </div >



        )
    }
}
