import React, {Component} from 'react';
import {Form, Input} from 'antd';
import PubSubJS from 'pubsub-js';


class UpdateForm extends Component {

    formRef = React.createRef();
    valueChange = (value) => {
        const {categoryName} = value;
        // console.log(categoryName);        
        //发布消息
        PubSubJS.publish('getCategoryName', {categoryName: categoryName});
    }


    componentDidMount() {
        this.props.setForm(this.formRef);
    }

    render() {
        return (
            <Form onValuesChange={this.valueChange} ref={this.formRef}>
                <Form.Item
                    hasFeedback
                    name='categoryName'
                    rules={[
                        {required: true, message: '分类名称不能为空'},
                        {max: 8, message: '分类名称过长'},
                        {pattern: /^[\u4E00-\u9FA5A-Za-z0-9_-]+$/, message: "分类名称仅能使用汉字、字母、数字、下划线、横杠"}
                    ]}
                >
                    <Input placeholder={this.props.categoryName}/>
                </Form.Item>
            </Form>
        );
    }
}

export default UpdateForm;