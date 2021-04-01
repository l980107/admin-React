import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';

const Option = Select.Option;

class AddForm extends Component {
	formRef = React.createRef();

	clearInfo = () => {
		this.formRef.current.resetFields();
	};

	componentDidMount() {
		this.props.setForm(this.formRef);
	}

	render() {
		const { categorys, parentId } = this.props;
		return (
			<Form ref={this.formRef}>
				<Form.Item name='parentId'>
					<Select style={{ width: '100%' }} defaultValue={parentId}>
						<Option key='0' value='0'>
							一级分类
						</Option>
						{categorys.map(category => (
							<Option key={category._id} value={category._id}>
								{category.name}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					hasFeedback
					name='categoryName'
					rules={[
						{ required: true, message: '分类名称不能为空' },
						{ max: 8, message: '分类名称过长' },
						{
							pattern: /^[\u4E00-\u9FA5A-Za-z0-9_-]+$/,
							message: '分类名称仅能使用汉字、字母、数字、下划线、横杠',
						},
					]}
				>
					<Input placeholder='请输入分类名称' />
				</Form.Item>
			</Form>
		);
	}
}

export default AddForm;
