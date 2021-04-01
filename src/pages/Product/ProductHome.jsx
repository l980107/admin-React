import React, { Component } from 'react';
import { Select, Button, Input, Card, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default class ProductHome extends Component {
	render() {
		const title = (
			<span>
				<Select style={{ width: 120 }} defaultValue='1'>
					<Select.Option value='1'>按名称搜索</Select.Option>
					<Select.Option value='2'>按类型搜索</Select.Option>
				</Select>
				<Input style={{ width: 200, marginLeft: 10 }} placeholder='关键字'></Input>
				<Button type='primary'>搜索</Button>
			</span>
		);

		const extra = (
			<Button type='primary'>
				<PlusOutlined />
				添加商品
			</Button>
		);

		const dataSource = [
			{
				key: '1',
				name: '胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌',
				age: 32,
				address: '西湖区湖底公园1号',
			},
			{
				key: '2',
				name: '胡彦祖',
				age: 42,
				address: '西湖区湖底公园1号',
			},
		];

		const columns = [
			{
				title: '商品名',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '商品描述',
				dataIndex: 'age',
				key: 'age',
			},
			{
				title: '价格',
				dataIndex: 'address',
				key: 'address',
			},
			{
				title: '状态',
				dataIndex: 'address',
				key: 'address',
			},
			{
				title: '操作',
				dataIndex: 'address',
				key: 'address',
			},
		];

		return (
			<Card title={title} extra={extra}>
				<Table dataSource={dataSource} columns={columns}></Table>
			</Card>
		);
	}
}
