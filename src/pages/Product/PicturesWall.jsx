import React, { Component } from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends Component {
    state = {
        previewVisible: false, //大图显示状态
        previewImage: '', //显示大图
        previewTitle: '',
        fileList: [
            // {
            //     // uid: '-1',
            //     // name: 'image.png',
            //     // status: 'done',
            //     // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // },
        ],
    };

    //点击取消回调
    handleCancel = () => this.setState({ previewVisible: false });

    //显示大图的回调
    handlePreview = async file => {
        //
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            //显示大图的路径
            previewImage: file.url || file.preview,
            //显示大图的状态
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    //上传图片列表发生改变
    handleChange = ({ file, fileList }) => {
        // console.log(fileList.length, file === fileList[fileList.length - 1]);
        //如果上传成功需要修改name和url
        if (file.status === 'done') {
            //file的response就是服务器返回的数据
            const result = file.response;
            //如果status===0图片上传成功
            if (result.status === 0) {
                message.success('图片上传成功');
                //取出需要修正的值
                const { name, url } = result.data;
                file.name = name;
                file.url = url;
                console.log(fileList[fileList.length - 1]);
            } else {
                message.error('图片上传失败');
            }
        }
        this.setState({ fileList });
    };

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    action='/manage/img/upload' //上传地址
                    listType='picture-card' //卡片样式
                    name='image' //传递给后台的参数名称
                    accept='image/*' //只接受图片类型
                    fileList={fileList} //已上传的文件列表
                    onPreview={this.handlePreview} //显示大图
                    onChange={this.handleChange} //上传列表发生改变的回调
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt='example' style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}
