import React, { Component } from 'react';
import { Card, Form, Input, Button, Cascader } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Linkbutton from '../../components/Linkbutton/index';
import { reqCategory } from '../../api/index';
import PicturesWall from './PicturesWall';
const { Item } = Form;
const { TextArea } = Input;

export default class ProductAdd extends Component {
    state = {
        options: [], //初始化商品分类空数组
    };

    //初始化商品分类一级列表
    initCategorys = async options => {
        //根据传入的列表数组返回符合条件的新数组
        const newOptions = options.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false, //不是叶子（有后续箭头）
        }));
        //取值并展示二级列表
        const { ifUpdate, product } = this;
        const { pCategoryId } = product;
        //判断是否为二级列表商品
        if (ifUpdate && pCategoryId !== 0) {
            //如果是二级列表，展示二级列表
            const result = await this.getCategorys(pCategoryId);
            const childCategorys = result.data;
            const newOptions = childCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }));

            const targetOption = options.find(o => o._id === pCategoryId);
            targetOption.children = newOptions;
        }

        this.setState({ options: newOptions });
    };

    //获取一级/二级分类列表
    getCategorys = async parentId => {
        const result = await reqCategory(parentId);
        if (result.status === 0) {
            //判断如果是一级列表
            if (parentId === '0') {
                //获取一级列表数组
                const options = result.data;
                //初始化一级列表
                this.initCategorys(options);
            } else {
                //返回result
                return result;
            }
        }
    };
    
    //选择一级选项后的回调
    loadData = async selectedOptions => {
        const targetOption = selectedOptions[0];
        //显示loading
        targetOption.loading = true;
        //发送请求获取二级列表
        const childCategorys = await this.getCategorys(targetOption.value);
        //关闭loding显示
        targetOption.loading = false;
        //如果有二级列表
        if (childCategorys.data && childCategorys.data.length > 0) {
            //根据result转换成符合要求的option
            const newChildCategorys = childCategorys.data.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true, //是叶子（没有后续箭头）
            }));
            //关联targetOption
            targetOption.children = newChildCategorys;
        } else {
            targetOption.isLeaf = true; //是叶子（没有后续箭头）
        }

        this.setState({ options: [...this.state.options] });
    };

    onFinish = value => {
        console.log(value);
    };

    componentDidMount() {
        this.getCategorys('0');
    }
    componentWillMount() {
        //取出状态
        const product = this.props.location.state;
        //标识是否是修改状态
        this.ifUpdate = !!product;
        //保存状态
        this.product = product || {};
    }

    render() {
        const { options } = this.state;
        const { pCategoryId, categoryId } = this.product;
        const categoryIds = []; //联级的初始值

        //判断是否是修改页面
        if (this.ifUpdate) {
            //pId是0标识 一级列表商品
            if (pCategoryId === 0) {
                categoryIds.push(categoryId);
            } else {
                categoryIds.push(pCategoryId);
                categoryIds.push(categoryId);
            }
        }

        //用于表单布局
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 3,
                },
            },
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 12,
                },
            },
        };

        //card的左侧title
        const title = (
            <span>
                <Linkbutton>
                    <ArrowLeftOutlined
                        onClick={() => {
                            this.props.history.go(-1);
                        }}
                        style={{ fontSize: 20 }}
                    />
                </Linkbutton>
                {this.ifUpdate ? '修改商品' : '添加商品'}
            </span>
        );

        return (
            <Card title={title}>
                <Form {...formItemLayout} onFinish={this.onFinish}>
                    <Item
                        label='商品名称:'
                        initialValue={this.ifUpdate ? this.product.name : ''}
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: '请输入商品名称',
                            },
                            {
                                min: 2,
                                message: '商品名不得少于两个字符',
                            },
                            {
                                max: 20,
                                message: '商品名过长',
                            },
                        ]}
                    >
                        <Input placeholder='请输入商品名称' />
                    </Item>
                    <Item
                        label='商品描述:'
                        initialValue={this.ifUpdate ? this.product.desc : ''}
                        name='decs'
                        rules={[
                            {
                                required: true,
                                message: '请输入商品描述',
                            },
                            {
                                max: 100,
                                message: '商品描述过长',
                            },
                        ]}
                    >
                        <TextArea
                            allowClear
                            placeholder='请输入商品描述'
                            autoSize={{ minRows: 2, maxRows: 6 }}
                        ></TextArea>
                    </Item>
                    <Item
                        label='商品价格'
                        initialValue={this.ifUpdate ? this.product.price : ''}
                        name='price'
                        rules={[
                            {
                                required: true,
                                message: '请输入商品价格',
                            },

                            {
                                // 自定义价格验证
                                validator: (_, value) => {
                                    if (value >= 1 && value <= 99999) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject(new Error('商品价格不符'));
                                    }
                                },
                            },
                        ]}
                    >
                        <Input type='number' placeholder='请输入商品价格' addonAfter='元' />
                    </Item>
                    <Item label='商品分类:' name='categoryIds' initialValue={categoryIds}>
                        {/* 商品分类级联选择 */}
                        <Cascader options={options} loadData={this.loadData} />
                    </Item>
                    <Item label='商品图片'>
                        <PicturesWall></PicturesWall>
                    </Item>
                    <Item label='商品详情'></Item>
                    <Item>
                        <Button style={{ marginLeft: 20 }} type='primary' htmlType='submit'>
                            提交
                        </Button>
                    </Item>
                </Form>
            </Card>
        );
    }
}
