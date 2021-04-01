import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Menu } from 'antd';

import "./index.css"
import logo from "./logo2.png"
import memuList from '../../config/memuList';


const { SubMenu } = Menu;
class LeftNav extends Component {
    //获取菜单节点遍历显示菜单
    getMemuNodes = (memuList) => {
        const path = this.props.location.pathname;
        return memuList.map(item => {
            if (!item.children) {
                return <Menu.Item key={item.key} icon={item.icon} >
                    <Link to={item.key}>
                        {item.title}
                    </Link>
                </Menu.Item >
            } else {
                //查找cItem的key是否等于path
                const cItem = item.children.find(cItem => cItem.key === path);
                //如果存在说明Item需要打开
                if (cItem) {
                    this.openKey = item.key;
                }
                return <SubMenu key={item.key} icon={item.icon} title={item.title}>
                    {this.getMemuNodes(item.children)}
                </SubMenu>
            }

        })
    }

    componentWillMount() {
        this.memuNodes = this.getMemuNodes(memuList);
    }

    render() {
        //动态获取当前路径，用于导航栏的选中
        // const memuNodes = memuNodes;
        const path = this.props.location.pathname;

        const openKey = this.openKey;
        console.log(openKey);
        return (
            <div className="admin_left_nav">
                <Link to="/" className="header">
                    <img src={logo} alt="logo" />
                    <h2>Welcom</h2>
                </Link>
                <div style={{ width: 200 }}>
                    <Menu mode="inline" theme="dark" selectedKeys={[path]} defaultOpenKeys={[openKey]}>
                        {this.memuNodes}
                    </Menu>
                </div>
            </div>



        )
    }
}

/*
    将三个路由组件的属性传递给传入组件
*/
export default withRouter(LeftNav)