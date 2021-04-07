import React, { Component } from 'react';
import { Select, Card, Table, Button, Input, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import Linkbutton from '../../components/Linkbutton';

import { reqProducts, reqSearchProduct, reqProductStatus } from '../../api/index';
import { PAGE_SIZE } from '../../utils/comps';
export default class ProductHome extends Component {
    state = {
        total: 0, //商品返回的总条目数
        products: [], //存放商品返回的数组
        loading: false,
        productType: 'productName', //默认是按照名称搜索
        searchName: '', //搜索关键词
    };
    /**
     *
     * @param _id 需要更新商品的id
     * @param status 商品上架、下架状态
     */
    reqProductStatus = async (_id, status) => {
        const result = await reqProductStatus(_id, status);
        if (result.status === 0) {
            message.success('更新商品成功');
            //成功更新列表
            this.getProducts(this.pageNum);
        }
    };

    /**
     * 初始化列
     */
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                width: 100,
                title: '价格',
                dataIndex: 'price',
                render: price => {
                    return '¥' + price;
                },
            },
            {
                width: 100,
                title: '状态',
                // dataIndex: 'status',
                render: product => {
                    const { status, _id } = product;
                    return (
                        <span>
                            <Button
                                onClick={() => {
                                    this.reqProductStatus(_id, status === 1 ? 2 : 1);
                                    // console.log(product);
                                }}
                                type='primary'
                            >
                                {status === 1 ? '下架' : '上架'}
                            </Button>
                            <span style={{ display: 'block' }}>
                                {status === 1 ? '在售' : '已下架'}
                            </span>
                        </span>
                    );
                },
            },
            {
                width: 100,
                title: '操作',
                render: product => {
                    return (
                        <span>
                            <Linkbutton
                                onClick={() => {
                                    this.props.history.push('/product/info', product);
                                }}
                            >
                                状态
                            </Linkbutton>
                            <Linkbutton
                                onClick={() => {
                                    this.props.history.push('/product/add', product);
                                }}
                            >
                                修改
                            </Linkbutton>
                        </span>
                    );
                },
            },
        ];
    };

    /**
     * 发送请求获取商品列表
     */
    getProducts = async pageNum => {
        this.pageNum = pageNum; //保存pageNum 让其他方法可以看到
        this.setState({ loading: true });
        const { productType, searchName } = this.state;
        //定义返回值
        let result;
        //如果搜索关键词有内容说明需要搜索  否则一般展示
        if (searchName) {
            result = await reqSearchProduct({
                pageNum,
                pageSize: PAGE_SIZE,
                searchName,
                productType,
            });
        } else {
            result = await reqProducts(pageNum, PAGE_SIZE);
        }
        this.setState({ loading: false });
        //成功就设置属性
        if (result.status === 0) {
            const { total, list } = result.data;
            this.setState({
                total,
                products: list,
            });
        }
    };

    /**
     * 点击搜索发送请求搜索对应商品列表
     */
    // searchProducts = async pageNum => {
    //     const { searchName, productType } = this.state;
    //     this.setState({ loading: true });
    //     const resault = await reqSearchProduct({ pageNum, PAGE_SIZE, searchName, productType });
    //     this.setState({ loading: false });
    //     if (resault.status === 0) {
    //         const { total, list } = resault;
    //         this.setState({ total, products: list });
    //     }
    // };

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        //默认加载第一页的数据
        this.getProducts(1);
    }

    render() {
        const { products, total, loading, productType, searchName } = this.state;
        /**
         * cardTitle
         */
        const title = (
            <span>
                <Select
                    defaultValue={productType}
                    style={{ width: 150 }}
                    onChange={value => {
                        this.setState({ productType: value });
                    }}
                >
                    <Select.Option value='productName'>根据名称搜索</Select.Option>
                    <Select.Option value='productDesc'>根据描述搜索</Select.Option>
                </Select>
                <Input
                    onChange={e => this.setState({ searchName: e.target.value })}
                    placeholder='关键词'
                    style={{ width: 300, marginLeft: 10 }}
                    value={searchName}
                />
                <Button
                    type='primary'
                    onClick={() => {
                        this.getProducts(1);
                    }}
                >
                    <SearchOutlined />
                    搜索
                </Button>
            </span>
        );

        /**
         * cardextra
         */
        const extra = (
            <Button
                onClick={() => {
                    this.props.history.push('/product/add');
                }}
                type='primary'
            >
                <PlusOutlined />
                添加
            </Button>
        );

        return (
            <Card title={title} extra={extra}>
                <Table
                    loading={loading}
                    bordered
                    rowKey='_id'
                    dataSource={products}
                    columns={this.columns}
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        total: total,
                        showQuickJumper: true,
                        onChange: pageNum => {
                            this.getProducts(pageNum);
                        },
                    }}
                ></Table>
            </Card>
        );
    }
}
