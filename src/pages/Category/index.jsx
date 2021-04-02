import React, { Component } from 'react';
import { Card, Button, Table, message, Modal } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import PubSubJS from 'pubsub-js';
import Linkbutton from '../../components/Linkbutton';
import { reqCategory, updataCategory } from '../../api';
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';

/**
 * 商品分类路由
 */
export default class Category extends Component {
    state = {
        loading: false, //表格发送请求默认值
        categorys: [], //一级分类列表状态数据
        subCategorys: [], //二级分类列表状态数据
        parentId: '0', //获取几级列表的标识
        parentName: '', //需要显示的父列表的名称
        showState: 0, //显示添加和修改对话框的标识 0代表都不显示 1代表显示添加 2代表显示修改
    };

    /*
        初始化table的所有列的方法
     */
    initColums = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                // key: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: category => (
                    <span>
                        <Linkbutton
                            onClick={() => {
                                this.showUpdate(category);
                            }}
                        >
                            修改分类
                        </Linkbutton>
                        {
                            //二级子列表不需要继续查看子分类因此需要判断是否渲染这个按钮
                            this.state.parentId === '0' ? (
                                <Linkbutton
                                    onClick={() => {
                                        this.showSubCategorys(category);
                                    }}
                                >
                                    查看子分类
                                </Linkbutton>
                            ) : null
                        }
                    </span>
                ),
            },
        ];
    };

    //点击展示子分类的回调
    showSubCategorys = category => {
        //获取子分类的父id
        const parentId = category._id;
        const parentName = category.name;
        this.setState({ parentId, parentName }, () => {
            //因为setState是异步更新状态 这个回调函数是状态更新成功后的callback，确保状态更新再获取
            //获取二级列表数据
            this.getCategorys();
        });
    };

    /*
        发送请求获取一级/二级列表的数据
     */
    getCategorys = async () => {
        //发请求前更新状态loading
        this.setState({ loading: true });
        //获取需要获取列表的标识
        const { parentId } = this.state;
        //发送请求获取一级/二级分类列表   根据parentId是否等于0判断
        const result = await reqCategory(parentId);
        //请求结束更新状态loading
        this.setState({ loading: false });
        //判断
        if (result.status === 0) {
            //成功
            const categorys = result.data;
            //如果parentId==0就更新一级分类列表
            if (parentId === '0') {
                this.setState({ categorys });
            } else {
                //否则更新二级分类列表
                this.setState({
                    subCategorys: categorys,
                });
            }
        } else {
            message.error('获取分类列表失败！');
        }
    };

    //显示一级分类列表的回调
    showFirstCategorys = () => {
        this.setState({
            //清空状态数据显示一级列表
            parentId: '0',
            parentName: '',
            subCategorys: [],
        });
    };

    /*
        隐藏对话框回调
     */
    handleCancel = () => {
        //清除数据
        this.form.current.resetFields();
        this.setState({ showState: 0 });
    };

    /*
        显示添加对话框
    */
    showAdd = () => {
        this.setState({ showState: 1 });
    };

    /*
        显示修改对话框
     */
    showUpdate = category => {
        //保存子列表的名称
        this.subCategoryName = category.name;
        //保存子列表的id
        this.categoryId = category._id;
        this.setState({ showState: 2 });
    };

    /*
        点击添加回调
     */
    addCategory = () => {};

    /*
        修改点击ok回调
     */
    updateCategory = async () => {
        //隐藏对话框
        this.setState({ showState: 0 });
        //准备数据 获取子列表id和输入value
        const categoryId = this.categoryId;
        const categoryName = this.categoryName;
        //清除数据
        this.form.current.resetFields();
        // 发送请求修改数据
        const result = await updataCategory(categoryId, categoryName);
        if (result.status === 0) {
            //重新显示列表
            this.getCategorys();
        }
    };

    componentWillMount() {
        //初始化table的列
        this.initColums();
    }

    componentDidMount() {
        //发送请求获取一级分类列表
        this.getCategorys();
        //订阅修改输入框的value
        PubSubJS.subscribe('getCategoryName', (_, data) => {
            let { categoryName } = data;
            this.categoryName = categoryName;
        });
    }

    render() {
        //读取状态数据
        const { loading, categorys, subCategorys, parentName, parentId, showState } = this.state;
        //左侧标题
        const title =
            parentId === '0' ? (
                '一级分类列表'
            ) : (
                <span>
                    <Linkbutton onClick={this.showFirstCategorys}>一级分类列表</Linkbutton>
                    <RightOutlined style={{ margin: '0px 10px' }} />
                    {parentName}
                </span>
            );
        //右侧按钮
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <PlusOutlined />
                添加
            </Button>
        );

        return (
            <Card title={title} extra={extra} style={{ width: '100%' }}>
                <Table
                    pagination={{ defaultPageSize: 10, showQuickJumper: true }} //分页器设置 默认显示10条， 是否有跳转功能
                    loading={loading} //登陆状态显示
                    dataSource={parentId === '0' ? categorys : subCategorys} //显示的列表
                    columns={this.columns}
                    bordered={true} //table的列设置 是否有边框
                    rowKey='_id'
                />

                <Modal
                    title='添加分类'
                    visible={showState === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm
                        categorys={categorys}
                        parentId={parentId}
                        setForm={form => {
                            this.form = form;
                        }}
                    />
                </Modal>

                <Modal
                    title='修改分类'
                    visible={showState === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    {/* 给UpdateForm组件传入保存的子列表名称 */}
                    <UpdateForm
                        categoryName={this.subCategoryName}
                        setForm={form => {
                            this.form = form;
                        }}
                    />
                </Modal>
            </Card>
        );
    }
}
