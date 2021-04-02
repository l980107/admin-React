import React, { Component } from 'react';
import { Card, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reqCategoryById } from '../../api/index';
import img from './sp.jpeg';
import './info.css';

export default class ProductInfo extends Component {
    state = {
        parentName: '',
    };

    async componentDidMount() {
        const { pCategoryId, categoryId } = this.props.location.state;
        //发送请求获取分类名称
        const result = await reqCategoryById(pCategoryId);
        if (result.status === 0) {
            //获取result的数据的name
            this.setState({ parentName: result.data.name });
        }
    }

    render() {
        const { name, desc, price, imgs } = this.props.location.state;
        const { parentName } = this.state;
        const title = (
            <span>
                <ArrowLeftOutlined
                    onClick={() => {
                        this.props.history.go(-1);
                    }}
                    style={{ marginRight: 10, color: '#1890ff', fontSize: 20 }}
                />
                商品详情
            </span>
        );

        return (
            <Card title={title}>
                <List itemLayout='vertical'>
                    <List.Item>
                        <span className='ListSpan1'>商品名称：</span>
                        <span>{name}</span>
                    </List.Item>
                    <List.Item>
                        <span className='ListSpan1'>商品描述：</span>
                        <span>{desc}</span>
                    </List.Item>
                    <List.Item>
                        <span className='ListSpan1'>商品价格：</span>
                        <span>{price}元</span>
                    </List.Item>
                    <List.Item>
                        <span className='ListSpan1'>所属分类：</span>
                        <span>{parentName} </span>
                    </List.Item>
                    <List.Item>
                        <span className='ListSpan1'>商品图片：</span>
                        <span>
                            <img style={{ width: 180, height: 180 }} src={img} alt='sp' />
                        </span>
                    </List.Item>
                </List>
            </Card>
        );
    }
}
