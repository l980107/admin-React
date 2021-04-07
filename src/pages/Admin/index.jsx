import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';

import memoryUtil from "../../utils/memoryUtil";
import LeftNav from '../../components/LeftNav';
import AdminHeader from '../../components/AdminHeader';
import Home from "../Home";
import Category from "../Category";
import Bar from "../Charts/Bar";
import Line from "../Charts/Line";
import Pie from "../Charts/Pie";
import Product from "../Product";
import Role from "../Role";
import User from "../User";

const { Footer, Content, Sider } = Layout;



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
            <Layout style={{ height: "100%" }}>
                <Sider>
                    <LeftNav />
                </Sider>

                <Layout>
                    <AdminHeader >Header</AdminHeader>
                    <Content style={{ margin: "20px", backgroundColor: "#fff" }}>
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Route path="/user" component={User} />
                            <Route path="/role" component={Role} />
                            <Route path="/category" component={Category} />
                            <Route path="/product" component={Product} />
                            <Route path="/charts/bar" component={Bar} />
                            <Route path="/charts/pie" component={Pie} />
                            <Route path="/charts/line" component={Line} />
                            <Redirect to="/home" />
                        </Switch>
                    </Content>
                    
                    <Footer style={{ textAlign: "center", color: "rgba(0,0,0,.4)", }}>Welcome to my system , This system comes from 梁泽玮 </Footer>
                </Layout>
            </Layout>
        )
    }
}


