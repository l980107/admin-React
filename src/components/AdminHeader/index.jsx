import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Modal } from "antd";
import "./index.css"
import { formatTime } from "../../utils/fromatTimeUtil";
import memoryUtil from "../../utils/memoryUtil"
import { getWeather } from "../../api/index";
import memuList from "../../config/memuList";
import localUtil from "../../utils/localUtil";
import Linkbutton from '../Linkbutton';


class AdminHeader extends Component {
    state = {
        nowTime: formatTime(new Date()),    //字符串当前时间
        city: "",   //城市区域
        temperature: "",    //温度
        weather: "",    //天气
        winddirection: "",  //风向
    }

    //时间回调
    getTime = () => {
        this.InterId = setInterval(() => {
            const nowTime = formatTime(new Date());
            this.setState({ nowTime });
        }, 1000)
    }

    //天气回调
    getWeather = async () => {
        const result = await getWeather('330105');
        const { city, temperature, weather, winddirection } = result;
        this.setState({
            city,
            temperature,
            weather,
            winddirection,
        });
    }

    //title回调
    getTitle = () => {
        // 得到当前请求路径
        const path = this.props.location.pathname;
        let title;
        //遍历
        memuList.forEach((item) => {
            if (item.key === path) {
                title = item.title;
            } else if (item.children) {
                let cItem = item.children.find(cItem => cItem.key === path);
                if (cItem) {
                    title = cItem.title;
                }
            }
        });
        return title;


        // memuList.forEach(item => {
        //     if (item.key === path) { // 如果当前item对象的key与path一样,item的title就是需要显示的title
        //         title = item.title
        //     } else if (item.children) {
        //         // 在所有子item中查找匹配的
        //         const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        //         // 如果有值才说明有匹配的
        //         if (cItem) {
        //             // 取出它的title
        //             title = cItem.title
        //         }
        //     }
        // })
        // return title;
    }

    //退出
    outLogin = () => {
        Modal.confirm({
            title: '确定退出登陆吗?',
            content: '请确认',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                //删除账号信息
                localUtil.removeUser();
                //更新内存
                memoryUtil.user = {};
                //跳转登陆界面
                this.props.history.replace('/login');
            }
        })
    }

    componentDidMount() {
        //设置定时器开启时间
        this.getTime();
        //发送请求获取数据
        this.getWeather();

    }

    componentWillUnmount() {
        clearInterval(this.InterId);
    }

    render() {
        const { nowTime, city, temperature, weather, winddirection } = this.state;
        const { username } = memoryUtil.user;
        const title = this.getTitle();
        return (
            <div className="admin_header">
                <div className="admin_header_top">
                    <span>Hello,  {username}</span>
                    <Linkbutton onClick={this.outLogin} >退出</Linkbutton>
                </div>
                <div className="admin_header_bottom">
                    <div className="admin_header_bottom_left">
                        {title}
                    </div>
                    <div className="admin_header_bottom_right">
                        <span>{weather}</span>
                        <span className="img">{city} {temperature}&#x2103; {winddirection}风</span>
                        <span>{nowTime}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminHeader)